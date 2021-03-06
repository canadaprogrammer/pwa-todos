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
  2. install event, pre-caching
  3. service worker becomes active
  4. active event
  5. the service worker 'listens' for events, fetch and caching

  - when refreshed the page
  - when refreshed the page
  - when refreshed the page
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
> 1.  install event and pre-caching
>     - pre-caching: get some assets from the server and store them in the cache when the application first loads
>     - If they failed to be fetched, it would make your site entirely non-functional.
> 2.  activate event
> 3.  fetch events and save resources on a cache
>     - without service worker: browser -> fetch request -> server -> server response -> browser
>     - Service worker: listening for fetch requests from an app, handling cached assets. When a fetch request is made from the browser, the service worker gets the response from the cache. This method makes for a rapid experience and good offline behavior.

6. Generate a fallback page for not cached page on offline

7. Set limit of cache size

8. Create Firestore Database

- Create a new project and web app as test mode
- Add database
- Create the web app
- Load Firebase JavaScript SDK libraries from the CDN (content delivery network) by copy and paste the scripts into the bottom of `body` tag
- Add real-time listener by `collection` and `onSnapshot`
- Save data to indexedDB by `enableIndexedDbPersistence`
- Add date to firebase by `addDoc`
- Remove date from firebase by `deleteDoc` and `doc`

9. Deploying firebase

- Set up hosting
  - `$ npm install -g firebase-tools`
  - `$ firebase login`
  - `$ firebase init` on the root directory of the project
    > Are you ready to proceed? **Y**
    > Which Firebase CLI features do you want to setup for this folder? **Hosting: Configure files for Firebase Hosting**
    > Please select an option: **Use an existing project**
    > What do you want to use as your public directory? **enter** (public)
    > Configure as a single-page app (rewrite all urls to /index.html)? **N**
    > Set up automatic builds and deploys with GitHub? **N**
  - Modify files
    - Remove /public/index.html
    - Move files into public folder
      - index.html, manifest.json, sw.js, css folder, img folder, js folder, and pages folder
  - `$ firebase deploy`

10. If it needs to be changed after deployed to Firebase hosting.

- Change the code
- `$ firebase serve` to check the changes
  - Terminate the batch job by **Ctrl + c twice**
- Publish them to firebase hosting with `$ firebase deploy` again

11. The results

- https://pwa---todo.web.app/
  > ![The front page](</public/img/app(360x640).png>)
  > ![Navigation](</public/img/app(360x640)-1.png>)
  > ![Add form](</public/img/app(360x640)-2.png>)
  > ![Not todo page](</public/img/app(360x640)-3.png>)

## Tools

- connect to your device for remote debugging
  - `chrome://inspect` on a browser
- audit site
  - `https://web.dev/measure/`
