import { getToken } from "../../funcs/utils.js";

const insertNotificationHTMLTemplate = (notifications) => {

    const notificationsWrapperElem = document.querySelector('.notifications-wrapper');
    const notificationHeaderElem = document.querySelector('.notification-header');
    const notificationIconElem = document.querySelector('.notification-icon');

    notificationsWrapperElem.innerHTML = '';

    if (notifications.length) {
        notificationIconElem.insertAdjacentHTML("beforeend", `<span class="notification-alarm inline-block absolute -top-0.5 -left-0.5 bg-red-500 w-2 h-2 rounded-full"></span>`)

        notificationsWrapperElem.insertAdjacentHTML("afterend", `
        <div class="text-center border-t">
            <a href="#" class="block py-2.5 text-sm hover:text-blue-500 transition-all">مشاهده همه</a>
        </div>`)

        notifications.forEach((notification, index) => {
            notificationHeaderElem.innerHTML = `شما ${index + 1} اعلان جدید دارید.`
            notificationsWrapperElem.insertAdjacentHTML("beforeend",
                ` <li
                    class="flex items-center justify-between px-4 py-3.5 border-t hover:bg-gray-100">
                    <a href="#" class="hover:text-blue-600 transition-all">
                        <p class="flex items-center gap-x-2.5 text-sm">
                            <svg class="w-5 h-5">
                                <use xlink:href="#information-circle"></use>
                            </svg>
                            <span>${notification.msg}</span>
                        </p>
                    </a>
                    <svg onclick='seenNotification(${JSON.stringify(notifications)}, ${JSON.stringify(notification._id)})' class="w-5 h-5 cursor-pointer hover:text-red-500 transition-all">
                        <use xlink:href="#x-circle"></use>
                    </svg>
                </li>
                `)
        });
    } else {
        notificationHeaderElem.innerHTML = 'اعلانی وجود ندارد'
    }
};

const seenNotification = async (notifications, notificationID) => {

    const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })

    removeNotification(notifications, notificationID);

    const result = await res.json();
};

const removeNotification = (notifications, notificationID) => {
    const filteredNotifications = notifications.filter(notification => notification._id !== notificationID);

    insertNotificationHTMLTemplate(filteredNotifications);
};

const getAllCourses = async () => {
    const res = await fetch(`http://localhost:4000/v1/courses`)

    const courses = await res.json();

    return courses
};

export { insertNotificationHTMLTemplate, seenNotification, getAllCourses };