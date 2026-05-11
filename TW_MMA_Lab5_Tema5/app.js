// LAB 5 — Bootstrap + JavaScript
// Implementation of the TODOs:
// 1. Validate the form (title >= 3 chars, desc >= 10)
// 2. On submit, create a Bootstrap card and append to #cardGrid
// 3. Show a Bootstrap toast after adding
// 4. Search by title
// 5. Toggle 'data-bs-theme' on <html> when clicking #toggleThemeBtn

const form = document.getElementById("cardForm");
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const grid = document.getElementById("cardGrid");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const toastEl = document.getElementById("liveToast");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let cardCounter = 1;

function createCard(title, description) {
    cardCounter += 1;
    const collapseId = "card-collapse-" + cardCounter;

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 card-wrapper";
    col.dataset.title = title.toLowerCase();

    col.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
                <button class="btn btn-sm btn-outline-secondary"
                        data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}">Details</button>
                <div id="${collapseId}" class="collapse mt-2">
                    <small class="text-muted">Added at ${new Date().toLocaleTimeString()}</small>
                </div>
            </div>
        </div>`;

    col.querySelector(".card-title").textContent = title;
    col.querySelector(".card-text").textContent = description;

    return col;
}

// --- 1 + 2 + 3: Validate, append, toast ---
form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    grid.appendChild(createCard(title, desc));

    form.reset();
    form.classList.remove("was-validated");

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
    toast.show();
});

// --- 4: Search by title (filters cards in the grid) ---
function filterCards() {
    const term = searchInput.value.trim().toLowerCase();
    const cards = grid.querySelectorAll(".card-wrapper, .col-12");

    cards.forEach((card) => {
        if (!term) {
            card.classList.remove("d-none");
            return;
        }
        const titleEl = card.querySelector(".card-title");
        const titleText = titleEl ? titleEl.textContent.toLowerCase() : "";
        if (titleText.includes(term)) {
            card.classList.remove("d-none");
        } else {
            card.classList.add("d-none");
        }
    });
}

searchBtn.addEventListener("click", filterCards);

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        filterCards();
    }
});

// --- 5: Theme toggle on <html> ---
toggleThemeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-bs-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", next);
    toggleThemeBtn.textContent = next === "dark" ? "Light theme" : "Toggle theme";
});
