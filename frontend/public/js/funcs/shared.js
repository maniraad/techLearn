import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken } from "./utils.js";

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
                <a href="course.html?name=${course.shortName}" class="text-2xl text-right font-EstedadMedium font-bold overflow-hidden line-clamp-1">
                    ${course.name}
                    </a>
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
            <a href="course.html?name=${course.shortName}"
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
                                    <a href="course.html?name=${presellCourse.shortName}"
                                        class="text-xl lg:text-2xl text-right font-EstedadMedium lg:font-bold overflow-hidden line-clamp-1">
                                          ${presellCourse.name} </a>
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

const getAndShowArticles = async () => {

    const articlesContainer = document.querySelector('#articles-wrapper');

    const res = await fetch(`http://localhost:4000/v1/articles`);

    const articles = await res.json();

    articles.slice(0, 4).forEach(article => {
        articlesContainer.insertAdjacentHTML('beforeend',
            `
                    <div class="flex sm:block gap-x-2.5 group p-2.5 md:pb-2 bg-white shadow-sm rounded-2xl">
                        <div
                            class=" sm:mb-4 shrink-0 rounded-2xl rounded-bl-4xl overflow-hidden w-[130px] h-[130px] sm:w-auto sm:h-auto">
                            <img src="images/blogs/Figma-breack-point-plugin.png" alt=""
                                class="h-full sm:h-auto object-cover">
                        </div>
                        <div class="sm:flex items-start justify-between w-full">
                            <a href="#"
                                class="font-EstedadMedium md:font-Estedad ml-1.5 sm:ml-0 text-sm md:text-lg mt-2.5 sm:mt-0 line-clamp-2 leading-7 max-w-[193px] text-zinc-700">
                                ${article.title}</a>
                            <div class="hidden sm:flex items-center gap-x-5">
                                <span class="block w-px h-[61px] bg-gray-100 "></span>
                                <div class="flex flex-col ml-[18px] -mt-1 text-left text-teal-600 text-sm">
                                    <span class="font-EstedadBold text-2xl">21</span>
                                    <span class="">مرداد</span>
                                    <span class="">1402</span>
                                </div>
                            </div>
                            <div
                                class="flex sm:hidden justify-between items-end border-t border-t-gray-100 pt-[18px] mt-5">
                                <span class="text-xs text-teal-600">21 مرداد 1402</span>
                                <a href="#"
                                    class="flex items-center gap-x-1 ml-1.5 font-EstedadMedium text-xs h-5 rounded-md pr-2.5 pl-2 text-teal-600 bg-teal-400/20">
                                    مطالعه
                                    <svg class="w-3.5 h-3.5">
                                        <use href="#arrow-left-mini"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
        `)
    });
};

const getAndShowMenus = async () => {

    const menusContainer = document.querySelector('#menus-wrapper');

    const res = await fetch(`http://localhost:4000/v1/menus`);

    const menus = await res.json();


    menus.forEach(menu => {
        menusContainer.insertAdjacentHTML('beforeend',
            `
            <li class="relative group">
                <a href="http://127.0.0.1:5500/frontend/public/${menu.href}" class="flex items-center gap-x-1.5 h-full text-zinc-700">
                    ${menu.title}
                </a>
                    ${menu.submenus.length !== 0 ?
                `   
                    <svg class="w-4 h-4">
                        <use xlink:href="#chevron-down"></use>
                    </svg>

                    <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-1 xl:pt-4 transition-all z-10">
                        <div class="flex flex-col gap-y-5 w-64 bg-white shadow-sm py-5 px-6 rounded-2xl text-base">
                            ${menu.submenus.map((submenu) => (
                    ` 
                            <a href=category.html?cat=${submenu.href} class="overflow-hidden text-ellipsis whitespace-nowrap text-zinc-700 transition-all">
                            ${submenu.title}
                            </a>
                          `
                )).join('')}
                      `
                : ''}
                        </div>
                    </div>
                
            </li>         
        `
        )
    });
};

const getAndShowCategoryCourses = async () => {
    const categoryName = getUrlParam("cat");

    const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`);
    const courses = await res.json();

    return courses
};

const insertCourseBoxHtmlTemplate = (courses, parentElement) => {
    parentElement.innerHTML = "";

    courses.forEach(course => {

        parentElement.insertAdjacentHTML('beforeend',
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
                                <a href="course.html?name=${course.shortName}"
                                    class="text-2xl text-right font-EstedadMedium font-bold overflow-hidden line-clamp-1">
                                    ${course.name}</a>
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
                            <a href="course.html?name=${course.shortName}"
                                class="self-stretch py-3 text-white text-center font-EstedadMedium bg-teal-600 hover:bg-teal-700 rounded-2xl delay-100 transition-all">
                                مشاهده و ثبت نام </a>
                        </div>
        `
        )
    });
};

const coursesSorting = (array, filterMethod) => {
    let outPutArray = []

    switch (filterMethod) {
        case 'free': {
            outPutArray = array.filter(course => course.price === 0)
            break
        }
        case 'money': {
            outPutArray = array.filter(course => course.price !== 0)
            break
        }
        case 'first': {
            outPutArray = [...array].reverse()
            break
        }
        case 'last': {
            outPutArray = array
            break
        }
        case 'default': {
            outPutArray = array
            break
        }
        default: {
            outPutArray = array
        }
    };

    return outPutArray
};

