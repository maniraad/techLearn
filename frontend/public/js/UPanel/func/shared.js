import { Toast, getToken } from "../../funcs/utils.js";

const getAndShowUseCourse = async () => {

    const courseContainerElem = document.querySelector("#course-container");
    courseContainerElem.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/orders`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const userCourses = await res.json();

    userCourses.forEach((userCourse, index) => {
        courseContainerElem.insertAdjacentHTML("beforeend", `
            <tr class="bg-white border-b hover:bg-gray-50">
                <th scope="row"
                    class="px-6 py-4 text-nowrap font-medium text-gray-900 whitespace-nowrap">
                    ${index + 1}
                </th>
                <td class="px-6 py-4 text-nowrap underline hover:text-blue-500 cursor-pointer">
                    <a href="../course.html?name=${userCourse.course.shortName}">
                        ${userCourse.course.name}
                    </a>
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${userCourse.course.price === 0 ? "رایگان" : course.price.toLocaleString() + ` <span class="text-base">تومان</span>`}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${new Date(userCourse.course.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}	
                </td>
            </tr> `)
    });
};

const getAndShowUserInfos = async () => {
    const nameInput = document.querySelector('#nameInput');
    const userNameInput = document.querySelector('#userNameInput');
    const phoneInput = document.querySelector('#phoneInput');
    const emailInput = document.querySelector('#emailInput');
    const passwordInput = document.querySelector('#passwordInput');
    const showUserName = document.querySelector('.show-userName');

    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json()

    console.log(res);

    console.log(data);
    showUserName.innerHTML = data.username
    nameInput.value = data.name 
    userNameInput.value = data.username
    phoneInput.value = data.phone
    emailInput.value = data.email
};

export { getAndShowUseCourse, getAndShowUserInfos };