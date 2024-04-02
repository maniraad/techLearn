import { showUserNameInNavbar, go404Page, headerResponsive, getAndShowMenus, logout } from "./funcs/shared.js";
import { getMe } from "./funcs/auth.js";

window.addEventListener('load', () => {
    const globalSearchBtn = document.querySelector('#search-btn');
    const globalSearchInput = document.querySelector('#search-input');

    getMe().then(() => {
        const logoutBtn = document.querySelector('.logout');
        logoutBtn.addEventListener("click", () => {
            logout();
        });

        globalSearchBtn.addEventListener("click", (event) => {
            event.preventDefault();
            location.href = `search.html?value=${globalSearchInput.value.trim()}`;
        });

        showUserNameInNavbar();
        headerResponsive();
        getAndShowMenus();
        go404Page();
    })

    getMe().catch(() => location.replace("login.html"));
});