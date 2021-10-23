const staticCacheName = 'site-static';
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
  'https://kit.fontawesome.com/581353a056.js',
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
self.addEventListener('activate', () => {
  // console.log('service worker has been activated');
});

// fetch event
// listen to fetch request
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
});