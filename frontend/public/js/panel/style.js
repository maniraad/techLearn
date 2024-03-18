import { getAdminInfos } from "./func/util.js";

window.addEventListener('load', () => {

    // Select Element From Dom
    const profileMenu = document.querySelector('.profile-menu');
    const profile = document.querySelector('.profile');
    const profileIconArrow = document.querySelector('.profile-icon');
    const asideElem = document.querySelector('aside');
    const mainElem = document.querySelector('main');
    const menuButton = document.querySelector('.menu-btn');
    const $ = document;
    const adminNameElem = $.querySelector('.admin-name');
    const adminWelcomeElem = $.querySelector('.admin-welcome-name');

    // Handle Profile Toggle
    profile.addEventListener('click', () => {
        profileMenu.classList.toggle('profile-menu--show');
        profileIconArrow.classList.toggle('rotate-180')
    });

    // Handle Menu Button
    menuButton.addEventListener('click', () => {
        asideElem.classList.toggle('!-right-64');
        mainElem.classList.toggle('!mr-0');
    });

    // Admin Info
    getAdminInfos().then(admin => {
        console.log(admin);
        adminNameElem.innerHTML = admin.name
        adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`
    });
});