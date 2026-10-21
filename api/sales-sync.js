// CHA Sales Command Center - Vercel serverless function
// GET  /api/sales-sync  -> { exists, updatedAt, data }
// PUT  /api/sales-sync  body { baseUpdatedAt, data } -> { updatedAt }
//
// Keeps one copy of the signed-in agent's Sales Tracker data on the
// server so it shows on every device. The user id comes ONLY from the
// verified Clerk session, never from the request body, so an agent can
// only read and write their own file.
//
// Storage: a PRIVATE Supabase Storage bucket, one JSON file per user.
// The service-role key stays on the server.

'use strict';

var createClerkClient = require('@clerk/backend').createClerkClient;

var CLERK_PUBLISHABLE_KEY =
  'pk_test_d2hvbGUtdmlwZXItODkuY2xlcmsuYWNjb3VudHMuZGV2JA';
var AUTHORIZED_PARTIES = [
  'https://cha-sales-tool-main.vercel.app',
  'https://cha-sales-tool-dhca.vercel.app',
  'https://cha-sales-tool.vercel.app'
];
var AUTH_TIMEOUT_MS = 1500;
var BUCKET = 'cha-sales-sync';
var MAX_BYTES = 4000000;
var ALLOWED_KEYS = [
  'cha_sales',
  'cha_postdates',
  'cha_commission_rates',
  'cha_paychecks_v1',
  'cha_paycheck_derive_v1',
  'cha_reconcile_history',
  'cha_recon_ignored_v1',
  'cha_sync_deleted'
];

var testHooks = { authenticate: null, storage: null };

function sendJson(res, status, body) {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, max-age=0'
  );
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).json(body);
}

function headerValue(req, name) {
  if (!req || !req.headers) return '';
  var lower = name.toLowerCase();
  var keys = Object.keys(req.headers);
  for (var i = 0; i < keys.length; i++) {
    if (String(keys[i]).toLowerCase() === lower) {
      var v = req.headers[keys[i]];
      if (v == null) return '';
      return Array.isArray(v) ? String(v[0] || '') : String(v);
    }
  }
  return '';
}

function hasSessionToken(req) {
  var auth = headerValue(req, 'authorization').trim();
  if (auth.toLowerCase().indexOf('bearer ') === 0 && auth.slice(7).trim()) {
    return true;
  }
  var cookie = headerValue(req, 'cookie');
  return /(^|;\s*)__session(_[^=]*)?=/.test(cookie);
}

function normalizePem(raw) {
  return String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/\\n/g, '\n');
}

function nodeToWebRequest(req) {
  var proto = headerValue(req, 'x-forwarded-proto') || 'https';
  proto = proto.split(',')[0].trim() || 'https';
  var host =
    headerValue(req, 'x-forwarded-host') ||
    headerValue(req, 'host') ||
    'localhost';
  host = host.split(',')[0].trim() || 'localhost';
  var url = proto + '://' + host + (req.url || '/api/sales-sync');
  var headers = new Headers();
  var h = req.headers || {};
  var keys = Object.keys(h);
  for (var i = 0; i < keys.length; i++) {
    var v = h[keys[i]];
    if (v == null) continue;
    headers.set(keys[i], Array.isArray(v) ? v.join(', ') : String(v));
  }
  return new Request(url, { method: req.method || 'GET', headers: headers });
}

