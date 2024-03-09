import { showUserNameInNavbar, headerResponsive, getAndShowMenus } from "./funcs/shared.js";

headerResponsive()

window.addEventListener('load', () => {
    showUserNameInNavbar();
    getAndShowMenus();
});