import { Toast, getToken } from "../../funcs/utils.js";

const getAndShowUseCourse = async () => {

    const courseContainerElem = document.querySelector("#course-container");
    courseContainerElem.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/orders`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const userCourses = await res.json();

    userCourses.forEach(userCourse => {
        console.log(userCourse.course);
        courseContainerElem.insertAdjacentHTML("beforeend", `
        <div
                        class="inline-flex flex-col items-center gap-y-4 py-3 px-4 bg-white max-w-[340px] rounded-3xl shadow-sm">

                        <div class="">
                            <img
                                src="http://localhost:4000/courses/covers/${userCourse.course.cover}">
                        </div>
                        <!-- Box Body -->
                        <div class="flex flex-col justify-center items-start self-baseline gap-y-4">
                            <!-- Topic -->
                            <a href="course.html?name=Tailwind-css"
                                class="text-2xl tracking-tighter text-right font-EstedadMedium overflow-hidden line-clamp-1">
                                ${userCourse.course.name}
                            </a>
                            <!-- Teacher & Time -->
                            <div class="flex flex-wrap text-sm">
                                <div class="flex-center gap-x-1 py-1 px-2">
                                    <svg class="w-4 h-4">
                                        <use href="#user"></use>
                                    </svg>
                                    <a href="#"> مانی راد </a>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between w-full border-t pt-4">
                            <!-- Users -->
                            <span class="flex items-center gap-x-0.5 text-slate-500 text-sm">
                                <svg class="w-5 h-5">
                                    <use href="#users"></use>
                                </svg>
                                0
                            </span>
                            <!-- Price -->
                            <div class="self-end text-xl text-right font-EstedadeMedium tracking-tighter">
                                ${userCourse.course.price === 0 ? "رایگان" : course.price.toLocaleString() + ` <span class="text-base">تومان</span>`}
                            </div>
                        </div>
                        <!-- Button -->
                        <a href="../course.html?name=${userCourse.course.shortName}"
                            class="self-stretch py-3 text-white text-center font-EstedadMedium bg-teal-600 hover:bg-teal-700 rounded-2xl delay-100 transition-all">
                            مشاهده و ثبت نام </a>
                    </div>
        `)
    });
};

export { getAndShowUseCourse };