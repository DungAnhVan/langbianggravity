const products = [
  {
    slug: "conversion-kit",
    name: "WR155 / CRF150 520 Conversion Kit",
    category: "520 Conversion",
    short:
      "Front and rear sprocket package with 520 chain sizing for stronger off-road drivetrain service.",
    price: 1890000,
    priceNote: "placeholder",
    stock: "Batch slots open",
    image: "assets/images/product-bench.webp",
    fitment: "Yamaha WR155R, Honda CRF150L, custom verification on request",
    material: "SCM440 front sprocket, 7075-T6 rear sprocket option, 520 chain hardware",
    treatment: "Induction-hardened front teeth, anodized rear finish, batch fitment check",
    options: "13T / 14T front, 45T to 52T rear, fleet ratios by terrain",
    chainSize: "520",
    useCase: "Enduro, motocross practice, rental fleet, hill-climb, adventure dirt",
    compatibility:
      "Confirm chain slider clearance, rear hub pattern, chain length, and brake/swingarm clearance before ordering.",
    badges: ["WR155", "CRF150", "520 chain", "Fleet-ready"],
    specs: {
      "Bike fitment": "WR155 / CRF150 with fitment verification",
      Material: "SCM440 steel front, 7075-T6 aluminum rear option",
      "Heat treatment / finish": "Induction hardened contact surfaces, hard anodized rear finish",
      "Tooth count / size options": "13T, 14T front / 45T to 52T rear",
      "Chain size": "520",
      "Use case": "Racing, rental, daily off-road, adventure dirt",
      "Compatibility notes": "Confirm hub pattern, chain slider, case clearance, and chain length"
    }
  },
  {
    slug: "front-sprocket",
    name: "SCM440 Front Sprocket",
    category: "Front Sprockets",
    short: "Hardened front sprocket for high-contact wear, precise spline fit, and mud-season durability.",
    price: 480000,
    priceNote: "from",
    stock: "Limited stock",
    image: "assets/products/front-sprocket-scm440.png",
    fitment: "WR155 / CRF150 and private fitments by spline sample",
    material: "SCM440 chromoly steel",
    treatment: "Heat-treated and black oxide / phosphate finish depending on batch",
    options: "12T, 13T, 14T, 15T by model program",
    chainSize: "428 or 520 by fitment",
    useCase: "Racing, rental fleet, daily off-road, conversion kits",
    compatibility:
      "Spline pattern and case clearance must match the bike model. Do not install if chain alignment is uncertain.",
    badges: ["SCM440", "Heat-treated", "Spline fit"],
    specs: {
      "Bike fitment": "WR155 / CRF150 / custom spline programs",
      Material: "SCM440 steel",
      "Heat treatment / finish": "Heat-treated teeth, black protective finish",
      "Tooth count / size options": "12T to 15T depending on model",
      "Chain size": "428 / 520",
      "Use case": "Racing, rental, daily off-road",
      "Compatibility notes": "Verify spline profile, retaining plate, chain width, and case clearance"
    }
  },
  {
    slug: "rear-sprocket",
    name: "7075-T6 Rear Sprocket",
    category: "Rear Sprockets",
    short: "Lightweight rear sprocket options for sharper response, clean fitment, and premium builds.",
    price: 890000,
    priceNote: "from",
    stock: "Made by batch",
    image: "assets/products/rear-sprocket-7075.png",
    fitment: "WR155 / CRF150 / dealer hub patterns by drawing",
    material: "7075-T6 aluminum or steel program by use case",
    treatment: "CNC machined, anodized finish, tooth profile inspection",
    options: "45T, 48T, 49T, 50T, 52T, private tooth counts by batch",
    chainSize: "428 or 520",
    useCase: "Race builds, rental replacement, trail torque setups, adventure dirt",
    compatibility:
      "Confirm bolt circle diameter, center bore, hub offset, chain line, and rear guide clearance.",
    badges: ["7075-T6", "CNC", "Anodized"],
    specs: {
      "Bike fitment": "WR155 / CRF150 / custom hub pattern",
      Material: "7075-T6 aluminum, steel available for fleet use",
      "Heat treatment / finish": "T6 temper, anodized finish, inspected tooth profile",
      "Tooth count / size options": "45T to 52T standard planning range",
      "Chain size": "428 / 520",
      "Use case": "Racing, rental, daily off-road, adventure",
      "Compatibility notes": "Verify BCD, center bore, bolt count, offset, and chain guide clearance"
    }
  },
  {
    slug: "chain-guide",
    name: "Off-road Chain Guide",
    category: "Chain Guides",
    short: "Chain-control and protection program for mud, rocks, altered ratios, and rental-fleet abuse.",
    price: 720000,
    priceNote: "placeholder",
    stock: "Prototype queue",
    image: "assets/images/field-test.webp",
    fitment: "WR155 / CRF150 first, private swingarm programs by sample",
    material: "CNC aluminum carrier with replaceable wear block program",
    treatment: "Anodized carrier, replaceable polymer guide insert",
    options: "Standard, mud-clearance, rental reinforced",
    chainSize: "428 / 520",
    useCase: "Enduro, rental fleet, rocks, mud, altered gearing",
    compatibility:
      "Swingarm mount spacing and rear sprocket diameter must be confirmed before installation.",
    badges: ["Mud clearance", "Replaceable wear", "B2B program"],
    specs: {
      "Bike fitment": "WR155 / CRF150 / custom swingarm mount",
      Material: "Aluminum carrier and polymer wear insert",
      "Heat treatment / finish": "Anodized aluminum, replaceable guide insert",
      "Tooth count / size options": "Clearance planned around rear sprocket diameter",
      "Chain size": "428 / 520",
      "Use case": "Racing, rental, daily off-road",
      "Compatibility notes": "Verify swingarm mount, wheel travel, sprocket diameter, and chain line"
    }
  },
  {
    slug: "titanium-bolts",
    name: "Grade 5 Titanium Bolt Kit",
    category: "Titanium Bolt Kits",
    short: "Selected titanium hardware kits for premium builds where weight and corrosion resistance matter.",
    price: 650000,
    priceNote: "from",
    stock: "Selected stock",
    image: "assets/images/product-bench.webp",
    fitment: "Universal by thread, length, and torque requirement",
    material: "Grade 5 titanium, Ti-6Al-4V",
    treatment: "Rolled thread where available, anodized or raw titanium finish",
    options: "Rotor, sprocket, engine cover, body hardware, custom measured kits",
    chainSize: "Not applicable",
    useCase: "Race builds, corrosion control, premium restoration, selected high-value points",
    compatibility:
      "Confirm thread pitch, length, shoulder, washer requirement, torque value, and heat exposure.",
    badges: ["Grade 5 Ti", "Ti-6Al-4V", "Measured kits"],
    specs: {
      "Bike fitment": "Universal by measured thread and length",
      Material: "Grade 5 titanium, Ti-6Al-4V",
      "Heat treatment / finish": "Raw titanium or anodized finish by kit",
      "Tooth count / size options": "M5 / M6 / M8 / M10 by application",
      "Chain size": "Not applicable",
      "Use case": "Racing, premium daily off-road, corrosion-prone builds",
      "Compatibility notes": "Verify pitch, grip length, torque, washer, and anti-seize requirement"
    }
  },
  {
    slug: "brake-rotor",
    name: "Off-road Brake Rotor",
    category: "Brake Rotors",
    short: "Selected rotor program for predictable bite, heat behavior, mud clearing, and replacement planning.",
    price: 980000,
    priceNote: "from",
    stock: "Sample stock",
    image: "assets/products/brake-rotor.png",
    fitment: "WR155 / CRF150 and model-specific bolt patterns",
    material: "Stainless rotor steel by application",
    treatment: "Precision-cut profile, flatness check, surface finish control",
    options: "Front / rear, solid / wave profile, fleet replacement sets",
    chainSize: "Not applicable",
    useCase: "Rental fleet, enduro, daily off-road, wet terrain",
    compatibility:
      "Confirm rotor diameter, bolt circle, offset, caliper clearance, and pad compound before installation.",
    badges: ["Flatness check", "Mud clearing", "Wet control"],
    specs: {
      "Bike fitment": "WR155 / CRF150 / custom bolt pattern",
      Material: "Rotor-grade stainless steel",
      "Heat treatment / finish": "Controlled surface finish, flatness inspection",
      "Tooth count / size options": "Front / rear rotor diameters by model",
      "Chain size": "Not applicable",
      "Use case": "Racing, rental, daily off-road, adventure",
      "Compatibility notes": "Verify diameter, offset, bolt pattern, caliper, and pad compound"
    }
  },
  {
    slug: "garage-essentials",
    name: "Garage Essentials Pack",
    category: "Bearings and Garage Parts",
    short: "Curated bearings, workshop consumables, and selected official garage products for off-road service.",
    price: 320000,
    priceNote: "from",
    stock: "Curated stock",
    image: "assets/images/cnc-inspection.webp",
    fitment: "By bike model and service requirement",
    material: "Bearings, seals, fasteners, fluids, and selected workshop parts",
    treatment: "Supplier verified, batch checked, off-road use selected",
    options: "Wheel bearing sets, linkage service, chain care, workshop stock packs",
    chainSize: "By product",
    useCase: "Rental fleet service, shop supply, trail maintenance, dealer packs",
    compatibility:
      "Part numbers and measurements must be checked against the actual bike before installation.",
    badges: ["Curated", "Workshop", "Fleet stock"],
    specs: {
      "Bike fitment": "By model, year, and measured part number",
      Material: "Bearings, seals, fasteners, fluids, workshop consumables",
      "Heat treatment / finish": "Supplier-specific, selected for off-road service",
      "Tooth count / size options": "By service pack",
      "Chain size": "By product",
      "Use case": "Rental, daily off-road, shop supply",
      "Compatibility notes": "Verify part number, dimensions, seal type, and service environment"
    }
  }
];

