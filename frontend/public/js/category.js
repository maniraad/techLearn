import { getAndShowCategoryCourses, insertCourseBoxHtmlTemplate, coursesSorting, handleGroupingAndSortingBox } from "./funcs/shared.js";
import { searchInArray } from "./funcs/utils.js";

window.addEventListener("load", () => {
    getAndShowCategoryCourses().then(responseCourses => {

        let courses = [...responseCourses];
        const categoryCourseWrapper = document.querySelector('#category-course-wrapper');
        const sortList = document.querySelectorAll('.sort-list');
        const coursesSearchInput = document.querySelector('#search-input');

        handleGroupingAndSortingBox();
        // Show Category Courses By row showType
        if (courses.length) {
            insertCourseBoxHtmlTemplate(
                courses,
                categoryCourseWrapper
            );
        } else {
            categoryCourseWrapper.insertAdjacentHTML('afterend',
                `
            <div class="flex-center flex-col gap-5 text-slate-600 text-center">
                <svg class="w-7 h-7">
                    <use xlink:href="#no-symbol"></use>
                </svg>
                <span>نتیجه ای یافت نشد!</span>
            </div>
        `
            )
        };

        // Show Category Courses By user filtering method
        sortList.forEach(item => {
            item.addEventListener("click", event => {

                sortList.forEach(selectionItem => selectionItem.classList.remove('font-bold'));
                event.target.classList.add('font-bold');

                let userFilteringSelection = event.target.dataset.key
                let showCourses = coursesSorting([...courses], userFilteringSelection)

                insertCourseBoxHtmlTemplate(showCourses, categoryCourseWrapper)
            })
        });

        // Handle Search In Courses
        coursesSearchInput.addEventListener('input', event => {
            console.log(event.target.value);

            const showCourses = searchInArray([...responseCourses], "name", event.target.value);

            // Handle Empty Search In Courses

            if (showCourses.length) {
                insertCourseBoxHtmlTemplate(showCourses, categoryCourseWrapper);
                document.querySelector('#alert-box').innerHTML = '';
            } else {
                if (categoryCourseWrapper.innerHTML !== '') {
                    categoryCourseWrapper.innerHTML = ''
                    categoryCourseWrapper.insertAdjacentHTML('afterend',
                        `
                <div id="alert-box" class="flex-center flex-col gap-5 text-slate-600 text-center text-xl">
                    <svg class="w-7 h-7">
                        <use xlink:href="#no-symbol"></use>
                    </svg>
                    <span>متاسفانه دوره ای مطابق با جستجوی شما پیدا نشد ):</span>
                </div>
            `
                    )
                }
            }
        });
    });
});