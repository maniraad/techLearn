import { getMe } from "./auth.js";
import { Toast, isLogin, getUrlParam, getToken } from "./utils.js";

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
    const userBtn = document.querySelector('#user-btn');
    const userProfileDropdown = document.querySelector('#user-profile-dropdown');
    const overlay = document.querySelector('.overlay');

    const isUserLogin = isLogin()

    if (isUserLogin) {

        const userInfos = getMe().then(data => {
            data.role === "ADMIN" ? userBtn.setAttribute('href', 'panel/main') : userBtn.setAttribute('href', 'my-account')
            userBtn.classList.add('!flex-center')


        });
        userBtn.addEventListener("click", () => {
            console.log('s');
            userProfileDropdown.classList.toggle("!opacity-100");
            userProfileDropdown.classList.toggle("!visible");
            overlay.classList.toggle('invisible');
            overlay.classList.toggle('opacity-0');
        })

        overlay.addEventListener("click", () => {
            userProfileDropdown.classList.remove("!opacity-100");
            userProfileDropdown.classList.remove("!visible");
            overlay.classList.add('invisible');
            overlay.classList.add('opacity-0');
        })

    } else {
        userLoginBtn.classList.add('!flex-center')
    }
};

const showContentData = async () => {
    const landingStatusCourse = document.querySelector('.course-status');
    const landingStudents = document.querySelector('.student');
    const landingBlogs = document.querySelector('.blogs');

    const res = await fetch("http://localhost:4000/v1/infos/index", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()

    makeCounter(data.coursesCount, landingStatusCourse, 'دوره آموزشی');
    makeCounter(data.usersCount, landingStudents, 'دانشجو');
    makeCounter(data.totalTime, landingBlogs, 'دقیقه دوره ی اموزشی');

    function makeCounter(max, elemCounter, elemName) {
        let counter = 0;
        const interval = setInterval(() => {
            elemCounter.innerHTML = `${counter}  ${elemName} `
            counter++
            if (counter === max) {
                clearInterval(interval)
            }
        }, 12);
    };
}

const getAndShowAllCourses = async (coursesCount) => {

    const courseContainer = document.querySelector('#course-container');

    const res = await fetch(`http://localhost:4000/v1/courses`);

    const courses = await res.json();

    courses.slice(0, coursesCount).map(course => {
        courseContainer.insertAdjacentHTML('beforeend',
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

    return courses
};

const getAndShowAllArticles = async () => {

    const articleContainer = document.querySelector('#article-container');

    const res = await fetch(`http://localhost:4000/v1/articles`);

    const articles = await res.json();

    insertArticleBoxHtmlTemplate(articles, articleContainer)

    return articles
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

    insertArticleBoxHtmlTemplate(articles.slice(0, 4), articlesContainer)

    return articles
};

const getAndShowMenus = async () => {

    const menusContainer = document.querySelector('#menus-wrapper');

    const res = await fetch(`http://localhost:4000/v1/menus`);

    const menus = await res.json();


    menus.forEach(menu => {
        menusContainer.insertAdjacentHTML('beforeend',
            `
            <li class="relative group">
                <a href="${menu.href}" class="flex items-center gap-x-1.5 h-full text-zinc-700">
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

                        <div class="">
                            <img src=http://localhost:4000/courses/covers/${course.cover
            }>
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
};

const insertArticleBoxHtmlTemplate = (articles, parentElement) => {
    parentElement.innerHTML = "";

    articles.forEach(article => {

        parentElement.insertAdjacentHTML('beforeend',
            `
                        <div class="flex sm:block gap-x-2.5 group p-2.5 md:pb-2 bg-white shadow-sm rounded-2xl">
                            <div class=" sm:mb-4 shrink-0 rounded-2xl rounded-bl-4xl overflow-hidden w-[130px] h-[130px] sm:w-auto sm:h-auto">
                                <img src=http://localhost:4000/courses/covers/${article.cover} class="h-full sm:h-auto object-cover">
                            </div>
                            <div class="flex flex-col sm:flex-row items-start justify-between w-full">
                                <a href="blog.html?name=${article.shortName}" class="w-full font-EstedadMedium md:font-Estedad text-sm md:text-lg mt-2.5 sm:mt-0 line-clamp-1 text-zinc-700 ">
                                    ${article.title} </a>
                                <div class="flex sm:hidden items-end w-full border-t border-t-gray-100 pt-[18px] mt-5">
                                    <a href="#" class="inline-flex items-center gap-x-1 ml-1.5 font-EstedadMedium text-xs h-5 rounded-md pr-2.5 pl-2 text-teal-600 bg-teal-400/20">
                                        مطالعه
                                        <svg class="w-3.5 h-3.5">
                                            <use href="#arrow-left-mini"></use> 
                                        </svg>
                                    </a>
                                </div>
                            </div>
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

const handleGroupingAndSortingBox = () => {
    const Grouping = document.querySelector('#Grouping');
    const GroupingBox = document.querySelector('#Grouping-box');
    const sorting = document.querySelector('#sorting');
    const sortingBox = document.querySelector('#sorting-box');

    Grouping.addEventListener("click", () => {
        GroupingBox.classList.toggle('hide');
    });
    sorting.addEventListener("click", () => {
        sortingBox.classList.toggle('hide');
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
    const courseCover = $.querySelector('#course-cover');
    const courseRegisterButtons = $.querySelectorAll('.course-register-btn');

    const courseShortName = getUrlParam("name");

    fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(res => res.json())
        .then(course => {
            console.log(course);
            courseCover.setAttribute("src", `http://localhost:4000/courses/covers/${course.cover}`)
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

                if (courseRegisterButton.innerHTML === "ثبت نام دوره") {
                    courseRegisterButton.classList.add('cursor-pointer');

                    courseRegisterButton.addEventListener("click", () => {
                        if (course.price == 0) {
                            fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                                method: "POST",
                                headers: {
                                    Authorization: `Bearer ${getToken()}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ price: course.price })
                            }).then(res => {
                                Toast.fire({
                                    icon: "success",
                                    title: " ثبت نام با موفقیت انجام شد",
                                });
                                setTimeout(function () {
                                    location.reload()
                                }, 3000);
                            }).catch(err => {
                                Toast.fire({
                                    icon: "error",
                                    title: "مشکلی رخ داده است",
                                    text: "لطفا بعدا امتحان کنید !",
                                });
                            })
                        }
                    })
                }
            });

            // Breadcrumb
            const breadcrumbCategory = $.querySelector('#breadcrumb-category');
            const breadcrumbCourse = $.querySelector('#breadcrumb-course');

            breadcrumbCategory.innerHTML = course.categoryID.title
            breadcrumbCourse.innerHTML = course.name
            // Show Creator Course
            const sidebarWrapper = $.querySelector('.side-bar')
            sidebarWrapper.insertAdjacentHTML("beforeend",
                `
            <div class="rounded-2xl bg-white p-4 transition-all lg:p-7 mt-4 lg:mt-7 shadow-sm">
                            <div class="relative">
                                <div class="overflow-hidden relative ">
                                    <div>
                                        <div
                                            class="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 lg:flex-col lg:gap-0">
                                            <div class="flex w-full flex-col items-center ">
                                                <a href="#">
                                                    <img alt="" draggable="false" loading="lazy" width="120"
                                                        height="120" decoding="async" data-nimg="1"
                                                        class="aspect-square flex-none rounded-full object-cover transition-all duration-500 opacity-100 h-14 w-14 select-none md:h-16 md:w-16 lg:h-16 lg:w-16 xl:h-20 xl:w-20"
                                                        src="http://localhost:4000/courses/covers/${course.creator.cover}">
                                                </a>

                                                <div
                                                    class="mt-3 flex items-center justify-center gap-1 text-center text-sm font-bold md:text-base">
                                                    <p class="select-none transition-colors">
                                                        <a href="#">${course.creator.name}</a>
                                                    </p>
                                                    <svg class="w-5 h-5 text-teal-700">
                                                        <use xlink:href="#check-badge"></use>
                                                    </svg>
                                                </div>
                                                <p
                                                    class="mt-1 select-none text-center text-xs text-gray-500 transition-colors md:text-sm xl:mt-3">
                                                    مدرس دوره</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            `)


            // Show Course Sessions
            const coursesSessionsWrapper = $.querySelector('.courses-sessions-wrapper');
            course.sessions.forEach((session, index) => {
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

            // Show Course Comments
            const coursesCommentsWrapper = $.querySelector('.courses-comments-wrapper');

            if (course.comments.length) {
                course.comments.forEach(comment => {
                    coursesCommentsWrapper.insertAdjacentHTML("beforeend",
                        `
                                            <li class="w-full">
                                                <!-- Question -->
                                                <div
                                                    class="flex flex-col gap-4 rounded-lg p-4 sm:gap-5 sm:p-5 border-2 border-solid border-gray-200">
                                                    <!-- Profile -->
                                                    <div class="flex w-full justify-between gap-2 overflow-hidden">
                                                        <div class="flex-center gap-3 overflow-hidden">
                                                            <div class="overflow-hidden">
                                                                <div class="flex items-center gap-1 overflow-hidden">
                                                                    <h3
                                                                        class="overflow-hidden text-ellipsis text-xs font-EstedadBold sm:text-sm md:text-base">
                                                                        <span>${comment.creator.name}</span>
                                                                    </h3>
                                                                    ${comment.creator.role === "ADMIN" ?
                            `
                                                                                <svg class="w-4 h-4 text-teal-700">
                                                                                    <use xlink:href="#check-badge"></use>
                                                                                </svg>
                                                                `: ""}
                                                                </div>
                                                                <span class="text-xs text-slate-500 sm:text-sm">${comment.createdAt.slice(0, 10)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Massage -->
                                                    <p class="overflow-hidden text-ellipsis text-sm text-gray-500 md:text-base">${comment.body}</p>
                                                </div>
                                                 ${comment.answerContent ?
                            `
                                                <!-- Answer -->
    
                                                    <ul>
                                                        <li class="w-full pr-6 sm:pr-10">
                                                            <div
                                                                class="flex flex-col gap-4 rounded-lg p-4 sm:gap-5 sm:p-5 mt-3 bg-gray-100 md:mt-5">
                                                                <div class="flex w-full justify-between gap-2 overflow-hidden">
                                                                    <div class="flex-center gap-3 overflow-hidden">
                                                                        <div class="overflow-hidden">
                                                                            <div
                                                                                class="flex items-center gap-1 overflow-hidden">
                                                                                <h3
                                                                                    class="overflow-hidden text-ellipsis text-xs font-EstedadBold sm:text-sm md:text-base">
                                                                                    <a target="_blank" href="">${comment.answerContent.creator.name}</a>
                                                                                </h3>
                                                                                ${comment.answerContent.creator.role === "ADMIN" ?
                                `
                                                                                <svg class="w-4 h-4 text-teal-700">
                                                                                    <use xlink:href="#check-badge"></use>
                                                                                </svg>
                                                                                `: ""}
                                                                            </div>
                                                                            <span class="text-xs text-gray-500 sm:text-sm">${comment.answerContent.createdAt.slice(0, 10)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p
                                                                    class="overflow-hidden text-ellipsis text-sm text-gray-500 md:text-base">${comment.answerContent.body}</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                `: ""}
                                            </li>
                    `)
                });
            } else {
                coursesCommentsWrapper.insertAdjacentHTML("beforeend",
                    `
                    <div class="flex-center flex-col gap-5 text-slate-500 text-center border-t-2 w-full pt-4">
                        <svg class="w-7 h-7">
                            <use xlink:href="#no-symbol"></use>
                        </svg>
                        <span>دیدگاه‌ای یافت نشد !</span>
                    </div>
                `
                )
            }

        });
};

const getArticleDetails = () => {

    // Select Dom Elements
    const $ = document;
    const title = $.querySelector('#title');
    const date = $.querySelector('#date');
    const cover = $.querySelector('#cover');
    const articleWrapper = $.querySelector('#article-wrapper');
    const breadcrumbCategory = $.querySelector('#breadcrumb-category');
    const creator = $.querySelector('#creator');
    const creatorCover = $.querySelector('#creator-cover');
    const fullPageButton = $.querySelector('#full-page');
    const aside = $.querySelector('.aside');
    const closeFullPageButton = $.querySelector('#close-full-page');

    const articleShortName = getUrlParam("name");

    fetch(`http://localhost:4000/v1/articles/${articleShortName}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(res => res.json())
        .then(article => {
            console.log(article);
            title.innerHTML = article.title
            date.innerHTML = new Date(article.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)
            creator.innerHTML = article.creator.name
            creatorCover.setAttribute("src", `http://localhost:4000/${article.creator.profile}`)
            cover.setAttribute("src", `http://localhost:4000/courses/covers/${article.cover}`)
            articleWrapper.insertAdjacentHTML("beforeend", `${article.body}`)
            breadcrumbCategory.innerHTML = article.title
        });

    fullPageButton.addEventListener("click", () => {
        articleWrapper.classList.add('!col-span-4');
        aside.classList.add('!hide');
        closeFullPageButton.classList.add('!top-11')
    });
    closeFullPageButton.addEventListener("click", () => {
        articleWrapper.classList.remove('!col-span-4');
        aside.classList.remove('!hide');
        closeFullPageButton.classList.remove('!top-11')
    })
};

const getSessionDetails = async () => {

    const videoElem = document.querySelector('video')

    const courseShortName = getUrlParam("name");
    const sessionID = getUrlParam("id");

    const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    const data = await res.json()

    videoElem.setAttribute("src", `http://localhost:4000/courses/covers/${data.session.video}`)
};

const submitContactUsMassage = async () => {
    const nameInputElem = document.querySelector('#name');
    const emailInputElem = document.querySelector('#email');
    const phoneInputElem = document.querySelector('#phone-number');
    const bodyInputElem = document.querySelector('#body');

    const newMassage = {
        name: nameInputElem.value.trim(),
        email: emailInputElem.value.trim(),
        phone: phoneInputElem.value.trim(),
        body: bodyInputElem.value.trim()
    };

    const res = await fetch(`http://localhost:4000/v1/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMassage),
    });

    const result = await res.json()

    if (res.status === 201) {
        Toast.fire({
            icon: "success",
            title: "  نظر شما با موفقیت ثبت شد",
        });
        setTimeout(function () {
            location.href = "index.html"
        }, 3000);
    } else if (res.status === 400) {
        Toast.fire({
            icon: "error",
            title: "لطفا همه ی فیلد هارو کامل کنید"
        });
    }
};

const globalSearch = async () => {
    const searchValue = getUrlParam('value');

    const res = await fetch(`http://localhost:4000/v1/search/${searchValue}`);
    const result = await res.json();

    return result
};

const submitComments = async () => {
    const commentTextAreaElem = document.querySelector('#comments-body')

    let courseShortName = getUrlParam("name");

    const newCommentInfos = {
        body: commentTextAreaElem.value.trim(),
        courseShortName,
        score: 5
    };

    const res = await fetch(`http://localhost:4000/v1/comments`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCommentInfos)
    });
};

export { showUserNameInNavbar, headerResponsive, getAndShowAllCourses, getAndShowPreSellCourses, getAndShowArticles, getAndShowMenus, getAndShowCategoryCourses, insertCourseBoxHtmlTemplate, insertArticleBoxHtmlTemplate, coursesSorting, observerScroll, handleGroupingAndSortingBox, getCourseDetails, getSessionDetails, submitContactUsMassage, globalSearch, submitComments, showContentData, getAndShowAllArticles, getArticleDetails };