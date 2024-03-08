import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const headerResponsive = () => {
    const menuNavElem = document.querySelector('#nav-bar-icon');
    const navigation = document.querySelector('.navigation');
    const navigationCloseBtn = document.querySelector('.navigation__close-btn');
    const overlay = document.querySelector('.overlay');

    // Open Navigation
    menuNavElem.addEventListener('click', () => {
        navigation.classList.remove('-right-64');
        navigation.classList.add('right-0');
        overlay.classList.remove('opacity-0');
        overlay.classList.remove('invisible');
    });

    // Close Navigation
    navigationCloseBtn.addEventListener('click', () => {
        navigation.classList.remove('right-0');
        navigation.classList.add('-right-64');
        overlay.classList.add('opacity-0');
    });
    overlay.addEventListener('click', () => {
        navigation.classList.remove('right-0');
        navigation.classList.add('-right-64');
        overlay.classList.add('invisible');
    });
};

const showUserNameInNavbar = () => {

    const userLoginBtn = document.querySelector('#user-login-btn');
    const userLoginBtnIcon = document.querySelector('#user-login-btn-icon');

    const isUserLogin = isLogin()

    if (isUserLogin) {

        const userInfos = getMe().then(data => {
            userLoginBtnIcon.classList.add("hidden");
            userLoginBtn.setAttribute('href', 'login.html')
            userLoginBtn.innerHTML = data.name
        });

    } else {
        userLoginBtn.setAttribute('href', 'login.html')
        userLoginBtn.innerHTML = 'ورود یا ثبت نام'
    }
};

const getAndShowAllCourses = async () => {

    const courseContainer = document.querySelector('#course-container');

    const res = await fetch(`http://localhost:4000/v1/courses`);

    const courses = await res.json();

    courses.slice(0, 8).map(course => {
        courseContainer.insertAdjacentHTML('beforeend',
            `
        <div class="inline-flex flex-col items-center gap-y-4 py-3 px-4 bg-white max-w-[340px] rounded-3xl shadow-sm">
        
            <div class="">
                <img src="images/courses/Js.png" alt="Js-course" class="">
            </div>
            <!-- Box Body -->
            <div class="flex flex-col justify-center items-start self-baseline gap-y-4">
                <!-- Topic -->
                <h4 class="text-2xl text-right font-EstedadMedium font-bold overflow-hidden line-clamp-1">
                    ${course.name}
                    </h4>
                <!-- Teacher & Time -->
                <div class="flex flex-wrap text-sm">
                    <div class="flex-center gap-x-1 py-1 px-2">
                        <svg class="w-4 h-4">
                            <use href="#user"></use>
                        </svg>
                        <a href="#"> ${course.creator} </a>
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
`)

    })
};

const getAndShowPreSellCourses = async () => {

    const preSellCoursesContainer = document.querySelector('#presell-courses-wrapper');

    const res = await fetch(`http://localhost:4000/v1/courses/presell`);

    const presellCourses = await res.json();

    presellCourses.forEach(presellCourse => {
        preSellCoursesContainer.insertAdjacentHTML('beforeend',
            `
                        <div class="swiper-slide">
                            <div
                                class="inline-flex flex-col flex-grow items-center gap-y-4 py-3 px-4 bg-white max-w-[340px] rounded-3xl shadow-sm">
                                <!-- Image -->
                                <div class="">
                                    <a href="#"><img src="images/courses/laravel.png" alt="Js-course" class=""></a>
                                </div>
                                <!-- Box Body -->
                                <div class="flex flex-col justify-center items-start self-baseline gap-y-4">
                                    <!-- Topic -->
                                    <h4
                                        class="text-xl lg:text-2xl text-right font-EstedadMedium lg:font-bold overflow-hidden line-clamp-1">
                                          ${presellCourse.name} </h4>
                                    <!-- Teacher & Time -->
                                    <div class="flex flex-wrap text-sm">
                                        <div class="flex-center gap-x-1 py-1 px-2">
                                            <svg class="w-4 h-4">
                                                <use href="#user"></use>
                                            </svg>
                                            <a href="#">${presellCourse.creator}</a>
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
                                <div
                                    class="self-end text-lg md:text-xl lg:text-2xl text-right font-EstedadMedium font-bold">
                                    ${presellCourse.price === 0 ? "رایگان" : presellCourse.price.toLocaleString() + "تومان"}
                                </div>
                            </div>
                        </div>
        `)
    });
};



export { showUserNameInNavbar, headerResponsive, getAndShowAllCourses, getAndShowPreSellCourses, getAndShowArticles };