import { showUserNameInNavbar, go404Page, headerResponsive, getAndShowMenus, logout } from "./funcs/shared.js";

window.addEventListener('load', () => {
    const globalSearchBtn = document.querySelector('#search-btn');
    const globalSearchInput = document.querySelector('#search-input');
    const globalMobileSearchInput = document.querySelector('#search-mobile-input');
    const globalMobileSearchBtn = document.querySelector('#search-mobile-btn');

    const logoutBtn = document.querySelector('.logout');
    logoutBtn.addEventListener("click", () => {
        logout();
    });

    globalSearchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        location.href = `search.html?value=${globalSearchInput.value.trim()}`;
    });

    globalMobileSearchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        location.href = `search.html?value=${globalMobileSearchInput.value.trim()}`;
    })

    showUserNameInNavbar();
    headerResponsive();
    getAndShowMenus();
    go404Page();
});