function withTimeout(promise, ms) {
  return new Promise(function (resolve, reject) {
    var done = false;
    var timer = setTimeout(function () {
      if (done) return;
      done = true;
      reject(new Error('authenticate_timeout'));
    }, ms);
    Promise.resolve(promise).then(
      function (v) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(v);
      },
      function (e) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

// Resolves to the verified Clerk user id, or '' when not signed in.
function defaultAuthenticate(req) {
  var secret = process.env.CLERK_SECRET_KEY || '';
  var jwtKey = normalizePem(process.env.CLERK_JWT_KEY || '');
  var clerk = createClerkClient({
    secretKey: secret,
    publishableKey: CLERK_PUBLISHABLE_KEY,
    jwtKey: jwtKey
  });
  return clerk
    .authenticateRequest(nodeToWebRequest(req), {
      authorizedParties: AUTHORIZED_PARTIES,
      secretKey: secret,
      publishableKey: CLERK_PUBLISHABLE_KEY,
      jwtKey: jwtKey
    })
    .then(function (state) {
      if (!state || !(state.isAuthenticated || state.isSignedIn)) return '';
      var auth = typeof state.toAuth === 'function' ? state.toAuth() : null;
      return (auth && auth.userId) || '';
    });
}

// ── Supabase Storage (REST) ─────────────────────────────────
function storageConfig() {
  var url = String(process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  var key = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '');
  if (!url || !key) return null;
  return { url: url, key: key };
}

function storageHeaders(cfg, extra) {
  var h = { Authorization: 'Bearer ' + cfg.key, apikey: cfg.key };
  var k;
  for (k in extra || {}) h[k] = extra[k];
  return h;
}

// path: 'user_x.json' or 'backups/user_x/2026-10-21.json'
function objectUrl(cfg, path) {
  return (
    cfg.url +
    '/storage/v1/object/' +
    BUCKET +
    '/' +
    String(path).split('/').map(encodeURIComponent).join('/')
  );
}

function docPath(userId) {
  return userId + '.json';
}

function backupPath(userId, ms) {
  return (
    'backups/' +
    userId +
    '/' +
    new Date(ms).toISOString().slice(0, 10) +
    '.json'
  );
}

function salesCount(doc) {
  try {
    var arr = JSON.parse((doc && doc.data && doc.data.cha_sales) || '[]');
    return Array.isArray(arr) ? arr.length : 0;
  } catch (_e) {
    return 0;
  }
}

// Keep a restore point: the first save of each day copies the previous
// version aside, and so does any save that would drop a lot of deals.
function needsBackup(current, nextDoc, nowMs) {
  if (!current || !current.data) return false;
  var curAt = Number(current.updatedAt) || 0;
  var sameDay =
    new Date(curAt).toISOString().slice(0, 10) ===
    new Date(nowMs).toISOString().slice(0, 10);
  var before = salesCount(current);
  var after = salesCount(nextDoc);
  var bigDrop = before >= 10 && after < before * 0.8;
  return !sameDay || bigDrop;
}

// Resolves to the stored doc, or null when the user has no file yet.
function readDoc(cfg, path) {
  return fetch(objectUrl(cfg, path), {
    method: 'GET',
    headers: storageHeaders(cfg)
  }).then(function (r) {
    if (r.status === 400 || r.status === 404) return null;
    if (!r.ok) {
      return r.text().then(function (t) {
        throw new Error(
          'storage_read_' + r.status + ' ' + String(t || '').slice(0, 40)
        );
      });
    }
    return r.text().then(function (t) {
      try {
        return JSON.parse(t);
      } catch (_e) {
        return null;
      }
    });
  });
}

function createBucket(cfg) {
  return fetch(cfg.url + '/storage/v1/bucket', {
    method: 'POST',
    headers: storageHeaders(cfg, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: false })
  }).then(function (r) {
    // 409 / 400 "already exists" is fine.
    return r.status;
  });
}

function writeDoc(cfg, path, doc, retried) {
  return fetch(objectUrl(cfg, path), {
    method: 'POST',
    headers: storageHeaders(cfg, {
      'Content-Type': 'application/json',
      'x-upsert': 'true',
      'Cache-Control': 'no-cache'
    }),
    body: JSON.stringify(doc)
  }).then(function (r) {
    if (r.ok) return true;
    return r.text().then(function (t) {
      if (!retried && /bucket/i.test(t) && /not found/i.test(t)) {
        return createBucket(cfg).then(function () {
          return writeDoc(cfg, path, doc, true);
        });
      }
      throw new Error(
        'storage_write_' + r.status + ' ' + String(t || '').slice(0, 40)
      );
    });
  });
}

function getStorage() {
  if (testHooks.storage) return testHooks.storage;
  return { read: readDoc, write: writeDoc };
}

function readJsonBody(req) {
  if (!req || req.body == null || req.body === '') return null;
  if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  try {
    return JSON.parse(String(req.body));
  } catch (_e) {
    return null;
  }
}

// Only known Sales Tracker keys, each a string (the raw localStorage value).
function cleanData(data) {
  if (!data || typeof data !== 'object') return null;
  var out = {};
  for (var i = 0; i < ALLOWED_KEYS.length; i++) {
    var k = ALLOWED_KEYS[i];
    if (typeof data[k] === 'string') out[k] = data[k];
  }
  return out;
}

function handler(req, res) {
  var method = req.method;
  if (method !== 'GET' && method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  var cfg = storageConfig();
  var secret = process.env.CLERK_SECRET_KEY || '';
  if (!cfg || secret.indexOf('sk_') !== 0) {
    return sendJson(res, 503, { error: 'Sync is not configured' });
  }
  if (!hasSessionToken(req)) {
    return sendJson(res, 401, { error: 'Unauthorized' });
  }

  var authenticate = testHooks.authenticate || defaultAuthenticate;
  var storage = getStorage();

  return withTimeout(authenticate(req), AUTH_TIMEOUT_MS)
    .catch(function () {
      return '';
    })
    .then(function (userId) {
      if (!userId || !/^user_[A-Za-z0-9]+$/.test(userId)) {
        return sendJson(res, 401, { error: 'Unauthorized' });
      }

      if (method === 'GET') {
        return storage.read(cfg, docPath(userId)).then(function (doc) {
          if (!doc || !doc.data) {
            return sendJson(res, 200, { exists: false, updatedAt: 0 });
          }
          return sendJson(res, 200, {
            exists: true,
            updatedAt: Number(doc.updatedAt) || 0,
            data: cleanData(doc.data) || {}
          });
        });
      }

      var body = readJsonBody(req);
      var data = cleanData(body && body.data);
      if (!data) return sendJson(res, 400, { error: 'Invalid body' });
      var base = Number(body.baseUpdatedAt) || 0;

      return storage.read(cfg, docPath(userId)).then(function (current) {
        var curAt = (current && Number(current.updatedAt)) || 0;
        // Another device saved since this one last synced: hand back
        // the newer copy so the browser can merge, never overwrite it.
        if (curAt && curAt !== base) {
          return sendJson(res, 409, {
            error: 'Conflict',
            exists: true,
            updatedAt: curAt,
            data: cleanData(current.data) || {}
          });
        }
        var updatedAt = Math.max(Date.now(), curAt + 1);
        var doc = { v: 1, updatedAt: updatedAt, data: data };
        if (JSON.stringify(doc).length > MAX_BYTES) {
          return sendJson(res, 413, { error: 'Too large' });
        }
        var backup = needsBackup(current, doc, Date.now())
          ? storage.write(
              cfg,
              backupPath(userId, Number(current.updatedAt) || Date.now()),
              current
            )
          : Promise.resolve(true);
        return backup
          .catch(function () {
            // Never lose a save because the restore point failed.
            return true;
          })
          .then(function () {
            return storage.write(cfg, docPath(userId), doc);
          })
          .then(function () {
            return sendJson(res, 200, { updatedAt: updatedAt });
          });
      });
    })
    .catch(function (err) {
      try {
        console.error('[sales-sync]', (err && err.message) || err);
      } catch (_e) {}
      var detail = String((err && err.message) || '').slice(0, 60);
      return sendJson(res, 502, { error: 'Storage error', detail: detail });
    });
}

handler.config = { api: { bodyParser: { sizeLimit: '4mb' } } };
handler._testHooks = testHooks;
handler._needsBackup = needsBackup;
module.exports = handler;
