import { getAndShowAllArticles, insertArticleBoxHtmlTemplate } from "./funcs/shared.js";
import { searchInArray } from "./funcs/utils.js";

window.addEventListener("load", () => {
    getAndShowAllArticles().then(responseArticles => {

        let articles = [...responseArticles];
        const articleSearchInput = document.querySelector('#article-search-input');
        const articleContainer = document.querySelector('#article-container');

        // Handle Search In Courses
        articleSearchInput.addEventListener('input', event => {

            const showArticles = searchInArray([...responseArticles], "title", event.target.value);

            // Handle Empty Search In Courses

            if (showArticles.length) {
                insertArticleBoxHtmlTemplate(showArticles, articleContainer);
                document.querySelector('#alert-box').innerHTML = '';
            } else {
                if (articleContainer.innerHTML !== '') {
                    articleContainer.innerHTML = ''
                    articleContainer.insertAdjacentHTML('afterend',
                        `
                <div id="alert-box" class="flex-center flex-col gap-5 text-slate-600 text-center text-xl">
                    <svg class="w-7 h-7">
                        <use xlink:href="#no-symbol"></use>
                    </svg>
                    <span>متاسفانه مقاله ای مطابق با جستجوی شما پیدا نشد ):</span>
                </div>
            `
                    )
                }
            }
        });
    })
});