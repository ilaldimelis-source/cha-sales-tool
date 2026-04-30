// CHA Sales Command Center — Service Worker (sw2.js — new filename busts stale SW registrations)
// Caches the app so agents can use it offline during live calls

var CACHE_NAME = 'cha-command-center-v404';
var URLS_TO_CACHE = [
  './',
  './index.html?v=1780300000000',
  './logo.png?v=1779700000000',
  './manifest.json?v=1779700000000',
  './css/tokens.css?v=1779700000000',
  './css/styles.css?v=1779700000000',
  './css/sales-tracker.css?v=1779900000000',
  './js/plan-registry.js?v=1779700000000',
  './js/storage-utils.js?v=1780000000000',
  './js/utils.js?v=1779700000000',
  './js/recovery-data.js?v=1779700000000',
  './js/objections.js?v=1779700000000',
  './js/plans-benefits.js?v=1779700000000',
  './js/call-playbook.js?v=1779700000000',
  './js/live-assist.js?v=1779700000000',
  './js/ai-tools.js?v=1779700000000',
  './js/training.js?v=1780300000000',
  './js/compliance.js?v=1779700000000',
  './js/plan-data.js?v=1779700000000',
  './js/plan-data-extended.js?v=1779700000000',
  './js/plan-data-pdf-raw.js?v=1779700000000',
  './js/policy-docs.js?v=1779700000000',
  './js/docusign-walkthrough.js?v=1779700000000',
  './js/myspace.js?v=1780300000000',
  './js/sales-tracker.js?v=1780300000000',
  './js/app.js?v=1780300000000',
  './js/chat.js?v=1780300000000',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap&v=1779700000000'
];

// Install: force-refresh the cache for this version, then activate
// immediately so old tabs do not keep running the previous worker.
self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches
      .delete(CACHE_NAME)
      .then(function () {
        return caches.open(CACHE_NAME);
      })
      .then(function (cache) {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate: delete EVERY cache that is not the current version,
// claim all open tabs, and force them to reload so they pick up
// the fresh JS/CSS immediately.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (name) {
              return name !== CACHE_NAME;
            })
            .map(function (name) {
              return caches.delete(name);
            })
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
            try {
              client.navigate(client.url);
            } catch (_e) {
              /* ignore */
            }
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
