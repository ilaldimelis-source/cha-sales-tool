// CHA Sales Command Center — Service Worker
// Caches the app so agents can use it offline during live calls

var CACHE_NAME = 'cha-command-center-v55';
var URLS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './manifest.json',
  './css/styles.css',
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
  './js/policy-docs.js',
  './js/myspace.js',
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

// Fetch: stale-while-revalidate — serve cache fast, update in background
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
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
