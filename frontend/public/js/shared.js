import { getMe } from "./funcs/auth.js";

window.addEventListener('load', () => {
    getMe().then(res => {
        console.log(res);
    })
});