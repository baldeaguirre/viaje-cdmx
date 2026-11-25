const CACHE = 'viaje-cdmx-v1';
const ASSETS = ['./', './index.html', './hark.css', './hark-hero.css', './hark.js', './hero_angel.jpg', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); if (r.ok && new URL(e.request.url).origin === location.origin) caches.open(CACHE).then(cc => cc.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(m => m || caches.match('./index.html'))));
});
