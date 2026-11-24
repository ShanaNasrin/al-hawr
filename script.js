// ---- Settings ---------------------------------------------------------
// To receive orders automatically by email without a server, make a free form at
// formspree.io (or web3forms.com), then paste its URL here, e.g.
// 'https://formspree.io/f/abcdwxyz'. Leave empty to let customers send by
// email, call or copy instead.
var ORDER_ENDPOINT = "";

// Photo shown beside every dish in a category. To use a real photo for one dish,
// add its web address as a 5th value, e.g. ["Hummus",16,"...","gv","photos/hummus.jpg"]
var CAT_IMG = [
  "https://spoton-prod-websites-user-assets.s3.amazonaws.com/static/uploads/8obrt07TDOF86jIkxrsM_50304707_608949469556515_7507929813563211776_n.jpg",
  "https://spoton-prod-websites-user-assets.s3.amazonaws.com/static/uploads/Vu5pNVFRWeoVCbC07Yoh_50695603_605661546551974_2823971688956297216_n.jpg",
  "https://spoton-prod-websites-user-assets.s3.amazonaws.com/static/uploads/GdfmFu1RucDucVFgKw3N_50314387_608946202890175_4731176891979923456_n.jpg",
  "https://spoton-prod-websites-user-assets.s3.amazonaws.com/static/uploads/8KhoU4h3RnWsNPmsxal6_50003260_605662356551893_5074279757420429312_n.jpg",
  "https://spoton-prod-websites-user-assets.s3.amazonaws.com/static/uploads/Zdx3VjUiTNoQPZn9xaAQ_50773163_608950022889793_1597339680737591296_n.jpg",
  "https://spoton-prod-websites-user-assets.s3.amazonaws.com/static/uploads/dxm6fiOoRPWajj7wuPAQ_50683968_608950679556394_4686732849573789696_n.jpg",
];

