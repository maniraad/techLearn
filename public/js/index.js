import { getAndShowAllCourses, getAndShowPreSellCourses, getAndShowArticles, getAndShowMenus, showContentData } from "./funcs/shared.js";

window.addEventListener('load', () => {
    showContentData();
    getAndShowAllCourses(8);
    getAndShowPreSellCourses();
    getAndShowArticles();
});