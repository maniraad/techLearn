import { getAllCategories, createNewCategory, removeCategory } from "./func/shared.js";

window.removeCategory = removeCategory
window.addEventListener("load", () => {

    getAllCategories();

     const addCategoriesBtn = document.querySelector('#addCategoriesBtn');

     addCategoriesBtn.addEventListener("click", event => {
         event.preventDefault();
         createNewCategory()
     });
});