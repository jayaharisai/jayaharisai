// Service Worker for Portfolio Website
const CACHE_NAME = 'portfolio-v1';
const RUNTIME_CACHE = 'portfolio-runtime-v1';

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/blog.html',
  '/css/main.css',
  '/css/theme.css',
  '/css/scroll-indicator.css',
  '/css/post-animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/scroll-snap.js',
  '/js/scroll-indicator.js',
  '/js/neural-network.js',
  '/js/data-loader.js',
  '/js/blog.js',
  '/js/lazy-load.js',
  '/data/profile.json',
  '/data/experience.json',
  '/data/projects.json',
  '/data/skills.json',
  '/data/education.json',
  '/data/blog-posts.json',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Precaching resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache runtime requests
        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      // Return offline page if available
      return caches.match('/index.html');
    })
  );
});
