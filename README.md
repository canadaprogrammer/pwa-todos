# Progressive Web Application - Todo List

## Practice to make PWA

## Making notes

### Initialize PWA

1. Generate image icons by size and device

2. Create the maskable icon

- Maskable icons are a new icon format that give you more control and let your Progressive Web App use adaptive icons.

3. Make manifest.json

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
