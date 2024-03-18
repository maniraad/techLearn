import { getAdminInfos } from "./func/utils.js";
import { insertNotificationHTMLTemplate , seenNotification} from "./func/shared.js";

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
                asideElem.classList.toggle('!-right-64');
                mainElem.classList.toggle('!mr-0');
            });

        } else {
            location.replace("../login.html")
        }
    });
});