import { Toast, getToken } from "../../funcs/utils.js";

// Select Element From HTML
const nameInput = document.querySelector('#nameInput');
const userNameInput = document.querySelector('#userNameInput');
const phoneInput = document.querySelector('#phoneInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');

// Functions
const getAndShowUseCourse = async () => {

    const tableElem = document.querySelector("table");
    const courseContainerElem = document.querySelector("#course-container");
    courseContainerElem.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/users/courses`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const userCourses = await res.json();
    if (userCourses.length) {
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
    }else{
        tableElem.insertAdjacentHTML("afterend", `
        <div class="my-4 flex-center w-full flex-col gap-4 lg:my-7 lg:gap-7 grid-flow-col">
            <div class="text-xs sm:text-sm md:text-base  flex-center flex-col gap-1 md:gap-2 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                </svg>
                <span class="text-center">هنوز دوره ای خریداری نکردی!</span>
            </div>
            <a target="_blank" href="../courses">
                <button type="button" class=" text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-EstedadMedium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none" id="addUserBtn">
                        مشاهده دوره ها
                </button>
            </a>
        </div>
        `)
    }

};

const getAndShowUserInfos = async () => {
    const showUserName = document.querySelector('.show-userName');

    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json()

    console.log(data);
    showUserName.innerHTML = data.username
    nameInput.value = data.name
    userNameInput.value = data.username
    phoneInput.value = data.phone
    emailInput.value = data.email
};

const updateUserInfos = async () => {
    const userNewInfos = {
        name: nameInput.value.trim(),
        username: userNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
    };

    const res = await fetch(`http://localhost:4000/v1/users`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userNewInfos)
    });

    if (res.ok) {
        Toast.fire({
            icon: "success",
            title: " تغییرات با موفقیت انجام شد",
        });

        setInterval(() => {
            location.reload();
        }, 3000);
    } else {
        Toast.fire({
            icon: "error",
            title: "مشکلی رخ داده است",
            text: "لطفا بعدا امتحان کنید !",
        });
    }
};

export { getAndShowUseCourse, getAndShowUserInfos, updateUserInfos };