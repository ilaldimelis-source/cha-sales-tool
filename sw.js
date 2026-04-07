// CHA Sales Command Center — Service Worker
// Caches the app so agents can use it offline during live calls

var CACHE_NAME = 'cha-command-center-v22';
var URLS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './css/styles.css',
  './js/utils.js',
  './js/recovery-data.js',
  './js/objections.js',
  './js/plans-benefits.js',
  './js/call-playbook.js',
  './js/live-assist.js',
  './js/ai-tools.js',
  './js/training.js',
  './js/compliance.js',
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

// Fetch: serve from cache first, fall back to network
// This means the app works even with zero signal
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        // Serve from cache immediately (fast!)
        // Also update the cache in the background for next time
        fetch(event.request)
          .then(function (networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(function () {
            /* offline — that's fine */
          });
        return cachedResponse;
      }
      // Not in cache — try network, then cache the result
      return fetch(event.request)
        .then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            var responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(function () {
          // Offline and not cached — return a simple fallback
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
