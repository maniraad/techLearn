import { getAllMessages, showContentBody, removeMessage } from "./func/shared.js";

window.showContentBody = showContentBody
window.addEventListener("load", () => {
    getAllMessages();
    // prepareCreateMenuItem();

    // const addMenuItemBtn = document.querySelector('#addMenuItemBtn');
    // addMenuItemBtn.addEventListener("click", event => {
    //     event.preventDefault();
    //     createNewMenuItem();
    // });

});
