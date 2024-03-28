import { getAndShowUserInfos, updateUserInfos } from "./func/shared.js";

window.addEventListener("load", () => {
    getAndShowUserInfos();

    const updateUserBtn = document.querySelector("#updateUserBtn");
    updateUserBtn.addEventListener("click", (event) => {
        event.preventDefault();
        updateUserInfos();
    });
});