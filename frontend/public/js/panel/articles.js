import { getAllArticles, prepareCreateArticleForm, createNewArticle } from "./func/shared.js";

// window.removeSession = removeSession
window.addEventListener("load", () => {
  getAllArticles();
  prepareCreateArticleForm();

  const addArticleBtn = document.querySelector("#addArticleBtn");
  addArticleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createNewArticle();
  });
});
