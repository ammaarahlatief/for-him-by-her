const WHATSAPP_NUMBER = "27839561961";
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1b1b21"/><text x="50%" y="50%" fill="#a6a4b0" font-family="sans-serif" font-size="13" letter-spacing="2" text-anchor="middle" dominant-baseline="middle">FOR HIM BY HER</text></svg>'
  );

const PRODUCTS = [
  { id: 1, name: "Black Square Bracelet", finish: "Black", category: "bracelets", price: 120, image: "images/black-square-bracelet.jpg", featured: true },
  { id: 2, name: "Black Oval Bracelet", finish: "Black", category: "bracelets", price: 130, image: "images/black-oval-bracelet.jpg", featured: true },
  { id: 3, name: "Silver Black Clover Bracelet", finish: "Black", category: "bracelets", price: 120, image: "images/silver-black-clover-bracelet.jpg", featured: true },
  { id: 4, name: "Black Magnetic Leather Bracelet", finish: "Black", category: "bracelets", price: 110, image: "images/black-magnetic-leather-bracelet.jpg", featured: true },
  { id: 5, name: "Black Leather Bracelet", finish: "Black", category: "bracelets", price: 80, image: "images/black-leather-bracelet.jpg", featured: false },
  { id: 6, name: "Black Italian Charm Bracelet", finish: "Black", category: "bracelets", price: 140, image: "images/black-italian-charm-bracelet.jpg", featured: false },
  { id: 7, name: "Black Ring", finish: "Black", category: "rings", price: 110, image: "images/black-ring.jpg", featured: false },

  { id: 8, name: "Extra Thick Silver Bracelet", finish: "Silver-Plated", category: "bracelets", price: 130, image: "images/extra-thick-silver-bracelet.jpg", featured: false },
  { id: 9, name: "Silver Clover Ring", finish: "Silver-Plated", category: "rings", price: 120, image: "images/silver-clover-ring.jpg", featured: false },
  { id: 10, name: "Silver Watch Bracelet", finish: "Silver-Plated", category: "bracelets", price: 150, image: "images/silver-watch-bracelet.jpg", featured: false },
  { id: 11, name: "Silver Ring", finish: "Silver-Plated", category: "rings", price: 140, image: "images/silver-ring.jpg", featured: false },
  { id: 12, name: "Silver Italian Charm Bracelet", finish: "Silver-Plated", category: "bracelets", price: 140, image: "images/silver-italian-charm-bracelet.jpg", featured: false },
  { id: 13, name: "Thin Silver Bracelet", finish: "Silver-Plated", category: "bracelets", price: 120, image: "images/thin-silver-bracelet.jpg", featured: false },
  { id: 14, name: "Silver Flat Snake Necklace", finish: "Silver-Plated", category: "necklaces", price: 120, image: "images/silver-flat-snake-necklace.jpg", featured: false },
  { id: 15, name: "Thick Silver Flat Snake Necklace", finish: "Silver-Plated", category: "necklaces", price: 140, image: "images/thick-silver-flat-snake-necklace.jpg", featured: false },

  { id: 16, name: "Gold Clover Ring", finish: "Gold-Plated", category: "rings", price: 120, image: "images/gold-clover-ring.jpg", featured: false },
  { id: 17, name: "Gold Flat Snake Bracelet", finish: "Gold-Plated", category: "bracelets", price: 110, image: "images/gold-flat-snake-bracelet.jpg", featured: false },
  { id: 18, name: "Gold Flat Snake Necklace", finish: "Gold-Plated", category: "necklaces", price: 130, image: "images/gold-flat-snake-necklace.jpg", featured: false },
  { id: 19, name: "Thick Gold Flat Snake Necklace", finish: "Gold-Plated", category: "necklaces", price: 150, image: "images/thick-gold-flat-snake-necklace.jpg", featured: false },
  { id: 20, name: "Gold Italian Charm Bracelet", finish: "Gold-Plated", category: "bracelets", price: 150, image: "images/gold-italian-charm-bracelet.jpg", featured: false },
  { id: 21, name: "Thin Gold Link Bracelet", finish: "Gold-Plated", category: "bracelets", price: 110, image: "images/thin-link-gold-bracelet.jpg", featured: false },
  { id: 22, name: "Twisted Gold Bracelet", finish: "Gold-Plated", category: "bracelets", price: 110, image: "images/twisted-gold-bracelet.jpg", featured: false },

  { id: 23, name: "Silicone Ring", finish: "Silicone", category: "rings", price: 100, image: "images/silicone-ring.jpg", featured: false }
];

let bag = [];
try {
  const saved = JSON.parse(localStorage.getItem("fhbh_bag") || "[]");
  if (Array.isArray(saved)) bag = saved;
} catch (_) {
  bag = [];
}

let activeCategory = "all";
let activeFinish = "all";

function formatRand(amount) {
  return "R" + (Number(amount) || 0);
}

function saveBag() {
  try {
    localStorage.setItem("fhbh_bag", JSON.stringify(bag));
  } catch (_) {}
  renderBag();
}

function addToBag(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  const existing = bag.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    bag.push({
      id: product.id,
      name: product.name,
      finish: product.finish,
      price: product.price,
      qty: 1
    });
  }
  saveBag();
  openBag();
}

