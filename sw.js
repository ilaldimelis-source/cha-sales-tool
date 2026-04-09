// CHA Sales Command Center — Service Worker
// Caches the app so agents can use it offline during live calls

var CACHE_NAME = 'cha-command-center-v101';
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
  './js/policy-docs.js',
  './js/myspace.js',
  './js/sales-tracker.js',
  './js/app.js',
  './js/chat.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap'
];

// Install: cache the app files
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  // Activate immediately — don't wait for old tabs to close
  self.skipWaiting();
});

// Activate: clean up old caches when a new version is deployed
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
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
  );
  // Take control of all open tabs immediately
  self.clients.claim();
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
