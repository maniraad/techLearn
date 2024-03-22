import { getAllMessages, showContentBody, answerToContact } from "./func/shared.js";

window.showContentBody = showContentBody
window.answerToContact = answerToContact
window.addEventListener("load", () => {
    getAllMessages();
    // prepareCreateMenuItem();

    // const addMenuItemBtn = document.querySelector('#addMenuItemBtn');
    // addMenuItemBtn.addEventListener("click", event => {
    //     event.preventDefault();
    //     createNewMenuItem();
    // });

});