const state = {
  cart: loadCart()
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function formatPrice(value) {
  return `VND ${new Intl.NumberFormat("en-US").format(value)}`;
}

function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("lg-cart")) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("lg-cart", JSON.stringify(state.cart));
  renderCart();
}

function addToCart(slug) {
  const item = state.cart.find((cartItem) => cartItem.slug === slug);
  if (item) {
    item.qty += 1;
  } else {
    state.cart.push({ slug, qty: 1 });
  }
  saveCart();
  openCart();
}

function changeQty(slug, delta) {
  const item = state.cart.find((cartItem) => cartItem.slug === slug);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.slug !== slug);
  }
  saveCart();
}

function renderStore() {
  const grid = qs("[data-store-grid]");
  const template = qs("#store-card-template");
  if (!grid || !template) return;

  products.forEach((product) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const img = qs("img", card);
    img.src = product.image;
    img.alt = product.name;
    qs(".stock-badge", card).textContent = product.stock;
    qs(".product-meta", card).textContent = product.category;
    qs("h3", card).textContent = product.name;
    qs("p", card).textContent = product.short;
    qs(".price-row strong", card).textContent = formatPrice(product.price);
    qs(".price-row span", card).textContent = product.priceNote;
    qs("[data-view-details]", card).addEventListener("click", () => openProduct(product.slug));
    qs("[data-add-cart]", card).addEventListener("click", () => addToCart(product.slug));
    grid.append(card);
  });
}