// ---- Photos: read from images.js (window.IMAGES), fall back to the web photos above ----
var IMG = window.IMAGES || {};
function slug(n) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function esc(t) {
  return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
// Returns [first choice, fallback]. A dish photo wins, then the category photo.
function dishPhoto(ci, x) {
  var own = x[4] || (IMG.dishes && IMG.dishes[slug(x[0])]);
  var cat = (IMG.categories && IMG.categories[ci]) || CAT_IMG[ci];
  return own ? [own, cat] : [cat, cat === CAT_IMG[ci] ? "" : CAT_IMG[ci]];
}
// If a photo fails, try its fallback once, then remove it.
function imgFail(i) {
  var f = i.getAttribute("data-fb");
  if (f) {
    i.removeAttribute("data-fb");
    i.src = f;
  } else i.remove();
}
(function () {
  var hp = document.getElementById("heroPic");
  if (hp && IMG.hero)
    hp.innerHTML =
      '<img src="' + esc(IMG.hero) + '" alt="A plate of Lebanese food from Al-Hawr" fetchpriority="high">';
  var gg = document.getElementById("galGrid");
  if (gg && IMG.gallery)
    gg.innerHTML = IMG.gallery
      .map(function (p) {
        return '<figure><img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"></figure>';
      })
      .join("");
})();

// Hide any photo that fails to load, and the gallery if all of its photos fail.
function hideImg(i) {
  var f = i.parentNode,
    g = f.parentNode;
  f.remove();
  if (g.classList.contains("gal") && !g.children.length) {
    var sec = g.closest("section");
    if (sec) {
      var nl = document.querySelector('#links a[href="#' + sec.id + '"]');
      if (nl) nl.remove();
      sec.remove();
    }
  }
}
[].forEach.call(document.querySelectorAll("img:not(.keep)"), function (i) {
  if (i.complete && !i.naturalWidth) hideImg(i);
  else
    i.addEventListener("error", function () {
      hideImg(i);
    });
});

// name, price, description, flags (g = gluten free, v = vegetarian/vegan)
var M = [
  [
    "Starters",
    [
      [
        "Hummus",
        16,
        "Chickpeas, tahini and lemon with olive oil and warm pita.",
        "gv",
      ],
      [
        "Baba Ghannouj",
        17,
        "Baked eggplant, tahini and lemon, with pomegranate seeds.",
        "gv",
      ],
      ["Avocado Hummus", 17, "Our hummus blended with fresh avocado.", "v"],
      ["Beet Hummus", 17, "Our hummus blended with fresh beet.", "v"],
      ["Mixed Hummus", 28, "", ""],
      [
        "Warak Enab",
        13,
        "Grape leaves filled with rice, parsley, mint and tomato.",
        "gv",
      ],
      [
        "Labneh Mtawami",
        14,
        "Homemade yogurt with garlic and dried mint.",
        "g",
      ],
      ["Basturna", 18, "Air-dried spiced beef with tomatoes and pickles.", ""],
      [
        "Sbenigh Bzeit",
        18,
        "Sautéed spinach, lemon, pomegranate and caramelized onions.",
        "v",
      ],
      [
        "Sampler Platter",
        30,
        "Hummus, baba ghannouj, 4 grape leaves, beet salad and tabbouli.",
        "gv",
      ],
    ],
  ],
  [
    "Hot Starters",
    [
      [
        "Batata Harra",
        16,
        "Fried potatoes with garlic, cilantro and cayenne.",
        "gv",
      ],
      ["Cheese Rolls", 14, "Crispy dough filled with cheese. 4 pieces.", "v"],
      [
        "Kibbeh",
        16,
        "Fried beef and bulgur shell, stuffed with spiced beef and nuts. 4 pieces.",
        "",
      ],
      [
        "Samboosik",
        16,
        "Fried dough filled with ground beef and pine nuts. 4 pieces.",
        "",
      ],
      [
        "Spinach Pies",
        16,
        "Fried dough with spinach, onion and pomegranate. 4 pieces.",
        "v",
      ],
      [
        "Mixed Dough",
        16,
        "Kibbeh, samboosik, spinach and cheese rolls. 4 pieces.",
        "",
      ],
      [
        "Provençal Chicken Wings",
        17,
        "Fried wings with garlic, cilantro and lemon.",
        "g",
      ],
      [
        "Provençal Shrimp",
        18,
        "Sautéed shrimp with garlic, cilantro and lemon.",
        "g",
      ],
      ["Creamy Chicken Pepper", 18, "Chicken in cream, pepper and lemon.", "g"],
      [
        "Hummus Cocktail",
        19,
        "Creamy hummus with sautéed filet mignon and pine nuts.",
        "g",
      ],
      [
        "Lamb Cocktail",
        18,
        "Creamy hummus with sautéed lamb and pine nuts.",
        "g",
      ],
      [
        "Sojok Cocktail",
        18,
        "Creamy hummus with sautéed sojok and pine nuts.",
        "g",
      ],
      [
        "Ras Asfoor",
        19,
        "Filet mignon, mushroom, red wine and pine nuts.",
        "g",
      ],
      ["Sojok", 18, "Ground lamb and beef with spices and tomato.", "g"],
      ["Sawda", 18, "Chicken liver with garlic and pomegranate molasses.", "g"],
      [
        "Lentil and Vegetable Soup",
        0,
        "Ask your server for today’s price.",
        "g",
      ],
    ],
  ],
  [
    "Salads",
    [
      [
        "Al Hawr Salad",
        22,
        "Greens, tomato, peppers, arugula, sumac, pomegranate molasses, with crunchy onion bread.",
        "v",
      ],
      [
        "Grilled Halloumi",
        21,
        "Grilled halloumi with tomato, cucumber, arugula and black sesame.",
        "",
      ],
      [
        "Fattoush",
        17,
        "Parsley, tomato, mint, radish, cucumber and lettuce with crispy pita.",
        "v",
      ],
      [
        "Tabbouli",
        18,
        "Chopped parsley, tomato, mint, onion, lemon and olive oil.",
        "v",
      ],
      [
        "Arugula Salad",
        16,
        "Arugula, tomato and onion with pomegranate molasses.",
        "gv",
      ],
      ["Beet Salad", 18, "Steamed beet and arugula with house dressing.", "v"],
    ],
  ],
  [
    "Main Dishes",
    [
      [
        "Chicken Shawarma",
        26,
        "Sautéed chicken strips with pickles, garlic paste and saffron rice.",
        "g",
      ],
      [
        "Beef Shawarma",
        28,
        "Sautéed beef strips with salad, tahini and basmati rice.",
        "",
      ],
      [
        "Falafel Plate",
        24,
        "Chickpea and fava fritters with tarator, pickled turnip and vegetables.",
        "gv",
      ],
      [
        "Shish Tawook",
        28,
        "Grilled chicken skewers with vegetables, tomato sauce and rice.",
        "g",
      ],
      [
        "Grilled Lamb Kafta",
        31,
        "Ground lamb with onion and parsley, grilled. Served with rice.",
        "g",
      ],
      [
        "Kafta Arayiss",
        28,
        "Spiced ground lamb grilled in pita with pickles and mayonnaise.",
        "",
      ],
      [
        "Filet Mignon Lahmi",
        36,
        "Grilled filet mignon skewers with vegetables and saffron rice.",
        "g",
      ],
      [
        "Grilled Salmon Kabab",
        36,
        "Two Atlantic salmon skewers, arugula salad, tahini and rice.",
        "g",
      ],
      ["Lamb Chops", 44, "Four grilled chops with vegetables and rice.", ""],
      [
        "Mixed Grilled Meat",
        38,
        "Lahmi, tawook and kafta skewers with vegetables and rice.",
        "g",
      ],
      [
        "Lamb Shank",
        38,
        "Braised lamb shank with fresh vegetables and basmati rice.",
        "g",
      ],
      [
        "Grilled Half Chicken",
        28,
        "With garlic paste, pickles and french fries.",
        "g",
      ],
      [
        "Grilled Whole Chicken",
        35,
        "With garlic paste, pickles and french fries.",
        "g",
      ],
    ],
  ],
  [
    "Sides",
    [
      ["Basmati Rice", 8, "", ""],
      ["Garlic Paste", 4, "Garlic, lemon, oil.", ""],
      ["Green Lebanese Olives", 8, "", ""],
      ["Mixed Pickles", 6, "", ""],
      ["Tomato and Cucumber", 6, "", ""],
      ["Yogurt", 5, "", ""],
      ["Tahini Sauce", 3, "", ""],
      ["Tomato Sauce", 3, "", ""],
      ["Falafel, 1 ball", 4, "", ""],
    ],
  ],
  [
    "Desserts",
    [
      ["Baklava", 8, "2 pieces.", ""],
      ["Knafeh", 13, "", ""],
      ["Rice Pudding", 8, "", ""],
      ["Pistachio Baklava Ice Cream", 14, "", ""],
      ["Cotton Candy with Ice Cream", 14, "", ""],
    ],
  ],
];
var tabs = document.getElementById("tabs"),
  items = document.getElementById("items");
var cur = 0,
  cart = {};
try {
  cart = JSON.parse(localStorage.getItem("hawrCart") || "{}");
} catch (e) {}
function item(k) {
  var a = k.split("-");
  return M[a[0]][1][a[1]];
}
function money(n) {
  return "$" + (Math.round(n * 100) / 100).toFixed(2).replace(".00", "");
}
function ctl(k, x) {
  if (!x[1]) return "";
  var q = cart[k] || 0;
  return q
    ? '<div class="qty"><button data-k="' +
        k +
        '" data-d="-1" aria-label="Remove one">−</button><b>' +
        q +
        '</b><button data-k="' +
        k +
        '" data-d="1" aria-label="Add one">+</button></div>'
    : '<button class="add" data-k="' +
        k +
        '" data-d="1" aria-label="Add to order">ADD<i>+</i></button>';
}
function card(k, x, ci) {
  var ph = dishPhoto(ci, x);
  var tags =
    (x[3].indexOf("g") > -1 ? '<span class="tag">GF</span>' : "") +
    (x[3].indexOf("v") > -1 ? '<span class="tag">VEG</span>' : "");
  return (
    '<div class="item"><div class="info">' +
    (x[3].indexOf("v") > -1
      ? '<span class="vd" title="Vegetarian"></span>'
      : "") +
    '<span class="nm">' +
    x[0] +
    '</span><span class="price">' +
    (x[1] ? "$" + x[1] : "Ask") +
    "</span>" +
    (x[2] ? '<span class="ds">' + x[2] + "</span>" : "") +
    (tags ? '<span class="tags">' + tags + "</span>" : "") +
    '</div><div class="pic"><img src="' +
    esc(ph[0]) +
    '"' +
    (ph[1] ? ' data-fb="' + esc(ph[1]) + '"' : "") +
    ' alt="" loading="lazy" onerror="imgFail(this)"><div class="act">' +
    ctl(k, x) +
    "</div></div></div>"
  );
}
var query = "";
function show(i) {
  if (i !== undefined) {
    cur = i;
    query = "";
    var sb = document.getElementById("menusearch");
    if (sb) sb.value = "";
  }
  var q = query.toLowerCase(),
    out = [];
  [].forEach.call(tabs.children, function (t, n) {
    t.setAttribute("aria-selected", !q && n === cur);
  });
  M.forEach(function (c, ci) {
    if (!q && ci !== cur) return;
    c[1].forEach(function (x, j) {
      if (q && (x[0] + " " + x[2]).toLowerCase().indexOf(q) < 0) return;
      out.push(card(ci + "-" + j, x, ci));
    });
  });
  document.getElementById("mhead").textContent = q
    ? "Search results (" + out.length + ")"
    : M[cur][0] + " (" + M[cur][1].length + ")";
  items.innerHTML =
    out.join("") || '<p class="empty">No dishes found. Try another word.</p>';
}
function totals() {
  var n = 0,
    t = 0;
  Object.keys(cart).forEach(function (k) {
    n += cart[k];
    t += cart[k] * item(k)[1];
  });
  return [n, t];
}
function change(k, d) {
  var q = (cart[k] || 0) + d;
  if (q <= 0) delete cart[k];
  else cart[k] = Math.min(q, 50);
  try {
    localStorage.setItem("hawrCart", JSON.stringify(cart));
  } catch (e) {}
  show();
  refresh();
}
function refresh() {
  var t = totals(),
    bar = document.getElementById("bar");
  if (t[0]) {
    bar.className = "btn sticky on";
    bar.innerHTML =
      "<span>" +
      t[0] +
      (t[0] > 1 ? " items" : " item") +
      " · " +
      money(t[1]) +
      "</span><span>View order ›</span>";
    bar.setAttribute("href", "#cart");
  } else {
    bar.className = "btn sticky";
    bar.textContent = "Place order";
    bar.setAttribute("href", "#menu");
  }
  var L = document.getElementById("lines");
  var keys = Object.keys(cart);
  L.innerHTML = keys.length
    ? keys
        .map(function (k) {
          var x = item(k);
          return (
            '<div class="line"><span class="n">' +
            x[0] +
            '<br><small style="font-weight:400;color:var(--mute)">' +
            money(x[1]) +
            ' each</small></span><div class="qty"><button data-k="' +
            k +
            '" data-d="-1" aria-label="Remove one">−</button><b>' +
            cart[k] +
            '</b><button data-k="' +
            k +
            '" data-d="1" aria-label="Add one">+</button></div></div>'
          );
        })
        .join("")
    : "<p>Your order is empty. Close this and tap Add on the menu.</p>";
  document.getElementById("total").textContent = money(t[1]);
  document.getElementById("f").style.display = keys.length ? "" : "none";
  renderPicks();
}
document.addEventListener("click", function (e) {
  var b = e.target.closest("[data-k]");
  if (b) change(b.dataset.k, +b.dataset.d);
});
var cartEl = document.getElementById("cart");
function closeCart() {
  cartEl.hidden = true;
  document.body.style.overflow = "";
}
function openCart() {
  document.getElementById("cartBody").hidden = false;
  document.getElementById("done").hidden = true;
  cartEl.hidden = false;
  document.body.style.overflow = "hidden";
  refresh();
}
document.getElementById("bar").addEventListener("click", function (e) {
  if (totals()[0]) {
    e.preventDefault();
    openCart();
  }
});
document.getElementById("close").onclick = closeCart;
cartEl.addEventListener("click", function (e) {
  if (e.target === cartEl) closeCart();
});
document.getElementById("back").onclick = openCart;
function orderText() {
  var t = totals(),
    v = function (id) {
      return document.getElementById(id).value.trim();
    };
  var lines = Object.keys(cart).map(function (k) {
    var x = item(k);
    return cart[k] + " x " + x[0] + " - " + money(cart[k] * x[1]);
  });
  return (
    "NEW PICKUP ORDER\n\n" +
    lines.join("\n") +
    "\n\nTotal: " +
    money(t[1]) +
    "\nName: " +
    v("nm") +
    "\nPhone: " +
    v("ph") +
    "\nWhen: " +
    v("wh") +
    "\nNotes: " +
    (v("nt") || "none")
  );
}
document.getElementById("f").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!totals()[0]) return;
  var txt = orderText();
  document.getElementById("mail").href =
    "mailto:alhawrportland@gmail.com?subject=" +
    encodeURIComponent(
      "Pickup order from " + document.getElementById("nm").value.trim()
    ) +
    "&body=" +
    encodeURIComponent(txt);
  document.getElementById("copy").onclick = function () {
    var b = this;
    (navigator.clipboard
      ? navigator.clipboard.writeText(txt)
      : Promise.reject()
    ).then(
      function () {
        b.textContent = "Copied!";
      },
      function () {
        window.prompt("Copy your order:", txt);
      }
    );
  };
  var msg = document.getElementById("sentMsg"),
    fb = document.getElementById("fallback"),
    back = document.getElementById("back"),
    btn = e.target.querySelector("button[type=submit]"),
    v = function (id) {
      return document.getElementById(id).value.trim();
    };
  var total = money(totals()[1]);
  function showDone() {
    btn.disabled = false;
    btn.textContent = "Place order";
    document.getElementById("cartBody").hidden = true;
    document.getElementById("done").hidden = false;
  }
  function manual(note) {
    msg.textContent =
      note + "Press the first button to send your order to the restaurant.";
    fb.hidden = false;
    back.textContent = "Back to my order";
    back.onclick = openCart;
    showDone();
  }
  // No order service set up: customer sends the order by email, call or copy.
  if (!ORDER_ENDPOINT) {
    manual("Almost done. ");
    return;
  }
  btn.disabled = true;
  btn.textContent = "Sending…";
  fetch(ORDER_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: v("nm"),
      phone: v("ph"),
      pickup: document.getElementById("wh").value,
      notes: v("nt"),
      total: total,
      order: txt,
    }),
  })
    .then(function (r) {
      if (!r.ok) throw new Error("fail");
    })
    .then(function () {
      msg.textContent =
        "Thank you! We got your order. Total " +
        total +
        ". We will call you to confirm.";
      fb.hidden = true;
      back.textContent = "Close";
      back.onclick = closeCart;
      cart = {};
      try {
        localStorage.removeItem("hawrCart");
      } catch (x) {}
      show();
      refresh();
      showDone();
    })
    .catch(function () {
      manual("We could not send your order online. ");
    });
});
M.forEach(function (c, i) {
  var b = document.createElement("button");
  b.className = "tab";
  b.setAttribute("role", "tab");
  b.innerHTML = c[0] + "<small>" + c[1].length + "</small>";
  b.onclick = function () {
    show(i);
  };
  tabs.appendChild(b);
});
show(0);
refresh();

