const CACHE = "nexbaron-web-v1";
const ASSETS = ["/", "/icon.svg", "/favicon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Network-first for HTML, cache-first for assets
  if (req.headers.get("accept")?.includes("text/html")) {
    e.respondWith(fetch(req).then((res) => { const c = res.clone(); caches.open(CACHE).then((cache) => cache.put(req, c)); return res; }).catch(() => caches.match(req)));
    return;
  }
  e.respondWith(caches.match(req).then((cached) => cached || fetch(req).then((res) => { const c = res.clone(); caches.open(CACHE).then((cache) => cache.put(req, c)); return res; })));
});
