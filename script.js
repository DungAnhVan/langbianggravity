const products = window.LANGBIANG_PRODUCTS || [];
const productGroups = window.LANGBIANG_PRODUCT_GROUPS || [];
const fitments = window.LANGBIANG_FITMENTS || [];
const PRICE_LABEL = "Price on request";
const CART_KEY = "lg-cart";
const PENDING_QUOTE_KEY = "lg-pending-quote";

const state = {
  cart: loadCart()
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

function getFitment(sku) {
  return fitments.find((fitment) => fitment.sku === sku);
}

function getFitmentProduct(fitment) {
  return fitment ? getProduct(fitment.productSlug) : null;
}

function lineFitments(line) {
  return fitments.filter((fitment) => fitment.line === line);
}

function productGroupProducts(groupSlug) {
  return products
    .filter((product) => product.group === groupSlug)
    .sort((a, b) => (a.order || 99) - (b.order || 99));
}

function productSubgroupProducts(groupSlug, subgroupName) {
  return productGroupProducts(groupSlug).filter((product) => product.subgroup === subgroupName);
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  renderCart();
}

function cartItemKey(item) {
  return item.sku ? `sku:${item.sku}` : `product:${item.slug}`;
}

function addCartEntry(entry) {
  const key = cartItemKey(entry);
  const item = state.cart.find((cartItem) => cartItemKey(cartItem) === key);
  if (item) {
    item.qty += 1;
  } else {
    state.cart.push({ ...entry, qty: 1 });
  }
  saveCart();
  openCart();
}

function addToCart(slug) {
  addCartEntry({ slug });
}

function addFitmentToCart(sku) {
  const fitment = getFitment(sku);
  if (!fitment) return;
  addCartEntry({ slug: fitment.productSlug, sku });
}

function changeQty(key, delta) {
  const item = state.cart.find((cartItem) => cartItemKey(cartItem) === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItemKey(cartItem) !== key);
  }
  saveCart();
}

function quoteSummary() {
  return state.cart
    .map((item) => {
      const fitment = item.sku ? getFitment(item.sku) : null;
      if (fitment) return `${item.qty} x ${fitment.sku} - ${fitment.product}`;
      const product = getProduct(item.slug);
      return product ? `${item.qty} x ${product.name}` : "";
    })
    .filter(Boolean)
    .join(", ");
}

function storePendingQuote(fields) {
  localStorage.setItem(PENDING_QUOTE_KEY, JSON.stringify(fields));
}

function applyQuoteFields(fields) {
  const form = qs("[data-quote-form]");
  if (!form || !fields) return false;
  Object.entries(fields).forEach(([name, value]) => {
    if (form.elements[name] && value) {
      form.elements[name].value = value;
    }
  });
  return true;
}

function applyPendingQuote() {
  const form = qs("[data-quote-form]");
  if (!form) return;
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_QUOTE_KEY));
    if (pending && applyQuoteFields(pending)) {
      localStorage.removeItem(PENDING_QUOTE_KEY);
    }
  } catch {
    localStorage.removeItem(PENDING_QUOTE_KEY);
  }
}

function renderStore() {
  const grid = qs("[data-store-grid]");
  const template = qs("#store-card-template");
  if (!grid || !template) return;

  grid.innerHTML = "";
  products.forEach((product) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const img = qs("img", card);
    img.src = product.image;
    img.alt = product.name;
    qs(".stock-badge", card).textContent = product.stock;
    qs(".product-meta", card).textContent = product.category;
    qs("h3", card).textContent = product.name;
    qs("p", card).textContent = product.short;
    const material = qs("[data-product-material]", card);
    if (material) material.textContent = `Material: ${product.material}`;
    qs(".price-row strong", card).textContent = PRICE_LABEL;
    const priceNote = qs(".price-row span", card);
    if (priceNote) priceNote.textContent = "";
    qs("[data-view-details]", card).addEventListener("click", () => openProduct(product.slug));
    qs("[data-add-cart]", card).addEventListener("click", () => addToCart(product.slug));
    const fitment = qs("[data-request-fitment]", card);
    if (fitment) fitment.addEventListener("click", () => prefillQuote(product, "Request fitment"));
    grid.append(card);
  });
}

