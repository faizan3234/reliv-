const CACHE_NAME = 'reliv-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/simulator.html',
  '/style.css',
  '/app.js',
  '/kiosk.js',
  '/site.webmanifest',
  '/icons/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/reliv-wordmark.svg',
  '/assets/screens/actual-0.png',
  '/assets/screens/actual-1.png',
  '/assets/screens/actual-2.png',
  '/assets/screens/actual-3.png',
  '/assets/screens/actual-4.png',
  '/assets/screens/actual-5.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached, but also update in background (stale-while-revalidate for html/css)
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // If offline and request is for page, return simulator or cached homepage
        if (event.request.mode === 'navigate') {
          return caches.match('/simulator.html') || caches.match('/index.html');
        }
      });
    })
  );
});
