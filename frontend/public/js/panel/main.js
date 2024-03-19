import { getAdminInfos } from "./func/utils.js";
import { insertNotificationHTMLTemplate, seenNotification } from "./func/shared.js";

window.addEventListener('load', () => {
    // Select Element From Dom
    const $ = document;
    const adminWelcomeElem = $.querySelector('.admin-welcome-name');

    // Admin Info
    getAdminInfos().then(admin => {
        // Show Admin Name
        adminWelcomeElem.innerHTML = `خوش آمدید , ${admin.name}`

    });
});