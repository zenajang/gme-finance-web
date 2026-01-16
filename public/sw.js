const CACHE_VERSION = "v1";
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const VIDEO_CACHE = `videos-${CACHE_VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !key.endsWith(`-${CACHE_VERSION}`))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

const isCacheableResponse = (response) =>
  response && (response.ok || response.type === "opaque");

const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (isCacheableResponse(response)) {
    cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  if (request.headers.has("range")) {
    return;
  }

  if (request.destination === "image") {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  if (request.destination === "video") {
    event.respondWith(cacheFirst(request, VIDEO_CACHE));
  }
});
