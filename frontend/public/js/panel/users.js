import { getAllUsers, createNewUser, removeUser, banUser, changeRole } from "./func/shared.js";

window.removeUser = removeUser
window.banUser = banUser
window.changeRole = changeRole
window.addEventListener("load", () => {

    getAllUsers();

    const addUserBtn = document.querySelector('#addUserBtn');

    addUserBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewUser()
    });
});