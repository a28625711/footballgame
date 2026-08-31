/* 足一把-生涯模拟器 Service Worker
   缓存所有游戏资源，支持离线游玩和"添加到主屏幕" */
const CACHE_NAME = 'zuyiba-v4';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './src/data.js',
  './build/events.js',
  './src/supporters.js',
  './src/crests.js',
  './src/qr.js',
  './src/sim.js',
  './src/game.js',
  './assets/fonts/noto-emoji-subset.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // 只缓存同源请求
  if (url.origin !== location.origin) return;

  // 图片资源：缓存优先
  if (/\.(svg|png|webp|woff2)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return resp;
        });
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 其他：网络优先，失败回缓存
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return resp;
      })
      .catch(() => caches.match(event.request).then((c) => c || caches.match('./index.html')))
  );
});
