// CHA Sales Command Center — Vercel serverless function
// POST /api/receipt-extract
// Sales Tracker receipt extraction only. Groq key never leaves the server.
// Session is verified with @clerk/backend. window.CHA_USER is ignored.

'use strict';

var createClerkClient = require('@clerk/backend').createClerkClient;

var MAX_RECEIPT_CHARS = 20000;
var GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
// GROQ_MODEL replaced retired llama-3.1-8b-instant (developer-tier shutdown 2026-08-16).
var GROQ_MODEL = 'openai/gpt-oss-20b';
var CLERK_PUBLISHABLE_KEY =
  'pk_test_d2hvbGUtdmlwZXItODkuY2xlcmsuYWNjb3VudHMuZGV2JA';
var AUTHORIZED_PARTIES = [
  'https://cha-sales-tool-main.vercel.app',
  'https://cha-sales-tool-dhca.vercel.app'
];

var PRIMARY_SYSTEM =
  'You extract structured enrollment-receipt data for an insurance sales tracker. ' +
  'Return ONLY valid JSON (no markdown fences) with exactly this shape: ' +
  '{"customer":"","memberId":"","saleDate":"","planName":"","planPremium":0,"enrollmentFee":0,' +
  '"addons":[{"name":"","monthlyPrice":0}],"agent":""}. ' +
  'Rules: planPremium = core plan recurring MONTHLY premium only (not enrollment). ' +
  'enrollmentFee = one-time enrollment / signup / association fee if shown, else 0. ' +
  'addons = supplemental products each with its own monthly recurring price. ' +
  'saleDate as YYYY-MM-DD when visible on the receipt, else empty string. ' +
  'Use numbers only for prices. Never invent data; leave fields empty or 0 when absent.';

var FALLBACK_SYSTEM =
  'Extract from this receipt: customer full name, 9-digit member ID, sale date (YYYY-MM-DD), and all products with their monthly prices. Return ONLY valid JSON in this exact format: {"customer":"","memberId":"","saleDate":"","products":[{"name":"","price":0,"type":"deal or addon"}]}. First product is always the deal, rest are addons.';

var testHooks = {
  authenticate: null,
  groqFetch: null
};

function jsonNoCache(res) {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, max-age=0'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

function sendJson(res, status, body) {
  jsonNoCache(res);
  return res.status(status).json(body);
}

function clerkSecretOk(secret) {
  return (
    typeof secret === 'string' &&
    secret.indexOf('sk_') === 0 &&
    secret.length >= 20
  );
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

function readSessionToken(req) {
  var auth = headerValue(req, 'authorization').trim();
  if (auth.toLowerCase().indexOf('bearer ') === 0) {
    var bearer = auth.slice(7).trim();
    if (bearer) return bearer;
  }
  var cookie = headerValue(req, 'cookie');
  if (!cookie) return '';
  var parts = cookie.split(';');
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i].trim();
    var eq = p.indexOf('=');
    if (eq <= 0) continue;
    var name = p.slice(0, eq);
    if (name === '__session' || name.indexOf('__session_') === 0) {
      var val = p.slice(eq + 1);
      try {
        val = decodeURIComponent(val);
      } catch (_e) {}
      if (val) return val;
    }
  }
  return '';
}

function nodeToWebRequest(req) {
  var proto = headerValue(req, 'x-forwarded-proto') || 'https';
  proto = proto.split(',')[0].trim() || 'https';
  var host =
    headerValue(req, 'x-forwarded-host') ||
    headerValue(req, 'host') ||
    'localhost';
  host = host.split(',')[0].trim() || 'localhost';
  var url = proto + '://' + host + (req.url || '/api/receipt-extract');
  var headers = new Headers();
  var h = req.headers || {};
  var keys = Object.keys(h);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var v = h[k];
    if (v == null) continue;
    headers.set(k, Array.isArray(v) ? v.join(', ') : String(v));
  }
  return new Request(url, {
    method: req.method || 'GET',
    headers: headers
  });
}

function readJsonBody(req) {
  if (!req) return null;
  if (req.body == null || req.body === '') return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (_e) {
      return null;
    }
  }
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString('utf8'));
    } catch (_e2) {
      return null;
    }
  }
  if (typeof req.body === 'object') return req.body;
  return null;
}

function numOrZero(v) {
  var n = parseFloat(v);
  if (!isFinite(n) || n < 0) return 0;
  return n;
}

function parseModelJson(rawText) {
  var txt = String(rawText || '').trim();
  txt = txt
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/, '')
    .trim();
  try {
    return JSON.parse(txt);
  } catch (_p1) {
    var m = txt.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]);
    } catch (_p2) {
      return null;
    }
  }
}

function sanitizeAddons(list) {
  var out = [];
  if (!list || !list.length) return out;
  var max = Math.min(list.length, 20);
  for (var i = 0; i < max; i++) {
    var ad = list[i] || {};
    var name = String(ad.name || '').substring(0, 120);
    var price = numOrZero(ad.monthlyPrice);
    if (!name || price <= 0) continue;
    out.push({ name: name, monthlyPrice: price });
  }
  return out;
}

