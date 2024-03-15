import { showUserNameInNavbar, headerResponsive, getAndShowMenus } from "./funcs/shared.js";

window.addEventListener('load', () => {
    const globalSearchBtn = document.querySelector('#search-btn');
    const globalSearchInput = document.querySelector('#search-input');

    globalSearchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        location.href = `search.html?value=${globalSearchInput.value.trim()}`;
    });

    showUserNameInNavbar();
    headerResponsive();
    getAndShowMenus();
});