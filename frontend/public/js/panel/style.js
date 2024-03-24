import { getAdminInfos, logout } from "./func/utils.js";
import { insertNotificationHTMLTemplate, seenNotification } from "./func/shared.js";

window.seenNotification = seenNotification
window.addEventListener('load', () => {
    // Select Element From Dom
    const $ = document;
    const profileMenuElem = $.querySelector('.profile-menu');
    const notificationMenuElem = $.querySelector('.notification-menu');
    const notificationIconElem = $.querySelector('.notification-icon');
    const profileElem = $.querySelector('.profile');
    const profileIconArrowElem = $.querySelector('.profile-icon');
    const asideElem = $.querySelector('aside');
    const mainElem = $.querySelector('main');
    const menuButton = $.querySelector('.menu-btn');
    const adminNameElems = $.querySelectorAll('.admin-name');
    const adminImageElem = $.querySelector('.admin-img');
    const adminEmailElem = $.querySelector('.admin-email');
    const logoutBtnElem = $.querySelector('#logout-btn');
    getAdminInfos().catch(res => {
        if (!res) {
            location.replace("../login.html");
        }
    })
    // Protect Cms Route
    getAdminInfos().then(admin => {
        // Show Admin Name
        adminNameElems.forEach(adminNameElem => {
            adminNameElem.innerHTML = admin.name
        })
        adminEmailElem.innerHTML = admin.email
        adminImageElem.setAttribute('src', `http://localhost:4000/${admin.profile}`)

        // Show Notifications
        insertNotificationHTMLTemplate(admin.notifications)

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
            asideElem.classList.toggle('!-right-0');
            mainElem.classList.toggle('md:!mr-64');
        });

        // Handle Logout Admin
        logoutBtnElem.addEventListener("click", () => {
            logout()
        })
    });
    getAdminInfos().catch(() => location.replace("../login.html"));
});