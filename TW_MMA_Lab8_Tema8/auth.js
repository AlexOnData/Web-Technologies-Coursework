// LAB 8 — Login / Logout with localStorage
// Demo only — see PDF section 10. Never use this approach in production.

const users = [
    { username: "ana", password: "1234" },
    { username: "mihai", password: "abcd" },
];

function login(username, password) {
    const user = users.find((u) => u.username === username);
    if (!user || user.password !== password) {
        return false;
    }
    const userSafe = { username: user.username };
    localStorage.setItem("currentUser", JSON.stringify(userSafe));
    return true;
}

function logout() {
    localStorage.removeItem("currentUser");
}

function getCurrentUser() {
    const raw = localStorage.getItem("currentUser");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function updateNavbar() {
    const currentUser = getCurrentUser();
    const loginNav = document.getElementById("loginNav");
    const profileNav = document.getElementById("profileNav");
    const logoutNavItem = document.getElementById("logoutNavItem");

    if (!loginNav || !logoutNavItem) return;

    if (currentUser) {
        loginNav.classList.add("d-none");
        if (profileNav) profileNav.classList.remove("d-none");
        logoutNavItem.classList.remove("d-none");
    } else {
        loginNav.classList.remove("d-none");
        if (profileNav) profileNav.classList.add("d-none");
        logoutNavItem.classList.add("d-none");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();

    const form = document.getElementById("loginForm");
    const errorDiv = document.getElementById("loginError");
    const logoutBtn = document.getElementById("logoutBtn");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (login(username, password)) {
                window.location.href = "profile.html";
            } else {
                errorDiv.textContent = "Invalid username or password.";
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout();
            window.location.href = "index.html";
        });
    }
});
