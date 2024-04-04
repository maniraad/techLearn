import { getAllMenus, prepareCreateMenuItem, createNewMenuItem,removeMenuItem } from "./func/shared.js";

window.removeMenuItem = removeMenuItem
window.addEventListener("load", () => {
    getAllMenus();
    prepareCreateMenuItem();

    const addMenuItemBtn = document.querySelector('#addMenuItemBtn');
    addMenuItemBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewMenuItem();
    });

});
