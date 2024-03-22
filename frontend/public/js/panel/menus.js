import { getAllMenus, prepareCreateMenuItem, createNewMenuItem } from "./func/shared.js";

window.addEventListener("load", () => {

    getAllMenus();
    prepareCreateMenuItem();

    const addMenuItemBtn = document.querySelector('#addMenuItemBtn');
    addMenuItemBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewMenuItem();
    });
    
});
