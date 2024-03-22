import { getAdminInfos } from "./func/utils.js";
    
window.addEventListener('load', () => {
    // Select Element From Dom
    const adminWelcomeElem = document.querySelector('.admin-welcome-name');

    // Admin Info
    getAdminInfos().then(admin => {
        // Show Admin Name
        adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`

    });
});