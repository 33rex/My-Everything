const CACHE_NAME = "web4myash-our-room-v2-lock-fix";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/app.js",
  "./room/",
  "./room/room.css",
  "./room/room.js",
  "./assets/birthday/birthday-poster.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/covers/default-cover.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
// Birthday update packaged: 5 May special surprise.
