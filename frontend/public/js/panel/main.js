import { getAdminInfos } from "./func/utils.js";
import { getRecentlyUser } from "./func/shared.js";
    
window.addEventListener('load', () => {
    // Select Element From Dom
    const adminWelcomeElem = document.querySelector('.admin-welcome-name');
    getRecentlyUser()
    // Admin Info
    getAdminInfos().then(admin => {
        // Show Admin Name
        adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`

    });
});