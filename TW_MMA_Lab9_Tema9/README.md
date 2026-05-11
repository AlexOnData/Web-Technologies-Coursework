# Lab 9 - Firebase Firestore Notes

## Setup

1. Go to [Firebase Console](https://console.firebase.google.com) and create a new project (e.g. `web-notes-lab`).
2. Add a **Web app** to the project and copy the `firebaseConfig` snippet.
3. Open `app.js` and replace the placeholder values in `firebaseConfig` with your own.
4. In the Firebase console, go to **Build → Firestore Database** and click **Create database**. Choose **Start in test mode** for the lab.

## Run

The page must be served over HTTP because the Firebase modular SDK is loaded as ES modules. Opening `index.html` directly via `file://` will fail with a CORS error.

- VS Code: install the **Live Server** extension, right-click `index.html` and choose *Open with Live Server*.
- Or any static server: `npx serve` / `python -m http.server`.

## Behavior

- Submitting the form writes a new document to the `notes` collection with `title`, `content`, and `createdAt` (server timestamp).
- The notes list is updated in real time via `onSnapshot`, so adding a note from the Firebase console UI also appears on the page automatically.
- The **Delete** button on each note removes the corresponding Firestore document.
