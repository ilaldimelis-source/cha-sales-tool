// CHA Sales Command Center — Service Worker
// Caches the app so agents can use it offline during live calls

var CACHE_NAME = 'cha-command-center-v148';
var URLS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './manifest.json',
  './css/styles.css',
  './css/sales-tracker.css',
  './js/plan-registry.js',
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
  './js/myspace.js',
  './js/sales-tracker.js?v=2',
  './js/app.js',
  './js/chat.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap'
];

// Install: force-refresh the cache for this version, then activate
// immediately so old tabs do not keep running the previous worker.
self.addEventListener('install', function (event) {
  // skipWaiting() makes this new worker bypass the usual "wait for
  // every old tab to close" step. Combined with clients.claim()
  // below it guarantees the new version takes over within one page
  // load for every agent.
  self.skipWaiting();
  event.waitUntil(
    // Nuke any existing cache under this exact name first, so even
    // if an older deploy left partial/stale entries under the same
    // key we start from zero before repopulating.
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
        // Delete every cache except CACHE_NAME — this wipes old
        // versioned caches AND any stray caches from earlier deploys,
        // leaving only the current one behind.
        return Promise.all(
          cacheNames
            .filter(function (name) { return name !== CACHE_NAME; })
            .map(function (name) { return caches.delete(name); })
        );
      })
      .then(function () {
        // Take control of every open tab immediately.
        return self.clients.claim();
      })
      .then(function () {
        // Force every controlled tab to reload so it drops its
        // in-memory old JS and loads the fresh files through this
        // new worker. Without this step, already-open tabs would
        // keep running the previous build until the user manually
        // refreshed.
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

  // NEVER cache these — always fetch fresh from network
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
    // Network only — no caching
    event.respondWith(
      fetch(event.request).catch(function () {
        // If network fails for login page, user sees browser error (correct behavior)
        return new Response('Network error', { status: 503 });
      })
    );
    return;
  }

  // /js/* (except js/auth.js, handled above): network-first.
  // Always try fresh JS from network so deploys reach users immediately.
  // Fall back to cache only if network fails (offline).
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

  // Everything else (CSS, images, fonts): stale-while-revalidate
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
