# Web Technologies — Coursework

Solutions for the **Web Technologies** course (`Tehnologii Web` / `IAGIII_WT`) — Faculty of Mathematics and Informatics, Transilvania University of Brașov.

**Author:** AlexOnData
**Year:** 2025/2026

---

## What's inside

Thirteen self-contained mini-projects: **10 lab assignments** + **3 course homeworks**. Each folder is a deliverable that can be opened and run independently.

| # | Folder | Topic | Stack |
|---|--------|-------|-------|
| 1 | [TW_MMA_Lab1_Tema1](TW_MMA_Lab1_Tema1/) | CV (Curriculum Vitae) | HTML5, CSS3 |
| 2 | [TW_MMA_Lab2_Tema2](TW_MMA_Lab2_Tema2/) | Student Survey micro-site (anchors, styled links, static form) | HTML5, CSS3 |
| 3 | [TW_MMA_Lab3_Tema3](TW_MMA_Lab3_Tema3/) | Advanced anchors + HTML5 form validation (`:valid` / `:invalid`) | HTML5, CSS3 |
| 4 | [TW_MMA_Lab4_Tema4](TW_MMA_Lab4_Tema4/) | Weather Message Generator (DOM, conditionals) | JavaScript |
| 5 | [TW_MMA_Lab5_Tema5](TW_MMA_Lab5_Tema5/) | Bootstrap card creator (validation, toasts, theme toggle) | Bootstrap 5, JS |
| 6 | [TW_MMA_Lab6_Tema6](TW_MMA_Lab6_Tema6/) | Color Palette Generator (HEX, clipboard) | Bootstrap 5, JS |
| 7 | [TW_MMA_Lab7_Tema7](TW_MMA_Lab7_Tema7/) | Product Card Configurator (live preview, export HTML) | Bootstrap 5, JS |
| 8 | [TW_MMA_Lab8_Tema8](TW_MMA_Lab8_Tema8/) | Login / Logout with `localStorage` (protected pages) | Bootstrap 5, JS |
| 9 | [TW_MMA_Lab9_Tema9](TW_MMA_Lab9_Tema9/) | Firebase Firestore Notes (real-time CRUD) | Firebase v11, ES Modules |
| 10 | [TW_MMA_Lab10_Tema10](TW_MMA_Lab10_Tema10/) | Christmas Show Explorer (TVMaze API) | Vanilla JS, fetch |
| 11 | [TW_MMA_Curs1_Tema1](TW_MMA_Curs1_Tema1/) | CV (alternate two-column layout) | HTML5, CSS3 |
| 12 | [TW_MMA_Curs2_Tema2](TW_MMA_Curs2_Tema2/) | Triangle analyzer (Pythagoras, Heron's formula) | JavaScript |
| 13 | [TW_MMA_Curs3_Tema3](TW_MMA_Curs3_Tema3/) | Table generator from a form | JavaScript |

---

## Running locally

Most folders are plain static sites — open `index.html` directly in a browser and you're done.

**Two exceptions** that need an HTTP origin (because of ES modules / CORS):

- **Lab 9** uses the Firebase modular SDK loaded from `https://www.gstatic.com/...`.
- **Lab 10** fetches data from the TVMaze REST API.

For these two, use **VS Code's Live Server extension** (right-click `index.html` → *Open with Live Server*), or any static HTTP server:

```bash
# Node
npx serve .

# Python
python -m http.server
```

### Lab 9 — extra setup

Lab 9 needs a Firebase project. Steps:

1. Create a project at <https://console.firebase.google.com>.
2. Add a Web app, copy the `firebaseConfig` snippet.
3. Open [TW_MMA_Lab9_Tema9/app.js](TW_MMA_Lab9_Tema9/app.js) and replace the `TODO` placeholders with your own values.
4. In the Firebase console, go to **Build → Firestore Database → Create database → Start in test mode**.
5. Run the page via Live Server.

See [TW_MMA_Lab9_Tema9/README.md](TW_MMA_Lab9_Tema9/README.md) for a more detailed walkthrough.

---

## Tech stack across the course

- **HTML5** — semantic elements, forms with browser validation, `<input type="date">`, `<progress>`.
- **CSS3** — Flexbox / Grid, custom properties, transitions, responsive media queries.
- **Bootstrap 5.3** — grid system, components (navbar, dropdown, modal, toast, carousel, alerts), utility classes.
- **Vanilla JavaScript** — DOM APIs, `fetch`, ES modules, `localStorage`, custom event handlers.
- **Firebase Firestore** — modular SDK v11, `addDoc`, `onSnapshot`, `deleteDoc`, `serverTimestamp`.
- **TVMaze REST API** — public API consumption with `fetch` (Lab 10).

---

## Folder conventions

- Each lab is self-contained: every folder has its own `index.html`, `style.css`, and JS file(s).
- Iconography uses **Bootstrap Icons** (loaded via CDN where needed).
- Images are generated **SVG placeholders** (lightweight, work offline, no external dependencies).
- Form starters often contain `// TODO:` markers in the starter materials; the solutions here replace those with working code.

---

## License

Educational project, not licensed for commercial use. Course materials (PDFs, assignment screenshots) belong to the **Faculty of Mathematics and Informatics, Transilvania University of Brașov**.
