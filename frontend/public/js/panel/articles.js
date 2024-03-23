import { getAllArticles, prepareCreateArticleForm, createNewArticle,removeArticle } from "./func/shared.js";

window.removeArticle = removeArticle
window.addEventListener("load", () => {
  getAllArticles();
  prepareCreateArticleForm();

  const addArticleBtn = document.querySelector("#addArticleBtn");
  addArticleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewArticle();
  });
});
