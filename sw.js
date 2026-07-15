const CACHE_NAME = "albertos-pos-v2";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "alberto's.jpg",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.tailwindcss.com"
];

// Cache core files on installation
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Network-First strategy with Cache fallback
self.addEventListener("fetch", (e) => {
  // Do not intercept the Google Sheets API communications
  if (e.request.url.includes("script.google.com")) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // If successful, clone response into cache updates
        if (response.status === 200) {
          const cacheCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, cacheCopy));
        }
        return response;
      })
      .catch(() => {
        // If completely network-disconnected, pull structural layout files from cache
        return caches.match(e.request);
      })
  );
});