function productCard(product, template) {
  const card = template.content.firstElementChild.cloneNode(true);
  const img = qs("img", card);
  img.src = product.image;
  img.alt = product.name;
  qs(".stock-badge", card).textContent = product.stock;
  qs(".product-meta", card).textContent = product.category;
  qs("h3", card).textContent = product.name;
  qs("p", card).textContent = product.short;
  const material = qs("[data-product-material]", card);
  if (material) material.textContent = `Material: ${product.material}`;
  qs(".price-row strong", card).textContent = PRICE_LABEL;
  const priceNote = qs(".price-row span", card);
  if (priceNote) priceNote.textContent = "";
  qs("[data-view-details]", card).addEventListener("click", () => openProduct(product.slug));
  qs("[data-add-cart]", card).addEventListener("click", () => addToCart(product.slug));
  return card;
}

function renderProductSections() {
  const root = qs("[data-product-sections]");
  const template = qs("#store-card-template");
  if (!root || !template) return;

  productGroups.forEach((group) => {
    const section = document.createElement("section");
    section.id = group.slug;
    section.className = "product-group-section shell";
    section.innerHTML = `
      <div class="product-group-head">
        <p class="eyebrow">${group.name}</p>
        <h2>${group.name}</h2>
        <p>${group.intro || group.description}</p>
      </div>
    `;

    if (group.subgroups?.length) {
      group.subgroups.forEach((subgroup) => {
        const productsForSubgroup = productSubgroupProducts(group.slug, subgroup.name);
        if (!productsForSubgroup.length) return;

        const subgroupSection = document.createElement("div");
        subgroupSection.className = "product-subgroup";
        subgroupSection.innerHTML = `
          <div class="product-subgroup-head">
            <h3>${subgroup.name}</h3>
            <p>${subgroup.description}</p>
          </div>
          <div class="store-grid"></div>
        `;

        const subgroupGrid = qs(".store-grid", subgroupSection);
        productsForSubgroup.forEach((product) => {
          subgroupGrid.append(productCard(product, template));
        });
        section.append(subgroupSection);
      });
    } else {
      const grid = document.createElement("div");
      grid.className = "store-grid";
      productGroupProducts(group.slug).forEach((product) => {
        grid.append(productCard(product, template));
      });
      section.append(grid);
    }

    root.append(section);
  });
}

