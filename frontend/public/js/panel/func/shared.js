import { Toast, getToken } from "../../funcs/utils.js";

let categoryID = -1;
let status = "start";
let courseCover = null;

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
    const coursesWrapper = document.querySelector('#courses-wrapper');
    coursesWrapper.innerHTML = ''
    const res = await fetch(`http://localhost:4000/v1/courses`);
    const courses = await res.json();

    courses.forEach((course, index) => {
        coursesWrapper.insertAdjacentHTML("beforeend", `
                             <tr
                                 class="bg-white border-b hover:bg-gray-50">
                                 <td class="w-4 p-4">
                                     <div class="flex items-center">
                                         <input id="checkbox-table-1" type="checkbox"
                                             class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer">
                                         <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                     </div>
                                 </td>
                                 <th scope="row"
                                     class="px-6 py-4 text-nowrap font-medium text-gray-900 whitespace-nowrap">
                                     ${index + 1}
                                 </th>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.name}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                 ${course.price === 0 ? "رایگان" : course.price.toLocaleString() + ` <span class="text-base">تومان</span>`}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.registers}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.categoryID.title}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                    ${course.isComplete === 0 ? "درحال برگذاری" : "تکمیل شده"}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     <a href="#"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                                 </td>
                                 <td class="px-6 py-4">
                                     <a href="#" onclick="removeCourse('${course._id}')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
                                 </td>
                             </tr>`)
    });

};

const prepareCreateCourseForm = async () => {
    const categoryListElem = document.querySelector('.category-list');
    const startCourseElem = document.querySelector('#start');
    const presellCourseElem = document.querySelector('#presell');
    const coverCourseElem = document.querySelector('.cover');

    const res = await fetch(`http://localhost:4000/v1/category`)

    const categories = await res.json()

    categories.forEach(category => categoryListElem.insertAdjacentHTML("beforeend", `<option value="${category._id}" class="text-gray-700">${category.title}</option>`));

    categoryListElem.addEventListener('change', event => categoryID = event.target.value);
    startCourseElem.addEventListener("change", event => status = event.target.value);
    presellCourseElem.addEventListener("change", event => status = event.target.value);
    coverCourseElem.addEventListener('change', event => (courseCover = event.target.files[0]))

};

const createNewCourse = async () => {
    const courseNameElem = document.querySelector('#course-name');
    const coursePriceElem = document.querySelector('#course-price');
    const courseShortnameElem = document.querySelector('#course-shortname');
    const courseDescriptionElem = document.querySelector('#course-description');

    const formData = new FormData();
    formData.append('name', courseNameElem.value.trim());
    formData.append('price', Number(coursePriceElem.value.trim()));
    formData.append('description', courseDescriptionElem.value.trim());
    formData.append('shortName', courseShortnameElem.value.trim());
    formData.append('categoryID', categoryID);
    formData.append('status', status);
    formData.append('cover', courseCover);

    const res = await fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData
    })

    if (res.ok) {
        Toast.fire({
            icon: "success",
            title: " دوره با موفقیت اضافه شد ",
        });

        getAllCourses()
        console.log(getAllCourses());
    } else {
        Toast.fire({
            icon: "error",
            title: "مشکلی رخ داده است",
            text: "لطفا بعدا امتحان کنید !"
        });
    }
};

const removeCourse = async (courseID) => {
    console.log(courseID);
    Swal.fire({
        text: "آیا از حذف دوره مورد نظر اطمینان دارید؟",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "خیر",
        confirmButtonText: "بله"
    }).then(async (result) => {
        if (result.isConfirmed) {

            const res = await fetch(`http://localhost:4000/v1/courses/${courseID}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })

            if (res.ok) {
                Toast.fire({
                    icon: "success",
                    title: " حذف با موفقیت انجام شد",
                });

                getAllCourses()
            } else {
                Toast.fire({
                    icon: "error",
                    title: "مشکلی رخ داده است",
                    text: "لطفا بعدا امتحان کنید !"
                });
            }
        }
    });
};

export { insertNotificationHTMLTemplate, seenNotification, getAllCourses, prepareCreateCourseForm, createNewCourse, removeCourse };