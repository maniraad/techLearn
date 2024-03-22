import { getAllCategories, createNewCategory, removeCategory } from "./func/shared.js";

// window.removeCourse = removeCourse
window.addEventListener("load", () => {

    getAllCategories();

     const addCategoriesBtn = document.querySelector('#addCategoriesBtn');

     addCategoriesBtn.addEventListener("click", event => {
         event.preventDefault();
         createNewCategory()
     });
});