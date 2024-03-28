import { showUserNameInNavbar, headerResponsive, getAndShowMenus, logout } from "./funcs/shared.js";

window.addEventListener('load', () => {
    const globalSearchBtn = document.querySelector('#search-btn');
    const globalSearchInput = document.querySelector('#search-input');

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
});