const observerScroll = () => {
    const selectSection = document.querySelectorAll('.select-section');
    const menuItems = document.querySelectorAll('.menu__item');

    // Intersection Observer Scroll
    const observer = new IntersectionObserver(observerHandler, { threshold: 0.7 });
    function observerHandler(allSections) {
        allSections.map(section => {
            let sectionClassName = section.target.id;
            let sectionMenuItem = document.querySelector(`.menu__item[data-section=${sectionClassName}]`);
        })
    };
    selectSection.forEach(section => {
        observer.observe(section);
    });
    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();

            let sectionClass = item.getAttribute("data-section");
            let sectionOffsetTop = document.querySelector(`#${sectionClass}`).offsetTop;

            window.scrollTo({
                top: sectionOffsetTop - 130,
                behavior: "smooth"
            });
        })
    });
};

const getCourseDetails = () => {

    // Select Dom Elements
    const $ = document;
    const courseCategory = $.querySelector('#category-course');
    const courseTitle = $.querySelector('#title-course');
    const courseDescription = $.querySelector('#description-course');
    const coursePrice = $.querySelector('#course-price');
    const courseStatus = $.querySelector('#course-status');
    const courseSupport = $.querySelector('#support');
    const courseDate = $.querySelector('#date');
    const courseStudents = $.querySelector('#students');
    const courseRegisterButtons = $.querySelectorAll('.course-register-btn');

    const courseShortName = getUrlParam("name");

    fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(res => res.json())
        .then(course => {
            console.log(course.shortName);
            courseCategory.innerHTML = course.categoryID.title
            courseTitle.innerHTML = course.name
            courseDescription.innerHTML = course.description
            courseSupport.innerHTML = course.support
            courseStudents.innerHTML = course.courseStudentsCount
            courseDate.innerHTML = course.updatedAt.slice(0, 10)
            coursePrice.innerHTML = course.price === 0 ? "رایگان" : course.price.toLocaleString() + "تومان"

            courseStatus.innerHTML = course.isComplete ? "تکمیل شده" : "در حال برگذاری"
            courseRegisterButtons.forEach(courseRegisterButton => {
                courseRegisterButton.innerHTML = course.isUserRegisteredToThisCourse ? "دانشجوی دوره هستید" : "ثبت نام دوره"
            });

            // Show Course sessions
            const coursesSessionsWrapper = $.querySelector('.courses-sessions-wrapper');
            course.sessions.forEach((session, index) => {
                let time = session.time
                console.log(time);
                // session.time.forEach(time => {
                //     console.log(time);
                // });
                coursesSessionsWrapper.insertAdjacentHTML("beforeend",
                    `
                <div
                    class="md:flex items-center gap-2.5 flex-wrap space-y-3.5 md:space-y-0 py-4 md:py-6 px-3.5 md:px-5 group">
                    ${(session.free || course.isUserRegisteredToThisCourse) ? `
                            <a href="episode.html?name=${course.shortName}&id=${session._id}" target="_blank"
                                class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%] ">
                                <span
                                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-EstedadBold text-xs md:text-base text-zinc-700 group-hover:bg-teal-600 group-hover:text-white rounded-md transition-colors">${index + 1}</span>
                                <h4
                                    class="text-zinc-700 group-hover:text-teal-600 text-sm md:text-lg transition-colors">
                                    ${session.title}</h4>
                            </a>
                        ` : `
                            <span
                                class="flex items-center gap-x-1.5 md:gap-x-2.5 shrink-0 w-[85%] ">
                                <span
                                    class="flex items-center justify-center shrink-0 w-5 h-5 md:w-7 md:h-7 bg-white font-EstedadBold text-xs md:text-base text-zinc-700 group-hover:bg-teal-600 group-hover:text-white rounded-md transition-colors">${index + 1}</span>
                                <h4
                                    class="text-zinc-700 group-hover:text-teal-600 text-sm md:text-lg transition-colors">
                                    ${session.title}</h4>
                            </span>
                        `
                    }
                    <div class="flex items-center w-full justify-between">
                        <span
                            class="inline-block h-[25px] leading-[25px] px-2.5 bg-gray-200 text-zinc-700 group-hover:bg-teal-600/10 group-hover:text-teal-700 text-xs rounded transition-colors">
                            ${session.free ? "جلسه رایگان" : "خصوصی"} 
                        </span>
                        <div class="flex items-start gap-x-1.5 md:gap-x-2">
                            <span class="text-slate-500 text-sm md:text-lg font-EstedadMedium">
                            ${session.time}
                            </span>
                            <svg
                                class="w-5 h-6 md:w-6 md:h-6 text-zinc-700 group-hover:text-teal-600 transition-colors">
                                <use xlink:href="#${session.free ? "play-circle" : "lock-closed"}"></use>
                            </svg>
                        </div>
                    </div>

                </div>
                `)
            });
        })
};

export { showUserNameInNavbar, headerResponsive, getAndShowAllCourses, getAndShowPreSellCourses, getAndShowArticles, getAndShowMenus, getAndShowCategoryCourses, insertCourseBoxHtmlTemplate, coursesSorting, observerScroll, getCourseDetails };