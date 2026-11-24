// ALL PICTURES LIVE IN THE "assets" FOLDER, AND THIS FILE LISTS THEM.
// If a file is missing, the site hides that photo (gallery) or uses the built-in web photo (menu),
// so nothing looks broken while you add your own.
// To use your own photo, save it as a .jpg and replace the file with the SAME NAME
// (or change the name written below). Keep photos under about 300 KB so the site loads fast.
window.IMAGES = {
  // Big arch photo on the first screen (round plate photo, best size: 1000 x 1000, square)
  hero: "assets/hero.jpg",

  // Round photos in the gallery (best size: 800 x 800, square). Add or remove lines freely.
  gallery: [
    { src: "assets/gallery-1.jpg", alt: "Photo 1 from Al-Hawr" },
    { src: "assets/gallery-2.jpg", alt: "Photo 2 from Al-Hawr" },
    { src: "assets/gallery-3.jpg", alt: "Photo 3 from Al-Hawr" },
    { src: "assets/gallery-4.jpg", alt: "Photo 4 from Al-Hawr" },
    { src: "assets/gallery-5.jpg", alt: "Photo 5 from Al-Hawr" },
    { src: "assets/gallery-6.jpg", alt: "Photo 6 from Al-Hawr" },
  ],

  // One photo shown for every dish in a menu section (best size: 800 x 800)
  categories: [
    "assets/menu-starters.jpg", // Starters,
    "assets/menu-hot-starters.jpg", // Hot Starters,
    "assets/menu-salads.jpg", // Salads,
    "assets/menu-main-dishes.jpg", // Main Dishes,
    "assets/menu-sides.jpg", // Sides,
    "assets/menu-desserts.jpg", // Desserts
  ],

  // Optional: a photo for one particular dish. Use the dish name in lowercase with dashes.
  // Example:  'chicken-shawarma':'assets/dishes/chicken-shawarma.jpg',
  dishes: {},
};