function openProduct(slug) {
  const product = getProduct(slug);
  const dialog = qs("[data-product-dialog]");
  const detail = qs("[data-product-detail]");
  if (!product || !dialog || !detail) return;

  detail.innerHTML = `
    <div class="product-detail-media">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-content">
      <p class="eyebrow">${product.category}</p>
      <h2>${product.name}</h2>
      <p>${product.short}</p>
      <div class="detail-badges">
        ${product.badges.map((badge) => `<span>${badge}</span>`).join("")}
      </div>
      <table class="spec-table">
        <tbody>
          ${Object.entries(product.specs)
            .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
            .join("")}
        </tbody>
      </table>
      <p><strong>Material:</strong> ${product.material}</p>
      <p><strong>Heat treatment / finish:</strong> ${product.treatment}</p>
      <p><strong>Options:</strong> ${product.options}</p>
      <p><strong>Compatibility:</strong> ${product.compatibility}</p>
      <p class="warning-note">Warning: confirm fitment before installation.</p>
      <div class="detail-actions">
        <button class="button button-primary" type="button" data-modal-add>Add to Cart</button>
        <button class="button" type="button" data-modal-bulk>Request Bulk Quote</button>
        <button class="button" type="button" data-modal-b2b>B2B Inquiry</button>
      </div>
    </div>
  `;

  qs("[data-modal-add]", detail).addEventListener("click", () => addToCart(product.slug));
  qs("[data-modal-bulk]", detail).addEventListener("click", () => prefillQuote(product, "Bulk quote"));
  qs("[data-modal-b2b]", detail).addEventListener("click", () => prefillQuote(product, "B2B inquiry"));

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeProduct() {
  const dialog = qs("[data-product-dialog]");
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function prefillQuote(product, requestType) {
  const form = qs("[data-quote-form]");
  closeProduct();
  if (!form) return;
  form.productNeeded.value = product.name;
  form.customRequest.value = requestType;
  form.quantity.value = form.quantity.value || "10";
  qs("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const total = state.cart.reduce((sum, item) => {
    const product = getProduct(item.slug);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  qsa("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
  });
  qs("[data-cart-total]").textContent = formatPrice(total);

  const list = qs("[data-cart-items]");
  list.innerHTML = "";

  if (!state.cart.length) {
    const empty = document.createElement("p");
    empty.textContent = "No products selected yet.";
    list.append(empty);
    return;
  }

  state.cart.forEach((item) => {
    const product = getProduct(item.slug);
    if (!product) return;

    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <span>${formatPrice(product.price)}</span>
      </div>
      <div class="qty-controls" aria-label="Quantity controls for ${product.name}">
        <button type="button" aria-label="Decrease quantity" data-qty-minus>-</button>
        <strong>${item.qty}</strong>
        <button type="button" aria-label="Increase quantity" data-qty-plus>+</button>
      </div>
    `;
    qs("[data-qty-minus]", row).addEventListener("click", () => changeQty(product.slug, -1));
    qs("[data-qty-plus]", row).addEventListener("click", () => changeQty(product.slug, 1));
    list.append(row);
  });
}

function openCart() {
  const drawer = qs("[data-cart-drawer]");
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
}

function closeCart() {
  const drawer = qs("[data-cart-drawer]");
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
}

function setupNavigation() {
  const header = qs("[data-header]");
  const nav = qs("[data-nav]");
  const toggle = qs("[data-nav-toggle]");

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  qsa(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

function setupForms() {
  const form = qs("[data-quote-form]");
  const status = qs("[data-form-status]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      "Langbiang Gravity quote request",
      "",
      `Name: ${data.get("name") || ""}`,
      `Phone / WhatsApp / Zalo: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Business type: ${data.get("businessType") || ""}`,
      `Bike model: ${data.get("bikeModel") || ""}`,
      `Product needed: ${data.get("productNeeded") || ""}`,
      `Quantity: ${data.get("quantity") || ""}`,
      `Custom request: ${data.get("customRequest") || ""}`,
      "",
      `Message: ${data.get("message") || ""}`
    ];
    const subject = encodeURIComponent("Langbiang Gravity quote request");
    const body = encodeURIComponent(lines.join("\n"));
    status.textContent = "Email draft opened. Attach drawing or sample photo before sending if needed.";
    window.location.href = `mailto:sales@langbianggravity.com?subject=${subject}&body=${body}`;
  });
}

function setupCartQuote() {
  const link = qs("[data-cart-quote]");
  link.addEventListener("click", () => {
    const form = qs("[data-quote-form]");
    if (!form) return;
    const summary = state.cart
      .map((item) => {
        const product = getProduct(item.slug);
        return product ? `${item.qty} x ${product.name}` : "";
      })
      .filter(Boolean)
      .join(", ");
    form.productNeeded.value = summary;
    form.customRequest.value = "Official store invoice / fitment quote";
    closeCart();
  });
}

function init() {
  renderStore();
  renderCart();
  setupNavigation();
  setupForms();
  setupCartQuote();

  qsa("[data-open-product]").forEach((button) => {
    button.addEventListener("click", () => openProduct(button.dataset.openProduct));
  });

  qs("[data-dialog-close]").addEventListener("click", closeProduct);
  qs("[data-product-dialog]").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeProduct();
  });

  qsa("[data-cart-open]").forEach((button) => {
    button.addEventListener("click", openCart);
  });
  qs("[data-cart-close]").addEventListener("click", closeCart);
  qs("[data-cart-drawer]").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeCart();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });
}

document.addEventListener("DOMContentLoaded", init);
