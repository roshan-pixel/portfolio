// Service Worker for Himanshi Parihar Portfolio
// Provides permanent browser caching & fast offline access for all image assets

const CACHE_NAME = 'himanshi-portfolio-v1';

// Core case study images pre-cached on install
const PRECACHE_ASSETS = [
  'assets/slide_3.jpg',
  'assets/slide_5.jpg',
  'assets/slide_13.jpg',
  'assets/slide_17.jpg',
  'assets/slide_25.jpg',
  'assets/slide_29.jpg',
  'assets/slide_33.jpg',
  'assets/slide_37.jpg',
  'assets/slide_39.jpg',
  'assets/slide_41.jpg',
  'assets/slide_45.jpg',
  'assets/slide_49.jpg',
  'assets/slide_53.jpg',
  'assets/slide_57.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          fetch(url, { cache: 'no-cache' }).then((res) => {
            if (res.ok) {
              return cache.put(url, res);
            }
          }).catch(() => {})
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Cache-first strategy for images in assets/ or image file types
  if (url.pathname.includes('/assets/') || /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fetch from network, cache clone, and return
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Attempt clean URL match if query params were appended
            return cache.match(url.pathname);
          });
        });
      })
    );
    return;
  }

  // Network-first strategy with cache fallback for CSS and JS
  if (/\.(css|js)$/i.test(url.pathname)) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => caches.match(request))
    );
  }
});
