import { getAdminInfos } from "./func/util.js";

window.addEventListener('load', () => {
    // Select Element From Dom
    const $ = document;
    const profileMenuElem = $.querySelector('.profile-menu');
    const notificationMenuElem = $.querySelector('.notification-menu');
    const notificationIconElem = $.querySelector('.notification-icon');
    const notificationsWrapperElem = $.querySelector('.notifications-wrapper');
    const notificationHeaderElem = $.querySelector('.notification-header');
    const profileElem = $.querySelector('.profile');
    const profileIconArrowElem = $.querySelector('.profile-icon');
    const asideElem = $.querySelector('aside');
    const mainElem = $.querySelector('main');
    const menuButton = $.querySelector('.menu-btn');
    const adminNameElem = $.querySelector('.admin-name');
    const adminWelcomeElem = $.querySelector('.admin-welcome-name');
    const adminImageElem = $.querySelector('.admin-img');

    // Admin Info
    getAdminInfos().then(admin => {
        console.log(admin);
        // Protect Cms Route
        if (admin.role === "ADMIN") {

            // Show Admin Name
            adminNameElem.innerHTML = admin.name
            adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`
            adminImageElem.setAttribute('src', `http://localhost:4000/${admin.profile}`)

            if (admin.notifications.length) {
                notificationIconElem.insertAdjacentHTML("beforeend", `<span class="notification-alarm inline-block absolute -top-0.5 -left-0.5 bg-red-500 w-2 h-2 rounded-full"></span>`)
                admin.notifications.forEach((notification, index) => {
                    notificationHeaderElem.innerHTML = `شما ${index + 1} اعلان جدید دارید.`
                    notificationsWrapperElem.insertAdjacentHTML("beforeend",
                        ` <li
                            class="flex items-center justify-between px-4 py-3 border-t hover:bg-gray-100">
                            <a href="#" class="hover:text-blue-600 transition-all">
                                <p class="flex items-center gap-x-2.5 text-sm">
                                    <svg class="w-5 h-5">
                                        <use xlink:href="#information-circle"></use>
                                    </svg>
                                    <span>${notification.msg}</span>
                                </p>
                            </a>
                            <svg  class="w-5 h-5 cursor-pointer hover:text-red-500 transition-all">
                                <use xlink:href="#x-circle"></use>
                            </svg>
                        </li>
                        `)
                });
            }

            // Handle Profile Toggle
            profileElem.addEventListener('click', () => {
                profileMenuElem.classList.toggle('profile-menu--show');
                profileIconArrowElem.classList.toggle('rotate-180')
            });

            // Handle notification Toggle
            notificationIconElem.addEventListener('click', () => {
                notificationMenuElem.classList.toggle('profile-menu--show');
            });

            // Handle Menu Button
            menuButton.addEventListener('click', () => {
                asideElem.classList.toggle('!-right-64');
                mainElem.classList.toggle('!mr-0');
            });

        } else {
            location.replace("../login.html")
        }
    });
});