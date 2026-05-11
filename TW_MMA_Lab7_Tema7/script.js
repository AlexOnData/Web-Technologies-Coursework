// LAB 7 — Product Card Configurator
// Live preview + responsive grid + Export HTML + Edit/Move/Delete card actions.

const form = document.getElementById("productForm");
const previewArea = document.getElementById("previewArea");
const grid = document.getElementById("grid");
const btnPreview = document.getElementById("btnPreview");
const btnClear = document.getElementById("btnClear");
const btnExport = document.getElementById("btnExport");
const validationMsg = document.getElementById("validationMsg");

const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const ratingInput = document.getElementById("rating");
const badgeInput = document.getElementById("badge");
const imageUrlInput = document.getElementById("imageUrl");
const accentInput = document.getElementById("accent");
const radiusInput = document.getElementById("radius");
const shadowInput = document.getElementById("shadow");

let editingCard = null;

function getValues() {
    return {
        title: titleInput.value.trim(),
        price: parseFloat(priceInput.value),
        rating: parseFloat(ratingInput.value),
        badge: badgeInput.value,
        imageUrl: imageUrlInput.value.trim(),
        accent: accentInput.value,
        radius: parseInt(radiusInput.value, 10),
        shadow: shadowInput.value
    };
}

function setValues(p) {
    titleInput.value = p.title;
    priceInput.value = p.price;
    ratingInput.value = p.rating;
    badgeInput.value = p.badge || "";
    imageUrlInput.value = p.imageUrl || "";
    accentInput.value = p.accent;
    radiusInput.value = p.radius;
    shadowInput.value = p.shadow;
}

function shadowClass(level) {
    if (level === "sm") return "shadow-sm";
    if (level === "lg") return "shadow-lg";
    if (level === "default") return "shadow";
    return "";
}

function buildCardHTML(p, includeActions = true) {
    const sCls = shadowClass(p.shadow);
    const badge = p.badge
        ? `<span class="product-accent">${p.badge}</span>`
        : "";
    const stars = "★".repeat(Math.round(p.rating || 0))
        + "☆".repeat(Math.max(0, 5 - Math.round(p.rating || 0)));
    const img = p.imageUrl
        ? `<img src="${p.imageUrl}" class="product-img" alt="${p.title}">`
        : `<div class="product-img bg-secondary bg-opacity-25 text-center text-muted d-flex align-items-center justify-content-center">No image</div>`;
    const priceStr = isFinite(p.price) ? p.price.toFixed(2) : "0.00";

    const actions = includeActions ? `
        <div class="card-actions">
            <button class="btn btn-sm btn-outline-primary btn-edit" type="button">Edit</button>
            <button class="btn btn-sm btn-outline-secondary btn-up" type="button">▲</button>
            <button class="btn btn-sm btn-outline-secondary btn-down" type="button">▼</button>
            <button class="btn btn-sm btn-outline-danger btn-del" type="button">Delete</button>
        </div>` : "";

    return `
        <div class="product-card card ${sCls}" style="--accent:${p.accent};--radius:${p.radius}px;">
            ${img}
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title mb-1">${p.title || "Product title"}</h5>
                    ${badge}
                </div>
                <div class="mb-2">
                    <strong>${priceStr} USD</strong>
                    <span class="text-warning ms-2">${stars}</span>
                </div>
                <a class="btn btn-primary btn-sm" href="#" style="background:${p.accent};border-color:${p.accent};">Buy now</a>
                ${actions}
            </div>
        </div>`;
}

function renderPreview() {
    const p = getValues();
    previewArea.innerHTML = buildCardHTML(p, false);
}

function isValid(p) {
    if (!p.title || p.title.length < 2) return "Title is required (min 2 chars).";
    if (!isFinite(p.price) || p.price < 0) return "Price must be ≥ 0.";
    if (!isFinite(p.rating) || p.rating < 1 || p.rating > 5) return "Rating must be between 1 and 5.";
    return null;
}

function attachCardHandlers(col, p) {
    col.querySelector(".btn-edit").addEventListener("click", () => {
        setValues(p);
        editingCard = col;
        col.classList.add("border", "border-primary");
        renderPreview();
    });

    col.querySelector(".btn-del").addEventListener("click", () => {
        if (editingCard === col) editingCard = null;
        col.remove();
    });

    col.querySelector(".btn-up").addEventListener("click", () => {
        const prev = col.previousElementSibling;
        if (prev) grid.insertBefore(col, prev);
    });

    col.querySelector(".btn-down").addEventListener("click", () => {
        const next = col.nextElementSibling;
        if (next) grid.insertBefore(next, col);
    });
}

function appendCardToGrid(p) {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML = buildCardHTML(p, true);
    col.dataset.product = JSON.stringify(p);
    attachCardHandlers(col, p);
    grid.appendChild(col);
}

function updateEditingCard(p) {
    editingCard.innerHTML = buildCardHTML(p, true);
    editingCard.dataset.product = JSON.stringify(p);
    editingCard.classList.remove("border", "border-primary");
    attachCardHandlers(editingCard, p);
    editingCard = null;
}

btnPreview.addEventListener("click", renderPreview);

// Re-render preview while user types
[titleInput, priceInput, ratingInput, badgeInput, imageUrlInput,
 accentInput, radiusInput, shadowInput].forEach((el) => {
    el.addEventListener("input", renderPreview);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const p = getValues();
    const error = isValid(p);

    if (error) {
        form.classList.add("was-validated");
        validationMsg.innerHTML = `<div class="alert alert-danger mt-3">${error}</div>`;
        return;
    }

    validationMsg.innerHTML = "";
    form.classList.remove("was-validated");

    if (editingCard) {
        updateEditingCard(p);
    } else {
        appendCardToGrid(p);
    }

    form.reset();
    accentInput.value = "#0d6efd";
    radiusInput.value = "12";
    shadowInput.value = "default";
    renderPreview();
});

btnClear.addEventListener("click", () => {
    grid.innerHTML = "";
    editingCard = null;
});

btnExport.addEventListener("click", () => {
    const cards = Array.from(grid.querySelectorAll("[data-product]"));
    const items = cards.map((col) => {
        const p = JSON.parse(col.dataset.product);
        return buildCardHTML(p, false);
    }).map((h) => `<div class="col-12 col-sm-6 col-lg-4">${h}</div>`).join("\n");

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Exported Product Grid</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
.product-card{border-radius:var(--radius,12px);overflow:hidden;}
.product-card .card-body{border-top:3px solid var(--accent,#0d6efd);}
.product-accent{background:var(--accent,#0d6efd);color:#fff;padding:.25rem .6rem;border-radius:999px;font-size:.75rem;font-weight:600;}
.product-img{aspect-ratio:1.6/1;object-fit:cover;width:100%;display:block;border-top-left-radius:var(--radius,12px);border-top-right-radius:var(--radius,12px);}
</style>
</head>
<body class="bg-light">
<main class="container py-4">
<h1 class="h3 mb-4">Product Grid</h1>
<div class="row g-3">
${items}
</div>
</main>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-grid.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Initial state
priceInput.value = "0";
ratingInput.value = "5";
titleInput.value = "Sample product";
renderPreview();
