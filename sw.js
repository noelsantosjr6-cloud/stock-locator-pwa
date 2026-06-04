(function () {
'use strict';
var CACHE_NAME = 'stock-locator-cache-v1';
var urlsToCache = [
'index.html',
'manifest.json'
];

self.addEventListener('install', function (event) {
event.waitUntil(
caches.open(CACHE_NAME).then(function (cache) {
return cache.addAll(urlsToCache);
})
);
});

self.addEventListener('activate', function (event) {
event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
var request = event.request;
event.respondWith(
caches.match(request).then(function (response) {
return response || fetch(request);
})
);
});
})();
