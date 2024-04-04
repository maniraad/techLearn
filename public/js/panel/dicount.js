import { getAllDiscount, prepareCreateDiscountForm, createNewDiscount, removeDiscount } from "./func/shared.js";

window.removeDiscount = removeDiscount
window.addEventListener("load", () => {
    getAllDiscount();
    prepareCreateDiscountForm();

    const addOffsBtn = document.querySelector('#addOffsBtn');
    addOffsBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewDiscount();
    });

});
