import { getAndShowAllCourses, insertCourseBoxHtmlTemplate, coursesSorting, handleGroupingAndSortingBox } from "./funcs/shared.js";
import { searchInArray } from "./funcs/utils.js";

window.addEventListener("load", () => {
    handleGroupingAndSortingBox();
    getAndShowAllCourses(16).then(responseCourses => {

        let courses = [...responseCourses];
        const sortList = document.querySelectorAll('.sort-list');
        const groupList = document.querySelectorAll('.group-list');
        const coursesSearchInput = document.querySelector('#course-search-input');
        const courseContainer = document.querySelector('#course-container');

        // Show Category Courses By user filtering method
        sortList.forEach(item => {
            item.addEventListener("click", event => {

                sortList.forEach(selectionItem => selectionItem.classList.remove('font-bold'));
                event.target.classList.add('font-bold');

                let userFilteringSelection = event.target.dataset.key
                let showCourses = coursesSorting([...courses], userFilteringSelection)

                insertCourseBoxHtmlTemplate(showCourses, courseContainer)
            });
        });

        // Show Grouping Courses By User Selection
        groupList.forEach(item => {
            item.addEventListener("click", event => {
                let userSelectOption = event.target.dataset.key
                window.location.href = userSelectOption
            })
        });

        // Handle Search In Courses
        coursesSearchInput.addEventListener('input', event => {

            const showCourses = searchInArray([...responseCourses], "name", event.target.value);

            // Handle Empty Search In Courses

            if (showCourses.length) {
                insertCourseBoxHtmlTemplate(showCourses, courseContainer);
                document.querySelector('#alert-box').innerHTML = '';
            } else {
                if (courseContainer.innerHTML !== '') {
                    courseContainer.innerHTML = ''
                    courseContainer.insertAdjacentHTML('afterend',
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