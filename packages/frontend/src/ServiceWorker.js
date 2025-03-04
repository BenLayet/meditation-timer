const CACHE_NAME = 'meditation-timer-cache-v1'; // Use a unique name for the cache to avoid conflicts
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/edges.css',
  '/colors.css',
  '/typography.css',
  '/button.css',
  '/range.css',
  '/animation.css',
  '/layout.css',
  '/index.css',
  '/src/components/app/App.jsx', // Add other static assets that should be cached
];

// Install event: Cache static assets.
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event: Clear old caches.
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event: Serve cached files when offline.
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch event for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[Service Worker] Returning cached response:', response.url);
        return response;
      }
      console.log('[Service Worker] Fetching from network:', event.request.url);
      return fetch(event.request).catch(() => {
        console.error('[Service Worker] Network request failed and no cache available');
      });
    })
  );
});