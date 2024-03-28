import { handleGroupingAndSortingBox, globalSearch } from "./funcs/shared.js";

window.addEventListener("load", () => {
    handleGroupingAndSortingBox();
    globalSearch().then(responseSearch => {

        const courses = responseSearch.allResultCourses;
        const categoryCourseWrapper = document.querySelector('#category-course-wrapper');

        if (courses.length) {
            categoryCourseWrapper.innerHTML = "";

            courses.forEach(course => {

                categoryCourseWrapper.insertAdjacentHTML('beforeend',
                    `
                <div
                                class="inline-flex flex-col items-center gap-y-4 py-3 px-4 bg-white max-w-[340px] rounded-3xl shadow-sm">
        
                                <div class="">
                                    <img src=http://localhost:4000/courses/covers/${course.cover}>
                                </div>
                                <!-- Box Body -->
                                <div class="flex flex-col justify-center items-start self-baseline gap-y-4">
                                    <!-- Topic -->
                                    <a href="course.html?name=${course.shortName}"
                                        class="text-2xl tracking-tighter text-right font-EstedadMedium overflow-hidden line-clamp-1">
                                        ${course.name}
                                    </a>
                                    <!-- Teacher & Time -->
                                    <div class="flex flex-wrap text-sm">
                                        <div class="flex-center gap-x-1 py-1 px-2">
                                            <svg class="w-4 h-4">
                                                <use href="#user"></use>
                                            </svg>
                                            <a href="#"> ${course.creator.name} </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between w-full border-t pt-4">
                                    <!-- Users -->
                                    <span class="flex items-center gap-x-0.5 text-slate-500 text-sm">
                                        <svg class="w-5 h-5">
                                            <use href="#users"></use>
                                        </svg>
                                        ${course.registers}
                                    </span>
                                    <!-- Price -->
                                    <div class="self-end text-xl text-right font-EstedadeMedium tracking-tighter">
                                    ${course.price === 0 ? "رایگان" : course.price.toLocaleString() + ` <span class="text-base">تومان</span>`}    
                                    </div>
                                </div>
                                <!-- Button -->
                                <a href="course.html?name=${course.shortName}"
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
            );
        };
    })
})