function updateQty(id, delta) {
  const item = bag.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    bag = bag.filter((i) => i.id !== id);
  }
  saveBag();
}

function renderBag() {
  const countEl = document.getElementById("bagCount");
  const itemsEl = document.getElementById("bagItems");
  const subtotalEl = document.getElementById("bagSubtotal");

  const totalQty = bag.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const subtotal = bag.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0
  );

  if (countEl) countEl.textContent = totalQty;
  if (subtotalEl) subtotalEl.textContent = formatRand(subtotal);

  if (!itemsEl) return;

  if (!bag.length) {
    itemsEl.innerHTML = '<p style="color:#a6a4b0;font-size:0.84rem;">Your bag is empty.</p>';
    return;
  }

  itemsEl.innerHTML = bag
    .map(
      (item) => `
        <div class="bag-item">
          <div>
            <div>${item.name}</div>
            <small style="color:#a6a4b0;">${item.finish || ""} · ${formatRand(item.price)}</small>
          </div>
          <div class="bag-qty">
            <button type="button" data-qty-id="${item.id}" data-delta="-1">-</button>
            <span>${item.qty}</span>
            <button type="button" data-qty-id="${item.id}" data-delta="1">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

function handleImageFallback(img) {
  const step = Number(img.dataset.fallbackStep || 0);
  const base = img.dataset.base;
  const exts = [".jpeg", ".png", ".webp", ".JPG", ".JPEG"];

  if (base && step < exts.length) {
    img.dataset.fallbackStep = String(step + 1);
    img.src = base + exts[step];
    return;
  }

  img.onerror = null;
  img.src = FALLBACK_IMG;
}

function createProductCard(product) {
  const base = product.image.replace(/\.[^/.]+$/, "");
  const code = String(product.id).padStart(2, "0");
  return `
    <article class="product-card">
      <div class="product-img-wrap">
        <img
          src="${product.image}"
          data-base="${base}"
          data-fallback-step="0"
          alt="${product.name} (${product.finish})"
          loading="lazy"
        />
      </div>
      <div class="product-body">
        <div class="product-top-row">
          <span class="product-cat">${product.category} · ${product.finish}</span>
          <span class="piece-num">#${code}</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">${formatRand(product.price)}</div>
        <button type="button" class="add-btn" data-add-id="${product.id}">ADD TO BAG</button>
      </div>
    </article>
  `;
}

function renderProducts() {
  const featuredGrid = document.getElementById("featuredGrid");
  const catalogueGrid = document.getElementById("catalogueGrid");
  const countLabel = document.getElementById("catalogueCount");

  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS.filter((p) => p.featured).map(createProductCard).join("");
  }

  if (catalogueGrid) {
    const filtered = PRODUCTS.filter((p) => {
      const catMatch = activeCategory === "all" || p.category === activeCategory;
      const finMatch = activeFinish === "all" || p.finish === activeFinish;
      return catMatch && finMatch;
    });

    if (countLabel) {
      countLabel.textContent = filtered.length === 1 ? "1 Piece" : filtered.length + " Pieces";
    }

    catalogueGrid.innerHTML = filtered.length
      ? filtered.map(createProductCard).join("")
      : '<p style="color:#a6a4b0;font-size:0.86rem;grid-column:1/-1;">No pieces match that filter combination.</p>';
  }

  document.querySelectorAll(".product-img-wrap img").forEach((img) => {
    img.addEventListener("error", () => handleImageFallback(img));
  });
}

function closeMobileMenu() {
  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("menuToggleBtn");
  nav?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}

function openBag() {
  closeMobileMenu();
  document.getElementById("bagDrawer")?.classList.add("open");
  document.getElementById("bagOverlay")?.classList.add("open");
}

function closeBag() {
  document.getElementById("bagDrawer")?.classList.remove("open");
  document.getElementById("bagOverlay")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderBag();

  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const mainNav = document.getElementById("mainNav");

  menuToggleBtn?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open");
    menuToggleBtn.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.getElementById("openBagBtn")?.addEventListener("click", openBag);
  document.getElementById("closeBagBtn")?.addEventListener("click", closeBag);
  document.getElementById("bagOverlay")?.addEventListener("click", closeBag);

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-id]");
    if (addBtn) {
      addToBag(Number(addBtn.dataset.addId));
      return;
    }

    const qtyBtn = e.target.closest("[data-qty-id]");
    if (qtyBtn) {
      updateQty(Number(qtyBtn.dataset.qtyId), Number(qtyBtn.dataset.delta));
    }
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category || "all";
      renderProducts();
    });
  });

  document.querySelectorAll(".finish-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".finish-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFinish = btn.dataset.finish || "all";
      renderProducts();
    });
  });

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (!bag.length) return;
    const name = document.getElementById("customerName")?.value.trim() || "Customer";
    const contact = document.getElementById("customerContact")?.value.trim() || "Not provided";
    const lines = bag.map(
      (item) => `- ${item.name} (${item.finish}) x${item.qty} (${formatRand(item.price * item.qty)})`
    );
    const total = bag.reduce((sum, item) => sum + item.price * item.qty, 0);

    const message = [
      "Hi FOR HIM by Her, I'd like to place an order:",
      ...lines,
      "Subtotal: " + formatRand(total),
      "Name: " + name,
      "Contact: " + contact
    ].join("\n");

    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank");
  });
});