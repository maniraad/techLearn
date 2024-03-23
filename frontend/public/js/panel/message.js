import { getAllMessages, showContentBody, answerToContact, removeMessage } from "./func/shared.js";

window.showContentBody = showContentBody
window.answerToContact = answerToContact
window.removeMessage = removeMessage
window.addEventListener("load", () => {
    getAllMessages();
});
