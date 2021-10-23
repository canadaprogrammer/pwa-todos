// If the content is changed, the resource of cache needs to be changed.
// However, the cache is not changed before the service worker is altered because the cache is saved when the service worker is installed.
// we can handle the cache by versioning the name.
// Also, we need to delete the old cache.
const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/default.js',
  '/js/nav.js',
  '/css/default.css',
  '/css/home.css',
  '/css/init.css',
  '/css/nav.css',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&display=swap',
  'https://fonts.gstatic.com/s/oswald/v40/TK3iWkUHHAIjg752FD8Ghe4.woff2',
  'https://fonts.gstatic.com/s/oswald/v40/TK3iWkUHHAIjg752GT8G.woff2',
  'https://kit.fontawesome.com/581353a056.js',
  '/img/favicon/favicon-16x16.png',
  '/img/favicon/favicon-32x32.png',
  '/img/icons/ios/144.png',
];
// install service worker
self.addEventListener('install', evt => {
  // console.log('service worker has been installed');
  // install event until the promise 'caches.open().then()' is resolved okay
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    }
  ));  
});

// activate event
self.addEventListener('activate', evt => {
  // console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      // keys are the names of caches
      // console.log(keys);
      return Promise.all(keys
        // delete if cache names were not matched with the cache name
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
});

// fetch event
// listen to fetch request
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      // If the app requests resources which are inside the cache, it returns the response from the cache.
      // If it's not, the response will carry on with the standard fetch request from the server.
      // return cacheRes || fetch(evt.request);
      // When a fetch request happens, the resources need to be saved on a new cache for better performance and offline.
      return cacheRes || fetch(evt.request).then(fetchRes => {
        // Check if the response is valid.
        if(!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic') {
          return fetchRes;
        }
        caches.open(dynamicCacheName).then(cache => {
          // Save the response on the cache.
          // A request is a stream and can only be consumed once.
          // Since we consume the request once by cache and once by the browser for fetch, we need to clone the response.
          cache.put(evt.request.url, fetchRes.clone());
          // return the response on the browser
          return fetchRes;
        });
      })
    })
  )
});