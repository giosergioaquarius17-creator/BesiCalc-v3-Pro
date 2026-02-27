const CACHE_NAME = 'besicalc-v4-cache';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/2641/2641434.png'
];

// Tahap Install: Menyimpan file ke dalam cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(assetsToCache);
    })
  );
});

// Tahap Activate: Membersihkan cache lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Tahap Fetch: Mengambil data dari cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
