import { getAllSessions, prepareCreateSessionForm, createNewSession } from "./func/shared.js";

// window.removeMessage = removeMessage
window.addEventListener("load", () => {
    getAllSessions();
    prepareCreateSessionForm();

    const addSessionBtn = document.querySelector('#addSessionBtn');
    addSessionBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewSession();
    });

});