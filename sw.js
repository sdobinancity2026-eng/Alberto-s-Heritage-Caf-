const CACHE_NAME = "albertos-pos-v1";
const ASSETS = [
  "index.html",
  "manifest.json",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.tailwindcss.com"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
