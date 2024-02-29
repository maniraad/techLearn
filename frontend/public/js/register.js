import { register } from "./funcs/auth.js";

const registerBtn = document.querySelector('#registerbtn');

registerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    register();
}); 