function sanitizePrimary(obj) {
  obj = obj || {};
  return {
    customer: String(obj.customer || '').substring(0, 80),
    memberId: String(obj.memberId || '').substring(0, 40),
    saleDate: String(obj.saleDate || '').substring(0, 32),
    planName: String(obj.planName || '').substring(0, 120),
    planPremium: numOrZero(obj.planPremium),
    enrollmentFee: numOrZero(obj.enrollmentFee),
    addons: sanitizeAddons(obj.addons),
    agent: String(obj.agent || '').substring(0, 80)
  };
}

function sanitizeFallback(obj) {
  obj = obj || {};
  var products = [];
  var list = obj.products || [];
  var max = Math.min(list.length, 20);
  for (var i = 0; i < max; i++) {
    var p = list[i] || {};
    var name = String(p.name || '').substring(0, 120);
    var price = numOrZero(p.price);
    if (!name || price <= 0) continue;
    products.push({
      name: name,
      price: price,
      type: String(p.type || '').substring(0, 20)
    });
  }
  return {
    customer: String(obj.customer || '').substring(0, 80),
    memberId: String(obj.memberId || '').substring(0, 40),
    saleDate: String(obj.saleDate || '').substring(0, 32),
    products: products
  };
}

async function defaultAuthenticate(req) {
  var secret = process.env.CLERK_SECRET_KEY || '';
  var clerk = createClerkClient({
    secretKey: secret,
    publishableKey: CLERK_PUBLISHABLE_KEY
  });
  return clerk.authenticateRequest(nodeToWebRequest(req), {
    authorizedParties: AUTHORIZED_PARTIES,
    secretKey: secret,
    publishableKey: CLERK_PUBLISHABLE_KEY
  });
}

function getAuthenticate() {
  return testHooks.authenticate || defaultAuthenticate;
}

function getGroqFetch() {
  return testHooks.groqFetch || fetch;
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  var secret = process.env.CLERK_SECRET_KEY || '';
  if (!clerkSecretOk(secret)) {
    return sendJson(res, 503, { error: 'Extractor is not configured' });
  }

  if (!readSessionToken(req)) {
    return sendJson(res, 401, { error: 'Unauthorized' });
  }

  var signedIn = false;
  try {
    var state = await getAuthenticate()(req);
    if (state && (state.isAuthenticated || state.isSignedIn)) {
      signedIn = true;
    }
  } catch (_authErr) {}
  if (!signedIn) {
    return sendJson(res, 401, { error: 'Unauthorized' });
  }

  var groqKey = process.env.GROQ_API_KEY || '';
  if (!groqKey) {
    return sendJson(res, 503, { error: 'Extractor is not configured' });
  }

  var body = readJsonBody(req);
  if (!body) {
    return sendJson(res, 400, { error: 'Invalid JSON' });
  }

  var receipt = body.receipt != null ? String(body.receipt) : '';
  if (!receipt.trim()) {
    return sendJson(res, 400, { error: 'Missing receipt' });
  }
  if (receipt.length > MAX_RECEIPT_CHARS) {
    return sendJson(res, 400, { error: 'Receipt too long' });
  }

  var stage = body.stage === 'fallback' ? 'fallback' : 'primary';
  var sys = stage === 'fallback' ? FALLBACK_SYSTEM : PRIMARY_SYSTEM;
  var maxTokens = stage === 'fallback' ? 800 : 900;
  var temperature = stage === 'fallback' ? 0.1 : 0.05;

  var groqResp;
  try {
    groqResp = await getGroqFetch()(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + groqKey
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: maxTokens,
        temperature: temperature,
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: receipt }
        ]
      })
    });
  } catch (_fetchErr) {
    return sendJson(res, 502, { error: 'Extraction failed' });
  }

  if (!groqResp || !groqResp.ok) {
    return sendJson(res, 502, { error: 'Extraction failed' });
  }

  var groqBody;
  try {
    groqBody = await groqResp.json();
  } catch (_jsonErr) {
    return sendJson(res, 502, { error: 'Extraction failed' });
  }

  var content =
    groqBody &&
    groqBody.choices &&
    groqBody.choices[0] &&
    groqBody.choices[0].message &&
    groqBody.choices[0].message.content
      ? String(groqBody.choices[0].message.content)
      : '';
  var parsed = parseModelJson(content);
  if (!parsed) {
    return sendJson(res, 502, { error: 'Extraction failed' });
  }

  if (stage === 'fallback') {
    return sendJson(res, 200, sanitizeFallback(parsed));
  }
  return sendJson(res, 200, sanitizePrimary(parsed));
}

handler._testHooks = testHooks;
handler._clerkSecretOk = clerkSecretOk;
handler._readSessionToken = readSessionToken;
handler._AUTHORIZED_PARTIES = AUTHORIZED_PARTIES;
module.exports = handler;