function megaMenuMarkup() {
  return `
    <div class="products-mega-inner shell">
      ${productGroups
        .map(
          (group) => `
            <a class="mega-product-link" href="${group.href}">
              <span>${group.name}</span>
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function mobileProductsMarkup() {
  return productGroups
    .map(
      (group) => `
        <a class="mobile-product-link" href="${group.href}">${group.name}</a>
      `
    )
    .join("");
}

function renderProductNavigation() {
  qsa("[data-products-mega]").forEach((menu) => {
    menu.innerHTML = megaMenuMarkup();
  });
  qsa("[data-products-mobile-panel]").forEach((panel) => {
    panel.innerHTML = mobileProductsMarkup();
  });
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function fieldMatches(value, query) {
  const normalizedQuery = normalizeValue(query);
  if (!normalizedQuery) return true;
  return normalizeValue(value).includes(normalizedQuery);
}

function yearMatches(value, query) {
  const normalizedQuery = normalizeValue(query);
  if (!normalizedQuery) return true;
  if (fieldMatches(value, query)) return true;

  const queryYear = normalizedQuery.match(/\d{4}/)?.[0];
  const range = String(value || "").match(/(\d{4})\D+(\d{4})/);
  if (!queryYear || !range) return false;

  const year = Number(queryYear);
  const start = Number(range[1]);
  const end = Number(range[2]);
  return year >= Math.min(start, end) && year <= Math.max(start, end);
}

function fitmentMatches(fitment, filters) {
  return (
    fieldMatches(fitment.brand, filters.brand) &&
    fieldMatches(fitment.model, filters.model) &&
    yearMatches(fitment.year, filters.year) &&
    fieldMatches(fitment.type, filters.type)
  );
}

function fitmentCard(fitment) {
  const product = getFitmentProduct(fitment);
  const card = document.createElement("article");
  card.className = "fitment-result-card";
  card.innerHTML = `
    <div class="fitment-result-media">
      <img src="${product?.image || "/assets/images/product-bench.webp"}" alt="${fitment.product}">
    </div>
    <div class="fitment-result-body">
      <p class="product-meta">${fitment.sku}</p>
      <h3>${fitment.product}</h3>
      <dl>
        <div><dt>Brand</dt><dd>${fitment.brand}</dd></div>
        <div><dt>Model</dt><dd>${fitment.model}</dd></div>
        <div><dt>Year</dt><dd>${fitment.year}</dd></div>
        <div><dt>Type</dt><dd>${fitment.type}</dd></div>
        <div><dt>Material</dt><dd>${fitment.material}</dd></div>
        ${
          fitment.position
            ? `<div><dt>Position</dt><dd>${fitment.position}</dd></div>`
            : ""
        }
        ${
          fitment.application
            ? `<div><dt>Application</dt><dd>${fitment.application}</dd></div>`
            : ""
        }
        ${
          fitment.toothCount
            ? `<div><dt>Tooth count</dt><dd>${fitment.toothCount}</dd></div>`
            : ""
        }
        ${fitment.diameter ? `<div><dt>Diameter</dt><dd>${fitment.diameter}</dd></div>` : ""}
      </dl>
      <div class="price-row">
        <strong>${PRICE_LABEL}</strong>
      </div>
      <div class="store-actions">
        <button class="button button-compact" type="button" data-view-fitment="${fitment.sku}">View Details</button>
        <button class="button button-compact button-dark" type="button" data-add-fitment="${fitment.sku}">Add to Quote</button>
      </div>
    </div>
  `;

  qs("[data-view-fitment]", card).addEventListener("click", () => openFitment(fitment.sku));
  qs("[data-add-fitment]", card).addEventListener("click", () => addFitmentToCart(fitment.sku));
  return card;
}

function renderFitmentResults(form, resultsRoot) {
  const line = form.dataset.productLine;
  const filters = {
    brand: form.elements.brand?.value,
    model: form.elements.model?.value,
    year: form.elements.year?.value,
    type: form.elements.type?.value
  };
  const results = lineFitments(line).filter((fitment) => fitmentMatches(fitment, filters));

  resultsRoot.innerHTML = "";

  if (!results.length) {
    const empty = document.createElement("div");
    empty.className = "fitment-empty";
    empty.innerHTML = `
      <p>No exact fitment listed yet. Send bike model and year for confirmation.</p>
      <a class="button button-primary" href="/contact/#contact">Request Fitment</a>
    `;
    resultsRoot.append(empty);
    return;
  }

  results.forEach((fitment) => {
    resultsRoot.append(fitmentCard(fitment));
  });
}

function setupFitmentSearches() {
  qsa("[data-fitment-search]").forEach((form) => {
    const resultsRoot = qs("[data-fitment-results]", form.closest("[data-fitment-block]") || document);
    if (!resultsRoot) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      renderFitmentResults(form, resultsRoot);
    });

    qsa("input, select", form).forEach((field) => {
      field.addEventListener("input", () => renderFitmentResults(form, resultsRoot));
      field.addEventListener("change", () => renderFitmentResults(form, resultsRoot));
    });

    renderFitmentResults(form, resultsRoot);
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
      <p><strong>Price:</strong> ${PRICE_LABEL}</p>
      <p><strong>Material:</strong> ${product.material}</p>
      <p><strong>Finish / treatment:</strong> ${product.treatment}</p>
      <p><strong>Options:</strong> ${product.options}</p>
      <p><strong>Compatibility:</strong> ${product.compatibility}</p>
      <p class="warning-note">Warning: confirm fitment before installation.</p>
      <div class="detail-actions">
        <button class="button button-primary" type="button" data-modal-add>Add to Quote</button>
        <button class="button" type="button" data-modal-fitment>Request Fitment</button>
        <button class="button" type="button" data-modal-b2b>Dealer Inquiry</button>
      </div>
    </div>
  `;

  qs("[data-modal-add]", detail).addEventListener("click", () => addToCart(product.slug));
  qs("[data-modal-fitment]", detail).addEventListener("click", () => prefillQuote(product, "Request fitment"));
  qs("[data-modal-b2b]", detail).addEventListener("click", () => prefillQuote(product, "Dealer inquiry"));

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function openFitment(sku) {
  const fitment = getFitment(sku);
  const product = getFitmentProduct(fitment);
  const dialog = qs("[data-product-dialog]");
  const detail = qs("[data-product-detail]");
  if (!fitment || !dialog || !detail) return;

  const image = product?.image || "/assets/images/product-bench.webp";
  const chainSize =
    fitment.chainSize ||
    (product?.chainSize && product.chainSize !== "Not applicable" ? product.chainSize : "");
  const rows = [
    ["SKU", fitment.sku],
    ["Product", fitment.product],
    ["Category", product?.category],
    ["Brand", fitment.brand],
    ["Model", fitment.model],
    ["Year", fitment.year],
    ["Type", fitment.type],
    ["Material", fitment.material],
    ["Finish / treatment", product?.treatment],
    ["Chain size", chainSize],
    ["Use case", product?.useCase],
    ["Options", product?.options],
    ["Position", fitment.position],
    ["Application", fitment.application],
    ["Tooth count", fitment.toothCount],
    ["Diameter", fitment.diameter],
    ["Compatibility notes", product?.compatibility]
  ].filter(([, value]) => value);

  detail.innerHTML = `
    <div class="product-detail-media">
      <img src="${image}" alt="${fitment.product}">
    </div>
    <div class="product-detail-content">
      <p class="eyebrow">${fitment.sku}</p>
      <h2>${fitment.product}</h2>
      <p>${fitment.detail}</p>
      <div class="detail-badges">
        <span>${fitment.brand}</span>
        <span>${fitment.model}</span>
        <span>${fitment.material}</span>
      </div>
      <table class="spec-table">
        <tbody>
          ${rows.map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`).join("")}
        </tbody>
      </table>
      <p><strong>Price:</strong> ${PRICE_LABEL}</p>
      <p class="warning-note">Confirm bike model, model year, and fitment details before installation.</p>
      <div class="detail-actions">
        <button class="button button-primary" type="button" data-modal-add-fitment>Add to Quote</button>
        <button class="button" type="button" data-modal-fitment>Request Fitment</button>
        <button class="button" type="button" data-modal-b2b>Dealer Inquiry</button>
      </div>
    </div>
  `;

  qs("[data-modal-add-fitment]", detail).addEventListener("click", () => addFitmentToCart(fitment.sku));
  qs("[data-modal-fitment]", detail).addEventListener("click", () => prefillFitmentQuote(fitment, "Request fitment"));
  qs("[data-modal-b2b]", detail).addEventListener("click", () => prefillFitmentQuote(fitment, "Dealer inquiry"));

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
  const fields = {
    productNeeded: product.name,
    customRequest: requestType,
    quantity: "10"
  };
  closeProduct();

  if (applyQuoteFields(fields)) {
    qs("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  storePendingQuote(fields);
  window.location.href = "/contact/#contact";
}

function prefillFitmentQuote(fitment, requestType) {
  const fields = {
    productNeeded: `${fitment.sku} - ${fitment.product}`,
    bikeModel: `${fitment.brand} ${fitment.model}`,
    modelYear: fitment.year,
    customRequest: requestType,
    quantity: "10"
  };
  closeProduct();

  if (applyQuoteFields(fields)) {
    qs("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  storePendingQuote(fields);
  window.location.href = "/contact/#contact";
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);

  qsa("[data-cart-count]").forEach((badge) => {
    badge.textContent = count;
  });

  const total = qs("[data-cart-total]");
  if (total) total.textContent = PRICE_LABEL;

  const list = qs("[data-cart-items]");
  if (!list) return;
  list.innerHTML = "";

  if (!state.cart.length) {
    const empty = document.createElement("p");
    empty.textContent = "No products selected yet.";
    list.append(empty);
    return;
  }

  state.cart.forEach((item) => {
    const fitment = item.sku ? getFitment(item.sku) : null;
    const product = fitment ? getFitmentProduct(fitment) : getProduct(item.slug);
    if (!product && !fitment) return;

    const key = cartItemKey(item);
    const title = fitment ? fitment.product : product.name;
    const meta = fitment ? fitment.sku : PRICE_LABEL;
    const image = product?.image || "/assets/images/product-bench.webp";

    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${image}" alt="${title}">
      <div>
        <h3>${title}</h3>
        <span>${meta}</span>
        <span>${PRICE_LABEL}</span>
      </div>
      <div class="qty-controls" aria-label="Quantity controls for ${title}">
        <button type="button" aria-label="Decrease quantity" data-qty-minus>-</button>
        <strong>${item.qty}</strong>
        <button type="button" aria-label="Increase quantity" data-qty-plus>+</button>
      </div>
    `;
    qs("[data-qty-minus]", row).addEventListener("click", () => changeQty(key, -1));
    qs("[data-qty-plus]", row).addEventListener("click", () => changeQty(key, 1));
    list.append(row);
  });
}

function openCart() {
  const drawer = qs("[data-cart-drawer]");
  if (!drawer) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
}

function closeCart() {
  const drawer = qs("[data-cart-drawer]");
  if (!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
}

function setupNavigation() {
  const header = qs("[data-header]");
  const nav = qs("[data-nav]");
  const toggle = qs("[data-nav-toggle]");
  if (!header || !nav || !toggle) return;
  const productToggle = qs("[data-products-menu-toggle]");
  const megaMenu = qs("[data-products-mega]");
  const mobilePanel = qs("[data-products-mobile-panel]");
  const mobileQuery = window.matchMedia("(max-width: 1080px)");

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeProductsMenu = () => {
    productToggle?.setAttribute("aria-expanded", "false");
    megaMenu?.classList.remove("is-open");
    megaMenu?.setAttribute("aria-hidden", "true");
    mobilePanel?.classList.remove("is-open");
    document.body.classList.remove("products-menu-open");
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
    if (!isOpen) closeProductsMenu();
  });

  productToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = productToggle.getAttribute("aria-expanded") === "true";

    if (mobileQuery.matches) {
      const nextState = !isOpen;
      productToggle.setAttribute("aria-expanded", String(nextState));
      mobilePanel?.classList.toggle("is-open", nextState);
      megaMenu?.classList.remove("is-open");
      megaMenu?.setAttribute("aria-hidden", "true");
      document.body.classList.remove("products-menu-open");
      return;
    }

    const nextState = !megaMenu?.classList.contains("is-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    productToggle.setAttribute("aria-expanded", String(nextState));
    megaMenu?.classList.toggle("is-open", nextState);
    megaMenu?.setAttribute("aria-hidden", String(!nextState));
    document.body.classList.toggle("products-menu-open", nextState);
  });

  qsa(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      closeProductsMenu();
    });
  });

  qsa("[data-products-mega] a, [data-products-mobile-panel] a").forEach((link) => {
    link.addEventListener("click", closeProductsMenu);
  });

  document.addEventListener("click", (event) => {
    if (!megaMenu?.classList.contains("is-open")) return;
    if (header.contains(event.target) || megaMenu.contains(event.target)) return;
    closeProductsMenu();
  });

  window.addEventListener("resize", closeProductsMenu);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProductsMenu();
  });
}

function setupForms() {
  const form = qs("[data-quote-form]");
  const status = qs("[data-form-status]");
  if (!form) return;

  applyPendingQuote();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      "Langbiang Gravity fitment and quote request",
      "",
      `Name: ${data.get("name") || ""}`,
      `Phone / WhatsApp / Zalo: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Business type: ${data.get("businessType") || ""}`,
      `Bike model: ${data.get("bikeModel") || ""}`,
      `Model year: ${data.get("modelYear") || ""}`,
      `Product needed: ${data.get("productNeeded") || ""}`,
      `Front / rear need: ${data.get("frontRearNeed") || ""}`,
      `Chain size: ${data.get("chainSize") || ""}`,
      `Tooth count: ${data.get("toothCount") || ""}`,
      `Quantity: ${data.get("quantity") || ""}`,
      `Use case: ${data.get("useCase") || ""}`,
      `Custom request: ${data.get("customRequest") || ""}`,
      "",
      `Message: ${data.get("message") || ""}`
    ];
    const subject = encodeURIComponent("Langbiang Gravity fitment and quote request");
    const body = encodeURIComponent(lines.join("\n"));
    if (status) status.textContent = "Email draft opened. Attach drawing or sample photo before sending if needed.";
    window.location.href = `mailto:sales@langbianggravity.com?subject=${subject}&body=${body}`;
  });
}

function setupCartQuote() {
  const link = qs("[data-cart-quote]");
  if (!link) return;

  link.addEventListener("click", (event) => {
    const summary = quoteSummary();
    const fields = {
      productNeeded: summary,
      customRequest: "Product quote request"
    };
    closeCart();

    if (applyQuoteFields(fields)) {
      event.preventDefault();
      qs("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    storePendingQuote(fields);
  });
}

function init() {
  renderProductNavigation();
  renderStore();
  renderProductSections();
  renderCart();
  setupNavigation();
  setupForms();
  setupFitmentSearches();
  setupCartQuote();

  qsa("[data-open-product]").forEach((button) => {
    button.addEventListener("click", () => openProduct(button.dataset.openProduct));
  });

  qsa("[data-open-fitment]").forEach((button) => {
    button.addEventListener("click", () => openFitment(button.dataset.openFitment));
  });

  qs("[data-dialog-close]")?.addEventListener("click", closeProduct);
  qs("[data-product-dialog]")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeProduct();
  });

  qsa("[data-cart-open]").forEach((button) => {
    button.addEventListener("click", openCart);
  });
  qs("[data-cart-close]")?.addEventListener("click", closeCart);
  qs("[data-cart-drawer]")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeCart();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });
}

document.addEventListener("DOMContentLoaded", init);
