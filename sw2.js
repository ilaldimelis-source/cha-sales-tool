// CHA Sales Command Center — Service Worker (sw2.js — new filename busts stale SW registrations)
// Caches the app so agents can use it offline during live calls

var CACHE_NAME = 'cha-command-center-v386';
var URLS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './manifest.json',
  './css/tokens.css',
  './css/styles.css',
  './css/sales-tracker.css',
  './js/plan-registry.js',
  './js/storage-utils.js',
  './js/utils.js',
  './js/recovery-data.js',
  './js/objections.js',
  './js/plans-benefits.js',
  './js/call-playbook.js',
  './js/live-assist.js',
  './js/ai-tools.js',
  './js/training.js',
  './js/compliance.js',
  './js/plan-data.js',
  './js/plan-data-extended.js?v=2',
  './js/plan-data-pdf-raw.js?v=1',
  './js/policy-docs.js',
  './js/docusign-walkthrough.js?v=386',
  './js/myspace.js',
  './js/sales-tracker.js?v=1779400000000',
  './js/app.js',
  './js/chat.js?v=1778000000000',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap'
];

// Install: force-refresh the cache for this version, then activate
// immediately so old tabs do not keep running the previous worker.
self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.delete(CACHE_NAME)
      .then(function () { return caches.open(CACHE_NAME); })
      .then(function (cache) { return cache.addAll(URLS_TO_CACHE); })
  );
});

// Activate: delete EVERY cache that is not the current version,
// claim all open tabs, and force them to reload so they pick up
// the fresh JS/CSS immediately.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (name) { return name !== CACHE_NAME; })
            .map(function (name) { return caches.delete(name); })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
      .then(function () {
        return self.clients.matchAll({ type: 'window' });
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client && typeof client.navigate === 'function') {
            try { client.navigate(client.url); } catch (_e) { /* ignore */ }
          }
        }
      })
  );
});

// Fetch: smart caching — never cache auth files, cache everything else
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = event.request.url;

  var noCachePatterns = [
    '/login.html',
    '/login',
    '/js/auth.js',
    '/index.html',
    '/knowledge_base/',
    '/api/',
    'clerk.accounts.dev',
    'clerk.com',
    'api.groq.com',
    'api.anthropic.com'
  ];
  var skipCache = noCachePatterns.some(function (p) {
    return url.indexOf(p) !== -1;
  });

  if (skipCache) {
    event.respondWith(
      fetch(event.request).catch(function () {
        return new Response('Network error', { status: 503 });
      })
    );
    return;
  }

  if (url.indexOf('/js/') !== -1) {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function () {
          return caches.match(event.request);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetchPromise = fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });
      return cached || fetchPromise;
    })
  );
});
