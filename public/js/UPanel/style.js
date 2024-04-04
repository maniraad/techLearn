import { logout } from "./func/utils.js";
// import { insertNotificationHTMLTemplate, seenNotification } from "./func/shared.js";

window.addEventListener('load', () => {
    // Select Element From Dom
    const $ = document;
    const asideElem = $.querySelector('aside');
    const mainElem = $.querySelector('main');
    const menuButton = $.querySelector('.menu-btn');
    const logoutBtnElems = $.querySelectorAll('.logout-btn');

    // Handle Menu Button
    menuButton.addEventListener('click', () => {
        asideElem.classList.toggle('!-right-0');
        mainElem.classList.toggle('md:!mr-64');
    });

    // Handle Logout User
    logoutBtnElems.forEach(logoutBtnElem => {
        logoutBtnElem.addEventListener("click", () => {
            logout();
        });
    });

});
