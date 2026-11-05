/* Reliv public marketing site — resilient offline shell.
 * Never cache payment, authentication or user-specific health reports.
 */
'use strict';

const CACHE_NAME = 'reliv-public-v7';
const CORE_ASSETS = [
  '/', '/index.html', '/404.html',
  '/immersive.css', '/immersive.js', '/reliv-refinement.css',
  '/how-it-works.html', '/locations.html', '/organisations.html',
  '/style.css', '/premium.css', '/editorial.css',
  '/icons/reliv-wordmark.svg', '/icons/favicon.svg',
  '/site.webmanifest'
];
const PERSONAL_ROUTE = /^\/(?:api|account|auth|login|logout|checkout|payment|payments|orders?|reports?|records?|patient|medical-records)(?:\/|$)/i;

function isCacheable(response) {
  return response && response.ok && (response.type === 'basic' || response.type === 'default');
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // A single absent optional page must not make the whole worker unusable.
      await Promise.allSettled(CORE_ASSETS.map(async path => {
        const request = new Request(path, { cache: 'reload' });
        const response = await fetch(request);
        if (isCacheable(response)) await cache.put(request, response);
      }));
      await self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names
        .filter(name => name !== CACHE_NAME && (name.startsWith('reliv-cache-') || name.startsWith('reliv-public-')))
        .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || PERSONAL_ROUTE.test(url.pathname)) return;

  if (request.mode === 'navigate') {
    // Pages should update immediately after deployment instead of serving old copy first.
    event.respondWith(
      fetch(request).then(response => {
        if (isCacheable(response)) {
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())).catch(() => {}));
        }
        return response;
      }).catch(async () => {
        return (await caches.match(request)) ||
          (await caches.match('/404.html')) ||
          (await caches.match('/index.html')) ||
          new Response('Offline. Please reconnect and retry.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      })
    );
    return;
  }

  // Cache only public static site files. Avoid growing offline storage with videos.
  if (!/\.(?:css|js|woff2?|png|jpe?g|webp|svg|ico|webmanifest)$/i.test(url.pathname)) return;
  if (url.pathname.startsWith('/assets/videos/') || url.pathname.startsWith('/assets/screens/')) return;

  event.respondWith(
    caches.match(request).then(cached => {
      const refreshing = fetch(request).then(response => {
        if (isCacheable(response)) {
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())).catch(() => {}));
        }
        return response;
      });
      if (cached) {
        event.waitUntil(refreshing.catch(() => {}));
        return cached;
      }
      return refreshing;
    })
  );
});
