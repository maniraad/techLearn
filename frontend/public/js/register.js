import { register } from "./funcs/auth.js";

const registerBtn = document.querySelector("#registerbtn");

console.log('Register.js');

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  register();
});