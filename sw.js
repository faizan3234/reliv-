const CACHE_NAME = 'reliv-v11';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/simulator.html',
  '/style.css?v=11',
  '/app.js?v=11',
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

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Don't cache API calls or Netlify functions
  if (event.request.url.includes('/api/') || event.request.url.includes('/.netlify/functions/') || event.request.url.includes('/oracle-api/')) return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone()).catch(() => {});
      }
      return response;
    } catch {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      // HTML is only a navigation fallback, never a script/image/stylesheet.
      if (event.request.mode === 'navigate') {
        const shell = await caches.match('/index.html');
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});
