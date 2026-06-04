// service-worker.js (update to v2)
(function () {
'use strict';
var CACHE_NAME = 'stock-locator-cache-v2';
// Ensure we cache the actual assets you serve (adjust if you add more files)
var urlsToCache = [
'/index.html',
'/manifest.json'
];

self.addEventListener('install', function (event) {
event.waitUntil(
caches.open(CACHE_NAME).then(function (cache) {
return cache.addAll(urlsToCache);
})
);
});

self.addEventListener('activate', function (event) {
var cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(function (keyList) {
return Promise.all(
keyList.map(function (key) {
if (cacheWhitelist.indexOf(key) === -1) {
return caches.delete(key);
}
})
);
})
);
});

self.addEventListener('fetch', function (event) {
var request = event.request;
event.respondWith(
caches.match(request).then(function (response) {
if (response) return response;

return fetch(request).then(function (networkResponse) {
// Only cache successful GET responses
if (request.method === 'GET' && networkResponse && networkResponse.status === 200) {
var responseClone = networkResponse.clone();
caches.open(CACHE_NAME).then(function (cache) {
cache.put(request, responseClone);
});
}
return networkResponse;
}).catch(function () {
// Optional: return a fallback offline page if you add one
// return caches.match('/offline.html');
});
})
);
});
})();
