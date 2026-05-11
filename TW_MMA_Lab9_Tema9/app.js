// LAB 9 — Firebase Firestore Notes
// Run this with VS Code "Live Server" (or any static HTTP server) so that
// the modular Firebase SDK over `https://...` works correctly.
//
// IMPORTANT: replace the values below in firebaseConfig with the ones
// you copied from your Firebase console (Project settings → Your apps → Web).

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- 1. Firebase configuration -------------------------------------------
// Replace the values below with the ones from your own Firebase project.
const firebaseConfig = {
    apiKey: "TODO",
    authDomain: "TODO",
    projectId: "TODO",
    storageBucket: "TODO",
    messagingSenderId: "TODO",
    appId: "TODO"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 2. DOM elements ------------------------------------------------------
const form = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notesList");
const formStatus = document.getElementById("formStatus");

function showStatus(message, isError = false) {
    formStatus.textContent = message;
    formStatus.classList.toggle("error", isError);
    if (message) {
        setTimeout(() => {
            if (formStatus.textContent === message) {
                formStatus.textContent = "";
                formStatus.classList.remove("error");
            }
        }, 3000);
    }
}

// --- 3. Save a new note on submit ----------------------------------------
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title && !content) return;

    try {
        await addDoc(collection(db, "notes"), {
            title,
            content,
            createdAt: serverTimestamp(),
        });
        form.reset();
        showStatus("Note saved.");
    } catch (err) {
        console.error("Failed to add note:", err);
        showStatus("Could not save note: " + err.message, true);
    }
});

// --- 4. Render a single Firestore document as a DOM node ------------------
function renderNote(docSnapshot) {
    const data = docSnapshot.data();
    const article = document.createElement("article");
    article.className = "note";

    const header = document.createElement("div");
    header.className = "note-header";

    const titleSpan = document.createElement("span");
    titleSpan.className = "note-title";
    titleSpan.textContent = data.title || "(no title)";

    const metaSpan = document.createElement("span");
    metaSpan.className = "note-meta";
    if (data.createdAt && typeof data.createdAt.toDate === "function") {
        metaSpan.textContent = data.createdAt.toDate().toLocaleString();
    } else {
        metaSpan.textContent = "just now";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "note-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
        if (!confirm(`Delete note "${data.title || ""}"?`)) return;
        try {
            await deleteDoc(doc(db, "notes", docSnapshot.id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Could not delete: " + err.message);
        }
    });

    header.appendChild(titleSpan);
    header.appendChild(metaSpan);
    header.appendChild(deleteBtn);

    const contentP = document.createElement("p");
    contentP.className = "note-content";
    contentP.textContent = data.content || "";

    article.appendChild(header);
    article.appendChild(contentP);
    return article;
}

// --- 5. Real-time listener -----------------------------------------------
const notesQuery = query(
    collection(db, "notes"),
    orderBy("createdAt", "desc")
);

onSnapshot(
    notesQuery,
    (snapshot) => {
        notesList.innerHTML = "";
        if (snapshot.empty) {
            const empty = document.createElement("p");
            empty.id = "notesEmpty";
            empty.className = "notes-empty";
            empty.textContent = "No notes yet — add your first note above.";
            notesList.appendChild(empty);
            return;
        }
        snapshot.forEach((docSnapshot) => {
            notesList.appendChild(renderNote(docSnapshot));
        });
    },
    (err) => {
        console.error("onSnapshot error:", err);
        notesList.innerHTML =
            `<p class="form-status error">Failed to load notes: ${err.message}</p>`;
    }
);
