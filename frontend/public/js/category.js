import { getAndShowCategoryCourses } from "./funcs/shared.js";

const sort = document.querySelector('#sort');
const sortBox = document.querySelector('#sort-box');
const Grouping = document.querySelector('#Grouping');
const GroupingBox = document.querySelector('#Grouping-box');

// sort.addEventListener('click', () => {
//     sortBox.classList.toggle('hide');
// });

Grouping.addEventListener('click', () => {
    GroupingBox.classList.toggle('hide');
});

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(res => {

        const categoryCourseWrapper = document.querySelector('#category-course-wrapper');
        const sortList = document.querySelectorAll('.sort-list')

        let courses = [...res]

        if (courses.length) {
            courses.forEach(course => {

                categoryCourseWrapper.insertAdjacentHTML('beforeend',
                    `
                                <div
                                    class="inline-flex flex-col items-center gap-y-4 py-3 px-4 bg-white max-w-[340px] rounded-3xl shadow-sm">
                                    <!-- Image -->
                                    <div class="">
                                        <img src="images/courses/C-sharp.png" alt="Js-course" class="">
                                    </div>
                                    <!-- Box Body -->
                                    <div class="flex flex-col justify-center items-start self-baseline gap-y-4">
                                        <!-- Topic -->
                                        <h4
                                            class="text-2xl text-right font-EstedadMedium font-bold overflow-hidden line-clamp-1">
                                            ${course.name}</h4>
                                        <!-- Teacher & Time -->
                                        <div class="flex flex-wrap text-sm">
                                            <div class="flex-center gap-x-1 py-1 px-2">
                                                <svg class="w-4 h-4">
                                                    <use href="#user"></use>
                                                </svg>
                                                <a href="#">${course.creator}</a>
                                            </div>
                                            <div class="flex-center gap-x-1 py-1 px-2">
                                                <svg class="w-4 h-4">
                                                    <use href="#clock"></use>
                                                </svg>
                                                <span>۲۰:۴۳</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Price -->
                                    <div class="self-end text-2xl text-right font-EstedadMedium font-bold">
                                    ${course.price === 0 ? "رایگان" : course.price.toLocaleString() + "تومان"} 
                                    </div>
                                    <!-- Button -->
                                    <a href="#"
                                        class="self-stretch py-3 text-white text-center font-EstedadMedium bg-teal-600 hover:bg-teal-700 rounded-2xl delay-100 transition-all">
                                        مشاهده و ثبت نام </a>
                                </div>
                `
                )
            });
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
        }

        sortList.forEach(item => {
            item.addEventListener('click', (event) => {

                sortList.forEach(selectionItem => selectionItem.classList.remove('font-bold'));
                event.target.classList.add('font-bold'); 
            })
        });
    });
});