// hours: [day, label, [open,close] ranges in minutes]
var H = [
  [0, "Sunday", "1pm – 9:30pm", [[780, 1290]]],
  [1, "Monday", "Closed", []],
  [
    2,
    "Tuesday",
    "11am – 2pm, 4pm – 10pm",
    [
      [660, 840],
      [960, 1320],
    ],
  ],
  [
    3,
    "Wednesday",
    "11am – 2pm, 4pm – 10pm",
    [
      [660, 840],
      [960, 1320],
    ],
  ],
  [
    4,
    "Thursday",
    "11am – 2pm, 4pm – 10pm",
    [
      [660, 840],
      [960, 1320],
    ],
  ],
  [
    5,
    "Friday",
    "11am – 2pm, 4pm – 10pm",
    [
      [660, 840],
      [960, 1320],
    ],
  ],
  [6, "Saturday", "4pm – 10pm", [[960, 1320]]],
];
try {
  var p = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date()),
    g = {};
  p.forEach(function (x) {
    g[x.type] = x.value;
  });
  var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g.weekday),
    m = (+g.hour % 24) * 60 + +g.minute;
  var open = H[d][3].some(function (r) {
    return m >= r[0] && m < r[1];
  });
  var s = document.getElementById("status");
  if (open) s.className = "status open";
  else s.className = "status";
  document.getElementById("statusText").textContent = open
    ? "Open now"
    : "Closed right now";
  document.getElementById("hours").innerHTML = H.slice(1)
    .concat([H[0]])
    .map(function (h) {
      return (
        "<tr" +
        (h[0] === d ? ' class="today"' : "") +
        "><td>" +
        h[1] +
        "</td><td>" +
        h[2] +
        "</td></tr>"
      );
    })
    .join("");
} catch (e) {
  document.getElementById("hours").innerHTML = H.slice(1)
    .concat([H[0]])
    .map(function (h) {
      return "<tr><td>" + h[1] + "</td><td>" + h[2] + "</td></tr>";
    })
    .join("");
  document.getElementById("status").style.display = "none";
}

