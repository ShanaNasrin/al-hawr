# Al-Hawr website

Static site for Al-Hawr Lebanese Restaurant, Portland, OR. Open `index.html` in a browser, or upload the whole folder to any static host.

## Files
- `index.html`: page structure and text
- `style.css`: styling
- `script.js`: menu, order cart, hours, reservations form
- `images.js`: list of photos (edit this to change pictures)
- `assets/`: put your photos here

## Replace the photos
1. Replace `assets/hero.jpg` with a square photo of a plate (1000 x 1000). The one included is a placeholder.
2. Add gallery photos named `assets/gallery-1.jpg` to `gallery-6.jpg`. The Gallery section and its menu link are hidden until at least one photo exists.
3. Optional: add `assets/menu-starters.jpg`, `menu-hot-starters.jpg`, `menu-salads.jpg`, `menu-main-dishes.jpg`, `menu-sides.jpg`, `menu-desserts.jpg`. Until then the menu uses the web photos set in `script.js`.
4. Optional: one photo for a single dish, e.g. `dishes: { 'chicken-shawarma': 'assets/dishes/chicken-shawarma.jpg' }` in `images.js`.

## Online orders
Orders are sent by email by default. To receive them automatically, create a form at formspree.io and paste its URL into `ORDER_ENDPOINT` at the top of `script.js`.
