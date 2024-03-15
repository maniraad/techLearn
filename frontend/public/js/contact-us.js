import { submitContactUsMassage } from "./funcs/shared.js";

window.addEventListener("load", () => {
    const registerButton = document.querySelector('#register-btn');

    registerButton.addEventListener("click", (event) => {
        event.preventDefault()
        submitContactUsMassage()
    });
});

