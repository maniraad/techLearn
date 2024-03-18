import { getAdminInfos } from "./func/util.js";

window.addEventListener('load', () => {
    // Select Element From Dom
    const $ = document;
    const profileMenu = $.querySelector('.profile-menu');
    const profile = $.querySelector('.profile');
    const profileIconArrow = $.querySelector('.profile-icon');
    const asideElem = $.querySelector('aside');
    const mainElem = $.querySelector('main');
    const menuButton = $.querySelector('.menu-btn');
    const adminNameElem = $.querySelector('.admin-name');
    const adminWelcomeElem = $.querySelector('.admin-welcome-name');
    const adminImageElem = $.querySelector('.admin-img');

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
        // Protect Cms Route
        if (admin.role === "ADMIN") {
            // Show Admin Name
            adminNameElem.innerHTML = admin.name
            adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`
            adminImageElem.setAttribute('src',`http://localhost:4000/${admin.profile}`)

        } else {
            location.replace("../login.html")
        }
    });
});