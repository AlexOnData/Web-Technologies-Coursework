// LAB 10 — Christmas Show Explorer (TVMaze API)

const API_BASE_URL = "https://api.tvmaze.com";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const festiveButton = document.getElementById("festive-button");
const resultsContainer = document.getElementById("results");
const detailsContainer = document.getElementById("details");
const detailsSection = document.getElementById("details-section");
const closeDetailsBtn = document.getElementById("close-details");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const resultsHeading = document.getElementById("results-heading");

function showLoading() {
    loadingEl.classList.remove("hidden");
}

function hideLoading() {
    loadingEl.classList.add("hidden");
}

function showError(message) {
    errorEl.textContent = message || "";
}

function clearResults() {
    resultsContainer.innerHTML = "";
}

function clearDetails() {
    detailsContainer.innerHTML = "";
    detailsSection.classList.add("hidden");
}

// Strip simple HTML tags for safe rendering of TVMaze summaries.
function stripHtml(html) {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// --- Fetch shows by search term ------------------------------------------
async function fetchShowsBySearch(term) {
    showLoading();
    showError("");
    clearResults();
    clearDetails();
    resultsHeading.textContent = `Results for "${term}"`;

    try {
        const url = `${API_BASE_URL}/search/shows?q=${encodeURIComponent(term)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        renderShowList(data);
    } catch (err) {
        console.error(err);
        showError("🎅 The elves are having trouble contacting the TV show database. Please try again.");
    } finally {
        hideLoading();
    }
}

// --- Render the search results ------------------------------------------
function renderShowList(results) {
    clearResults();

    if (!Array.isArray(results) || results.length === 0) {
        const empty = document.createElement("div");
        empty.className = "no-results";
        empty.textContent = "❄️ No Christmas magic found for that search.";
        resultsContainer.appendChild(empty);
        return;
    }

    results.forEach(({ show }) => {
        if (!show) return;

        const card = document.createElement("article");
        card.className = "show-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View details for ${show.name}`);

        const imgSrc = show.image && (show.image.medium || show.image.original);
        if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = show.name + " poster";
            card.appendChild(img);
        } else {
            const placeholder = document.createElement("div");
            placeholder.className = "placeholder";
            placeholder.textContent = "🎄";
            card.appendChild(placeholder);
        }

        const title = document.createElement("h3");
        title.textContent = show.name;
        card.appendChild(title);

        const premiered = document.createElement("p");
        premiered.textContent = show.premiered
            ? `Premiered: ${show.premiered}`
            : "Premiere date unknown";
        card.appendChild(premiered);

        const open = () => fetchShowDetails(show.id);
        card.addEventListener("click", open);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
            }
        });

        resultsContainer.appendChild(card);
    });
}

// --- Fetch full details for a single show -------------------------------
async function fetchShowDetails(id) {
    showLoading();
    showError("");

    try {
        const response = await fetch(`${API_BASE_URL}/shows/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const show = await response.json();
        renderShowDetails(show);
    } catch (err) {
        console.error(err);
        showError("🎅 Could not load show details. Please try again.");
    } finally {
        hideLoading();
    }
}

// --- Render the selected show's details ----------------------------------
function renderShowDetails(show) {
    detailsContainer.innerHTML = "";

    const imgWrap = document.createElement("div");
    if (show.image && (show.image.original || show.image.medium)) {
        const img = document.createElement("img");
        img.src = show.image.original || show.image.medium;
        img.alt = show.name + " poster";
        imgWrap.appendChild(img);
    }

    const info = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = show.name;
    info.appendChild(title);

    const premiered = document.createElement("p");
    premiered.className = "meta";
    premiered.innerHTML = `<strong>Premiered:</strong> ${show.premiered || "—"}`;
    info.appendChild(premiered);

    if (show.rating && typeof show.rating.average === "number") {
        const rating = document.createElement("p");
        rating.className = "meta";
        rating.innerHTML = `<strong>Rating:</strong> ⭐ ${show.rating.average} / 10`;
        info.appendChild(rating);
    }

    if (Array.isArray(show.genres) && show.genres.length > 0) {
        const genres = document.createElement("p");
        genres.className = "meta";
        genres.innerHTML = `<strong>Genres:</strong> `;
        const wrap = document.createElement("span");
        wrap.className = "genres";
        show.genres.forEach((g) => {
            const tag = document.createElement("span");
            tag.className = "genre-tag";
            tag.textContent = g;
            wrap.appendChild(tag);
        });
        genres.appendChild(wrap);
        info.appendChild(genres);
    }

    if (show.officialSite) {
        const site = document.createElement("p");
        site.className = "meta";
        site.innerHTML = `<strong>Official site:</strong> <a href="${show.officialSite}" target="_blank" rel="noopener">${show.officialSite}</a>`;
        info.appendChild(site);
    }

    const summary = document.createElement("div");
    summary.className = "summary";
    summary.textContent = stripHtml(show.summary) || "No summary available.";
    info.appendChild(summary);

    detailsContainer.appendChild(imgWrap);
    detailsContainer.appendChild(info);

    detailsSection.classList.remove("hidden");
    detailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --- Wire up events ------------------------------------------------------
function attachEventListeners() {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const term = searchInput.value.trim();
        if (!term) {
            showError("Please enter a search term.");
            return;
        }
        showError("");
        fetchShowsBySearch(term);
    });

    festiveButton.addEventListener("click", () => {
        const term = "christmas";
        searchInput.value = term;
        showError("");
        fetchShowsBySearch(term);
    });

    closeDetailsBtn.addEventListener("click", clearDetails);
}

function initialLoad() {
    const defaultTerm = "christmas";
    searchInput.value = defaultTerm;
    fetchShowsBySearch(defaultTerm);
}

document.addEventListener("DOMContentLoaded", () => {
    attachEventListeners();
    initialLoad();
});
