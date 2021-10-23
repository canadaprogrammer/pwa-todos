# Progressive Web Application - Todo List

## Practice to make PWA

## Making notes

### Initialize PWA

1. Generate image icons by size and device

2. Create the maskable icon

- Maskable icons are a new icon format that give you more control and let your Progressive Web App use adaptive icons.

3. Make manifest.json on the root

- ```json
  {
    "name": "",
    "short_name": "",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "",
    "theme_color": "",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/images/icons-192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "/images/maskable_icon.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
  }
  ```

- display:
  - `fullscreen` without any browser UI
  - `standalone`
  - `minimal-ui` with minimal set of UI such as back and reload
  - `browser`
- background_color: the splash screen when the application is first launched on mobile
- theme_color: the color of the tool bar

4. Create website

5. Add service workers on the root and register it by app.js

- load content offline
- use background sync
- use push notifications
- listen for fetch requests, push messages, etc
- The scope will be the location of service worker.
- It's working only HTTPS connection
- The status of service worker can be checked on application tab of dev tool

- lifecycle

  1. app.js - register the service worker(sw.js)
  2. install service worker
  3. service worker becomes active
  4. active event
  5. service worker 'listens' for events

  - when refreshed the page

    > 1. app.js - register the service worker

    > - **if service worker is not changed**
    >
    > 5. service worker 'listens' for events

    > - **if service worker is changed**
    >
    > 2.  install service worker
    >
    > - in waiting until all instances and apps are closed
    >
    > 3.  service worker becomes active when the browser or app is opened
    > 4.  active event
    > 5.  service worker 'listens' for events

> service worker process
>
> 1.  install service worker
> 2.  activate event
> 3.  fetch events
>     - without service worker: browser -> fetch request -> server -> server response -> browser
>     - Service worker: listening for fetch requests from an app, handling cached assets. When a fetch request is made from the browser, the service worker gets the response from the cache. This method makes for a rapid experience and good offline behavior.
>     - pre-caching: get some assets from the server and store them in the cache when the application first loads
>     -

connect to your device for remote debugging

- `chrome://inspect` on a browser