// ---- Navigation bar ----
var burger = document.getElementById("burger"),
  links = document.getElementById("links");
function setNav(open) {
  links.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.onclick = function () {
  setNav(!links.classList.contains("open"));
};
links.addEventListener("click", function (e) {
  if (e.target.tagName === "A") setNav(false);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    setNav(false);
    if (!cartEl.hidden) closeCart();
  }
});
// Highlight the link for the section being read
if ("IntersectionObserver" in window) {
  var ob = new IntersectionObserver(
    function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting)
          [].forEach.call(links.children, function (a) {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + en.target.id
            );
          });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  [
    "home",
    "about",
    "menu",
    "gallery",
    "reviews",
    "reservations",
    "contact",
  ].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) ob.observe(el);
  });
}

// Menu search
document.getElementById("menusearch").addEventListener("input", function () {
  query = this.value.trim();
  show();
});
// Table request: opens an email to the restaurant with the details filled in
(function () {
  var f = document.getElementById("bk"),
    d = document.getElementById("bdate");
  var now = new Date();
  d.min =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) {
      return document.getElementById(id).value.trim();
    };
    var body =
      "TABLE REQUEST\n\nName: " +
      v("bname") +
      "\nPhone: " +
      v("bphone") +
      "\nDate: " +
      v("bdate") +
      "\nTime: " +
      v("btime") +
      "\nGuests: " +
      v("bguests");
    window.location.href =
      "mailto:alhawrportland@gmail.com?subject=" +
      encodeURIComponent("Table request - " + v("bname") + " - " + v("bdate")) +
      "&body=" +
      encodeURIComponent(body);
  });
})();

