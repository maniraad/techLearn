import { getAllMenus,prepareCreateMenuItem } from "./func/shared.js";

window.addEventListener("load", () => {
    getAllMenus();
    prepareCreateMenuItem().then(res=>{
        console.log(res);
    })
});