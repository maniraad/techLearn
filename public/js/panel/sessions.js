import { getAllSessions, prepareCreateSessionForm, createNewSession, removeSession } from "./func/shared.js";

window.removeSession = removeSession
window.addEventListener("load", () => {
    getAllSessions();
    prepareCreateSessionForm();

    const addSessionBtn = document.querySelector('#addSessionBtn');
    addSessionBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewSession();
    });

});