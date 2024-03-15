import { insertCourseBoxHtmlTemplate, handleGroupingAndSortingBox, globalSearch } from "./funcs/shared.js";

window.addEventListener("load", () => {
    handleGroupingAndSortingBox();
    globalSearch().then(responseSearch => {

        const courses = responseSearch.allResultCourses;
        const categoryCourseWrapper = document.querySelector('#category-course-wrapper');
        
        console.log(courses);

        if (courses.length) {
            insertCourseBoxHtmlTemplate(courses,categoryCourseWrapper)
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
            );
        };
    })
})