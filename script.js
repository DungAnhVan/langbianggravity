const products = [
  {
    slug: "front-sprocket-42crmo4",
    name: "42CrMo4 Race Steel Front Sprocket",
    category: "Front Sprockets",
    short:
      "Front sprocket for direct chain load, tooth wear, mud grinding, hard acceleration, and repeated racing abuse.",
    price: 480000,
    priceNote: "from",
    stock: "Batch slots open",
    image: "assets/products/front-sprocket-scm440.png",
    fitment: "By bike model, year, spline, and chain-size program",
    material: "42CrMo4 Cr-Mo alloy steel",
    treatment: "Heat-treated batch program, black oxide or phosphate finish depending on batch",
    options: "12T, 13T, 14T, 15T by model and chain-size program",
    chainSize: "428 / 520 by fitment",
    useCase: "Motocross, enduro, rental fleet, race starts, hill climbs",
    compatibility:
      "Confirm bike model, year, spline profile, retaining plate, chain width, and case clearance before ordering.",
    badges: ["42CrMo4", "Race Steel", "Front Load", "Chain Load"],
    specs: {
      "Bike fitment": "By model, year, spline, and chain-size program",
      Material: "42CrMo4 Cr-Mo alloy steel",
      "Heat treatment / finish": "Heat-treated batch program, black oxide or phosphate finish depending on batch",
      "Tooth count / size options": "12T, 13T, 14T, 15T by model and chain-size program",
      "Chain size": "428 / 520 by fitment",
      "Use case": "Motocross, enduro, rental fleet, race starts, hill climbs",
      "Compatibility notes": "Verify spline profile, retaining plate, chain width, and case clearance"
    }
  },
  {
    slug: "rear-sprocket-42crmo4",
    name: "42CrMo4 Race Steel Rear Sprocket",
    category: "Rear Sprockets",
    short:
      "Steel rear sprocket for riders and fleets that choose durability, hard abuse, and predictable replacement over weight saving.",
    price: 780000,
    priceNote: "from",
    stock: "Made by batch",
    image: "assets/images/product-bench.webp",
    fitment: "By bike model, year, hub pattern, and chain-size program",
    material: "42CrMo4 Cr-Mo alloy steel",
    treatment: "Heat-treated and protective finish by batch",
    options: "45T to 52T planning range, private tooth counts by batch",
    chainSize: "428 / 520 by fitment",
    useCase: "Hard enduro, rental fleet, mud, rocks, hill climbs, long service intervals",
    compatibility:
      "Confirm bolt circle diameter, center bore, bolt count, hub offset, chain line, and guide clearance before ordering.",
    badges: ["42CrMo4", "Steel Rear", "Fleet Abuse", "Durability"],
    specs: {
      "Bike fitment": "By model, year, hub pattern, and chain-size program",
      Material: "42CrMo4 Cr-Mo alloy steel",
      "Heat treatment / finish": "Heat-treated and protective finish by batch",
      "Tooth count / size options": "45T to 52T planning range, private tooth counts by batch",
      "Chain size": "428 / 520 by fitment",
      "Use case": "Hard enduro, rental fleet, mud, rocks, hill climbs, long service intervals",
      "Compatibility notes": "Verify BCD, center bore, bolt count, offset, chain line, and guide clearance"
    }
  },
  {
    slug: "rear-sprocket-7075",
    name: "7075-T6 Race Aluminum Rear Sprocket",
    category: "Rear Sprockets",
    short:
      "Lightweight race rear sprocket for reduced rotating mass, sharper response, and premium race builds.",
    price: 890000,
    priceNote: "from",
    stock: "Made by batch",
    image: "assets/products/rear-sprocket-7075.png",
    fitment: "By bike model, year, hub pattern, and chain-size program",
    material: "7075-T6 aluminum",
    treatment: "CNC machined, anodized finish, inspected tooth profile",
    options: "45T, 48T, 49T, 50T, 52T, private tooth counts by batch",
    chainSize: "428 / 520 by fitment",
    useCase: "Race builds, performance setups, riders who want lighter rear drive",
    compatibility:
      "Confirm bolt circle diameter, center bore, bolt count, hub offset, chain line, and guide clearance before ordering.",
    badges: ["7075-T6", "Race Aluminum", "Lightweight", "Response"],
    specs: {
      "Bike fitment": "By model, year, hub pattern, and chain-size program",
      Material: "7075-T6 aluminum",
      "Heat treatment / finish": "CNC machined, anodized finish, inspected tooth profile",
      "Tooth count / size options": "45T, 48T, 49T, 50T, 52T, private tooth counts by batch",
      "Chain size": "428 / 520 by fitment",
      "Use case": "Race builds, performance setups, riders who want lighter rear drive",
      "Compatibility notes": "Verify BCD, center bore, bolt count, offset, chain line, and guide clearance"
    }
  },
  {
    slug: "chain-guide",
    name: "Off-road Chain Guide",
    category: "Drivetrain Protection",
    short:
      "Chain control and drivetrain protection for mud, rocks, altered gearing, and rental-fleet use.",
    price: 720000,
    priceNote: "placeholder",
    stock: "Prototype queue",
    image: "assets/images/field-test.webp",
    fitment: "By bike model, swingarm mount, rear sprocket diameter, and chain size",
    material: "CNC aluminum carrier with replaceable polymer wear block program",
    treatment: "Anodized carrier, replaceable guide insert",
    options: "Standard, mud-clearance, rental reinforced",
    chainSize: "428 / 520",
    useCase: "Enduro, rental fleet, rocks, mud, altered gearing",
    compatibility:
      "Confirm swingarm mount spacing, rear sprocket diameter, wheel travel, chain line, and guide clearance before ordering.",
    badges: ["Chain Control", "Mud Clearance", "Drivetrain Protection", "B2B Program"],
    specs: {
      "Bike fitment": "By bike model, swingarm mount, rear sprocket diameter, and chain size",
      Material: "CNC aluminum carrier with replaceable polymer wear block program",
      "Heat treatment / finish": "Anodized carrier, replaceable guide insert",
      "Tooth count / size options": "Clearance planned around rear sprocket diameter",
      "Chain size": "428 / 520",
      "Use case": "Enduro, rental fleet, rocks, mud, altered gearing",
      "Compatibility notes": "Verify swingarm mount, wheel travel, sprocket diameter, chain line, and guide clearance"
    }
  },
  {
    slug: "brake-rotor",
    name: "Race Brake Rotor",
    category: "Brake Rotors",
    short:
      "Brake rotor program for mud, heat, braking bite, flatness control, and predictable replacement.",
    price: 980000,
    priceNote: "from",
    stock: "Sample stock",
    image: "assets/products/brake-rotor.png",
    fitment: "Front / rear, model-specific diameter and bolt pattern",
    material: "SUS420 rotor steel or rotor-grade stainless steel by batch",
    treatment: "Precision-cut profile, heat treatment by batch, flatness check, controlled surface finish",
    options: "Front / rear, model-specific diameter and bolt pattern",
    chainSize: "Not applicable",
    useCase: "Motocross, enduro, rental fleet, wet terrain, race braking",
    compatibility:
      "Confirm rotor diameter, bolt circle, offset, caliper clearance, pad compound, and mounting hardware before ordering.",
    badges: ["SUS420", "Heat", "Mud", "Flatness Check"],
    specs: {
      "Bike fitment": "Front / rear, model-specific diameter and bolt pattern",
      Material: "SUS420 rotor steel or rotor-grade stainless steel by batch",
      "Heat treatment / finish": "Precision-cut profile, heat treatment by batch, flatness check, controlled surface finish",
      "Tooth count / size options": "Not applicable",
      "Chain size": "Not applicable",
      "Use case": "Motocross, enduro, rental fleet, wet terrain, race braking",
      "Compatibility notes": "Verify diameter, BCD, offset, caliper clearance, pad compound, and mounting hardware"
    }
  },
  {
    slug: "titanium-hardware",
    name: "Grade 5 Titanium Race Hardware Kit",
    category: "Race Hardware",
    short:
      "Optional race-build hardware for selected weight-saving points and corrosion control.",
    price: 650000,
    priceNote: "from",
    stock: "Selected stock",
    image: "assets/images/product-bench.webp",
    fitment: "By measured thread, length, shoulder, washer, torque, and application",
    material: "Grade 5 titanium, Ti-6Al-4V",
    treatment: "Rolled thread where available, raw titanium or anodized finish by kit",
    options: "Rotor, sprocket, engine cover, body hardware, custom measured kits",
    chainSize: "Not applicable",
    useCase: "Premium race builds, corrosion control, selected weight-saving points",
    compatibility:
      "This is not required for every bike. Steel remains the right choice for many high-stress or heat-critical positions. Verify pitch, length, shoulder, washer, torque, anti-seize requirement, and heat exposure before installation.",
    badges: ["Grade 5 Ti", "Optional", "Race Build", "Counts Grams"],
    specs: {
      "Bike fitment": "By measured thread, length, shoulder, washer, torque, and application",
      Material: "Grade 5 titanium, Ti-6Al-4V",
      "Heat treatment / finish": "Rolled thread where available, raw titanium or anodized finish by kit",
      "Tooth count / size options": "Rotor, sprocket, engine cover, body hardware, custom measured kits",
      "Chain size": "Not applicable",
      "Use case": "Premium race builds, corrosion control, selected weight-saving points",
      "Compatibility notes":
        "Steel remains the right choice for many high-stress or heat-critical positions. Verify pitch, length, shoulder, washer, torque, anti-seize requirement, and heat exposure before installation."
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
