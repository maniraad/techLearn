import { register } from "./funcs/auth.js";

const registerBtn = document.querySelector("#register-btn");

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  register();
});