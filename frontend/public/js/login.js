import { login } from "./funcs/auth.js";

const loginBtn = document.querySelector("#login-btn");

console.log('login');

loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    login();
});