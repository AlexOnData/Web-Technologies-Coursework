// LAB 6 — Bootstrap + JavaScript
// Color palette generator with apply-to-preview behaviour and copy-to-clipboard bonus.

// Returns a random valid HEX color like "#A1B2C3".
function randomColor() {
    const value = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + value.toString(16).padStart(6, "0").toUpperCase();
}

// Convert "#RRGGBB" -> "rgba(R, G, B, alpha)"
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const swatches = document.getElementById("swatches");
const btnRandom = document.getElementById("btnRandom");
const btnApply = document.getElementById("btnApply");

// Build the initial palette with 5 random colors
let palette = Array.from({ length: 5 }, randomColor);

function renderPalette() {
    swatches.innerHTML = "";
    palette.forEach((hex) => {
        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.backgroundColor = hex;
        swatch.dataset.hex = hex;
        swatch.title = `${hex} — click to copy`;
        swatch.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(hex);
                swatch.classList.add("copied");
                setTimeout(() => swatch.classList.remove("copied"), 1200);
            } catch (err) {
                // Fallback for non-secure contexts
                const ta = document.createElement("textarea");
                ta.value = hex;
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand("copy"); } catch {}
                document.body.removeChild(ta);
                swatch.classList.add("copied");
                setTimeout(() => swatch.classList.remove("copied"), 1200);
            }
        });
        swatches.appendChild(swatch);
    });
}

function applyPalette() {
    const [c1, c2, c3, c4, c5] = palette;

    // c1 → .card-header (background) + white text
    document.querySelectorAll(".card-header").forEach((header) => {
        header.style.backgroundColor = c1;
        header.style.color = "#ffffff";
    });

    // c2 → .btn-primary background + border + black text
    document.querySelectorAll(".btn-primary").forEach((btn) => {
        btn.style.backgroundColor = c2;
        btn.style.borderColor = c2;
        btn.style.color = "#000000";
    });

    // c3 → .btn-outline-secondary border + text
    document.querySelectorAll(".btn-outline-secondary").forEach((btn) => {
        btn.style.borderColor = c3;
        btn.style.color = c3;
    });

    // c4 & c5 → subtle body background gradient with low alpha
    document.body.style.backgroundImage =
        `linear-gradient(180deg, ${hexToRgba(c4, 0.18)}, ${hexToRgba(c5, 0.18)})`;
}

btnRandom.addEventListener("click", () => {
    palette = Array.from({ length: 5 }, randomColor);
    renderPalette();
});

btnApply.addEventListener("click", applyPalette);

// Initial render so the user sees swatches without clicking Randomize first.
renderPalette();
