import { getAllSessions, prepareCreateSessionForm } from "./func/shared.js";

// window.showContentBody = showContentBody
// window.answerToContact = answerToContact
// window.removeMessage = removeMessage
window.addEventListener("load", () => {
    getAllSessions();
    prepareCreateSessionForm();

    //     const addMenuItemBtn = document.querySelector('#addMenuItemBtn');
    //     addMenuItemBtn.addEventListener("click", event => {
    //         event.preventDefault();
    //         createNewMenuItem();
    //     });

});