// "Start with these": four quick picks that add straight to the order
function renderPicks() {
  var el = document.getElementById("pickgrid");
  if (!el) return;
  el.innerHTML = ["3-0", "0-0", "3-4", "5-0"]
    .map(function (k) {
      var x = item(k);
      return (
        '<div class="pick"><div class="ph"><img src="' +
        CAT_IMG[+k.split("-")[0]] +
        '" alt="" loading="lazy" onerror="this.remove()"></div><b>' +
        x[0] +
        '</b><div class="pr"><span class="price">$' +
        x[1] +
        '</span><div class="act2">' +
        ctl(k, x) +
        "</div></div></div>"
      );
    })
    .join("");
}
renderPicks();
// Scroll: header shadow, slow photo drift, sections rise into view
(function () {
  var rm =
    window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hd = document.querySelector("header"),
    img = document.querySelector(".arch img"),
    tk = false;
  function on() {
    var y = window.scrollY;
    hd.classList.toggle("solid", y > 40);
    if (img && !rm && y < 900)
      img.style.transform = "translateY(" + y * 0.04 + "px)";
    tk = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!tk) {
        tk = true;
        requestAnimationFrame(on);
      }
    },
    { passive: true }
  );
  on();
  if (rm || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  [].forEach.call(
    document.querySelectorAll(
      "section .lead,.between,.q,.gal figure,.card,.cpanel,.faq details,#pickgrid,.grid4>div,.note"
    ),
    function (el, i) {
      el.classList.add("rv");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    }
  );
})();