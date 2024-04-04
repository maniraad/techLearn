import { showUserNameInNavbar, go404Page, headerResponsive, getAndShowMenus, logout } from "./funcs/shared.js";
import { injectSpeedInsights } from '@vercel/speed-insights';import { injectSpeedInsights } from '@vercel/speed-insights';

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
    go404Page();
});

injectSpeedInsights();