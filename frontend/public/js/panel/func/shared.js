import { Toast, getToken } from "../../funcs/utils.js";

let categoryID = -1;
let courseID = -1;
let courseDiscountID = -1;
let parentMenuID = undefined;
let status = "start";
let isFree = "1";
let courseCover = null;
let videoSession = null;
let articleBodyEditor = null;
let articleCategoryID = -1;
let articleCover = null;

const insertNotificationHTMLTemplate = (notifications) => {
  const notificationsWrapperElem = document.querySelector(
    ".notifications-wrapper"
  );
  const notificationHeaderElem = document.querySelector(".notification-header");
  const notificationIconElem = document.querySelector(".notification-icon");

  notificationsWrapperElem.innerHTML = "";

  if (notifications.length) {
    notificationIconElem.insertAdjacentHTML(
      "beforeend",
      `<span class="notification-alarm inline-block absolute -top-0.5 -left-0.5 bg-red-500 w-2 h-2 rounded-full"></span>`
    );


    notifications.forEach((notification, index) => {
      notificationHeaderElem.innerHTML = `شما ${index + 1} اعلان جدید دارید.`;
      notificationsWrapperElem.insertAdjacentHTML(
        "beforeend",
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
                    <svg onclick='seenNotification(${JSON.stringify(
          notifications
        )}, ${JSON.stringify(
          notification._id
        )})' class="w-5 h-5 cursor-pointer hover:text-red-500 transition-all">
                        <use xlink:href="#x-circle"></use>
                    </svg>
                </li>
                `
      );
    });
  } else {
    notificationHeaderElem.innerHTML = "اعلانی وجود ندارد";
  }
};

const seenNotification = async (notifications, notificationID) => {
  const res = await fetch(
    `http://localhost:4000/v1/notifications/see/${notificationID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  removeNotification(notifications, notificationID);

  const result = await res.json();
};

const removeNotification = (notifications, notificationID) => {
  const filteredNotifications = notifications.filter(
    (notification) => notification._id !== notificationID
  );

  insertNotificationHTMLTemplate(filteredNotifications);
};

// Functions For Courses

const getAllCourses = async () => {
  const coursesWrapper = document.querySelector("#courses-wrapper");
  coursesWrapper.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courses = await res.json();

  courses.forEach((course, index) => {
    coursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
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
                                 ${course.price === 0
        ? "رایگان"
        : course.price.toLocaleString() +
        ` <span class="text-base">تومان</span>`
      }
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.registers}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.categoryID.title}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                    ${course.isComplete === 0
        ? "درحال برگذاری"
        : "تکمیل شده"
      }
                                 </td>
                                 <td class="px-6 py-4">
                                 <button onclick="removeCourse('${course._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
                                 </td>
                             </tr>`
    );
  });
};

const prepareCreateCourseForm = async () => {
  const categoryListElem = document.querySelector(".category-list");
  const startCourseElem = document.querySelector("#start");
  const presellCourseElem = document.querySelector("#presell");
  const coverCourseElem = document.querySelector(".cover");

  const res = await fetch(`http://localhost:4000/v1/category`);

  const categories = await res.json();

  categories.forEach((category) =>
    categoryListElem.insertAdjacentHTML(
      "beforeend",
      `<option value="${category._id}" class="text-gray-700">${category.title}</option>`
    )
  );

  categoryListElem.addEventListener(
    "change",
    (event) => (categoryID = event.target.value)
  );
  startCourseElem.addEventListener(
    "change",
    (event) => (status = event.target.value)
  );
  presellCourseElem.addEventListener(
    "change",
    (event) => (status = event.target.value)
  );
  coverCourseElem.addEventListener(
    "change",
    (event) => (courseCover = event.target.files[0])
  );
};

const createNewCourse = async () => {
  const courseNameElem = document.querySelector("#course-name");
  const coursePriceElem = document.querySelector("#course-price");
  const courseShortnameElem = document.querySelector("#course-shortname");
  const courseDescriptionElem = document.querySelector("#course-description");

  const formData = new FormData();
  formData.append("name", courseNameElem.value.trim());
  formData.append("price", Number(coursePriceElem.value.trim()));
  formData.append("description", courseDescriptionElem.value.trim());
  formData.append("shortName", courseShortnameElem.value.trim());
  formData.append("categoryID", categoryID);
  formData.append("status", status);
  formData.append("cover", courseCover);

  const res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " دوره با موفقیت اضافه شد ",
    });

    getAllCourses();
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !",
    });
  }
};

const removeCourse = async (courseID) => {
  Swal.fire({
    text: "آیا از حذف دوره مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:4000/v1/courses/${courseID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllCourses();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

// Functions For Menus

const getAllMenus = async () => {
  const menusWrapper = document.querySelector("#menus-wrapper");
  menusWrapper.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/menus/all`);
  const menus = await res.json();

  menus.forEach((menu, index) => {
    menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
                <tr class="bg-white border-b hover:bg-gray-50">
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
                       ${menu.title}
                    </td>
                    <td class="px-6 py-4 text-nowrap">
                        ${menu.href}
                    </td>
                    <td class="px-6 py-4 text-nowrap">
                         ${menu.parent ? menu.parent.title : "___"}
                    </td>
                    <td class="px-6 py-4">
                    <button onclick="removeMenuItem('${menu._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
                    </td>
                </tr>`
    );
  });
};

const prepareCreateMenuItem = async () => {
  const menuItemListElem = document.querySelector(".menu-item-list");

  const res = await fetch(`http://localhost:4000/v1/menus`);
  const menuItems = await res.json();

  menuItems.forEach((menuItemList) =>
    menuItemListElem.insertAdjacentHTML(
      "beforeend",
      `<option value="${menuItemList._id}" class="text-gray-700">${menuItemList.title}</option>`
    )
  );

  menuItemListElem.addEventListener(
    "change",
    (event) => (parentMenuID = event.target.value)
  );
};

const createNewMenuItem = async () => {
  const titleInputElem = document.querySelector("#title");
  const hrefInputElem = document.querySelector("#href");

  console.log(titleInputElem.value.trim());
  console.log(hrefInputElem.value.trim());

  const newMenusInfos = {
    title: titleInputElem.value.trim(),
    href: hrefInputElem.value.trim(),
    parent: parentMenuID,
  };

  const res = await fetch(`http://localhost:4000/v1/menus`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMenusInfos),
  });

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " ایتم با موفقیت اضافه شد ",
    });

    getAllMenus();
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !",
    });
  }
};

const removeMenuItem = async (menuID) => {
  Swal.fire({
    text: "آیا از حذف منو مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllMenus();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

// Functions For Users

const getAllUsers = async () => {
  const usersWrapper = document.querySelector("#users-wrapper");
  usersWrapper.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const users = await res.json();

  users.forEach((user, index) => {
    usersWrapper.insertAdjacentHTML(
      "beforeend",
      `
            <tr class="bg-white border-b hover:bg-gray-50">
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
                    ${user.name}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${user.username}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${user.phone}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${user.email}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${user.role}
                </td>
                <td class="px-6 py-4 text-nowrap">
                <button onclick="changeRole('${user._id}')" type="button" class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">تغییر نقش			</button>
                </td>
                <td class="px-6 py-4 text-nowrap">
                <button onclick="editUser('${user._id}')" type="button" class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">ویرایش	</button>
                </td>
                <td class="px-6 py-4">
                <button onclick="removeUser('${user._id}')" type="button" class="focus:outline-none text-xs text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 py-2 me-2 mb-2">حذف</button>
                </td>
                <td class="px-6 py-4 text-nowrap">
                <button onclick="banUser('${user._id}')" type="button" class="focus:outline-none text-gray-900 bg-white border border-blue-500  font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">بن</button>
                </td>
            </tr>`
    );
  });
};

const getRecentlyUser = async () => {
  const usersWrapper = document.querySelector("tbody");
  usersWrapper.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/infos/p-admin`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const users = await res.json();

  users.lastUsers.forEach((user, index) => {
    usersWrapper.insertAdjacentHTML("beforeend", `
                            <tr class="bg-white border-b odd:bg-white  even:bg-gray-100">
                                <th scope="row"
                                    class="px-6 py-4 font-EstedadMedium text-gray-900 whitespace-nowrap text-xs text-nowrap sm:text-sm md:text-base">
                                    ${index + 1}
                                </th>
                                <td class="px-6 py-4 text-xs text-nowrap sm:text-sm md:text-base">
                                    ${user.name}
                                </td>
                                <td class="px-6 py-4 text-xs text-nowrap sm:text-sm md:text-base">
                                    ${user.username}
                                </td>
                                <td class="px-6 py-4 text-xs text-nowrap sm:text-sm md:text-base">
                                    ${user.phone}
                                </td>
                                <td class="px-6 py-4 text-xs text-nowrap sm:text-sm md:text-base">
                                    ${user.email}
                                </td>
                                <td class="px-6 py-4 text-xs text-nowrap sm:text-sm md:text-base">
                                    ${new Date(user.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}
                                </td>
                            </tr>`)
  })
};

const createNewUser = async () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone-number");
  const passwordInput = document.querySelector("#password");

  const newUserInfo = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };

  fetch(`http://localhost:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo),
  })
    .then((res) => {
      if (res.status === 201) {
        Toast.fire({
          icon: "success",
          title: "ثبت نام با موفقیت انجام شد",
        });
      } else if (res.status === 409) {
        Toast.fire({
          icon: "error",
          title: "نام کاربری یا ایمیل قبلا استفاده شده",
        });
      } else if (res.status === 403) {
        Toast.fire({
          icon: "error",
          title: "این شماره بن شده است!",
        });
      }

      return res.json();
    })
    .then(() => {
      getAllUsers();
    });
};

const removeUser = async (userID) => {
  Swal.fire({
    text: "آیا از حذف کاربر مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllUsers();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

const banUser = async (userID) => {
  Swal.fire({
    text: "آیا از بن کاربر مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        if (result.isConfirmed) {
          const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
        }
        Toast.fire({
          icon: "success",
          title: " بن با موفقیت انجام شد",
        });
        getAllUsers();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

const changeRole = async (userID) => {
  const inputOptions = await new Promise((resolve) => {
    resolve({
      "USER": "USER",
      "ADMIN": "ADMIN"
    });
  });
  const { value: role } = await Swal.fire({
    title: "Select color",
    input: "radio",
    inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return "You need to choose something!";
      }
    }
  });
  console.log(userID);
  const userNewRoleInfo = {
    id: userID,
    role: role,
  }
  console.log(userNewRoleInfo);
  const res = await fetch(`http://localhost:4000/v1/users/role`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userNewRoleInfo)
  })
  const result = await res.json()
  console.log(res);
  console.log(result);
};

const editUser = async (userID) => {

  let editUserInfos = {}

  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html: `
    <input id="swal-input1" class="swal2-input" placeholder="username" type="text">
    <input id="swal-input2" class="swal2-input" placeholder="name" type="text">
    <input id="swal-input3" class="swal2-input" placeholder="email" type="email">
    <input id="swal-input4" class="swal2-input" placeholder="password" type="password">
    <input id="swal-input5" class="swal2-input" placeholder="phone" type="text">
  `,
    focusConfirm: false,
    preConfirm: () => {
      const username = document.getElementById("swal-input1").value
      const name = document.getElementById("swal-input2").value
      const email = document.getElementById("swal-input3").value
      const password = document.getElementById("swal-input4").value
      const phone = document.getElementById("swal-input5").value

      editUserInfos = {
        username,
        name,
        email,
        password,
        phone
      }
      return editUserInfos
    }
  });

  const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editUserInfos)
  })

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " کاربر با موفقیت اپدیت شد ",
    });
    getAllUsers();
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !",
    });
  }
};

// Functions For Category

const getAllCategories = async () => {
  const categoriesWrapper = document.querySelector("#categories-wrapper");
  categoriesWrapper.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/category`);
  const categories = await res.json();

  categories.forEach((category, index) => {
    categoriesWrapper.insertAdjacentHTML(
      "beforeend",
      `
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
                                     ${category.title}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${category.name}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                 <button type="button" class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">ویرایش	</button>
                                 </td>
                                 <td class="px-6 py-4">
                                 <button onclick="removeCategory('${category._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
                                 </td>
                             </tr>`
    );
  });
};

const createNewCategory = async () => {
  const titleInputElem = document.querySelector("#title");
  const destinationInputElem = document.querySelector("#destination");

  const newCategoryInfos = {
    title: titleInputElem.value.trim(),
    name: destinationInputElem.value.trim(),
  };

  const res = await fetch(`http://localhost:4000/v1/category`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategoryInfos),
  });

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " ایتم با موفقیت اضافه شد ",
    });

    getAllCategories();
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !",
    });
  }
};

const removeCategory = async (categoryID) => {
  Swal.fire({
    text: "آیا از حذف دوره مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(
        `http://localhost:4000/v1/category/${categoryID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllCategories();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

// Functions For Message

const getAllMessages = async () => {
  const messageWrapperElem = document.querySelector("#message-wrapper");
  messageWrapperElem.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/contact`);
  const messages = await res.json();

  messages.forEach((message, index) => {
    messageWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <svg class="w-5 md:w-6 h-5 md:h-6">
                            <use xlink:href="${message.answer === 1 ? "#check" : "#x-circle"
      }"></use>
                        </svg> 
                    </div>
                </td>
                <th scope="row"
                    class="px-6 py-4 text-nowrap font-medium text-gray-900 whitespace-nowrap">
                    ${index + 1}
                </th>
                <td class="px-6 py-4 text-nowrap">
                    ${message.name}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${message.email}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${message.phone}
                </td>
                <td class="px-6 py-4 text-nowrap">
                ${new Date(message.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}	
                </td>
                <td class="px-6 py-4 text-nowrap">
                <button onclick="showContentBody('${message.body}')" type="button" class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">مشاهده	</button>
                </td>
                <td class="px-6 py-4 text-nowrap">
                <button onclick="answerToContact('${message.email}')" type="button" class="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">پاسخ		</button>
                </td>
                <td class="px-6 py-4">
                <button onclick="removeMessage('${message._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
                </td>
            </tr>`
    );
  });
};

const showContentBody = async (messageBody) => {
  Swal.fire({
    text: messageBody,
    confirmButtonColor: "#0d9488",
    confirmButtonText: "مشاهده",
  });
};

const answerToContact = async (userEmail) => {
  Swal.fire({
    input: "textarea",
    inputLabel: "ارسال پاسخ",
    confirmButtonColor: "#0d9488",
    confirmButtonText: "ارسال پاسخ",
    cancelButtonColor: "#ef4444",
    cancelButtonText: "لغو",
    showCancelButton: true,
  }).then(async (result) => {
    if (result.value) {
      const answerContentInfos = {
        email: userEmail,
        answer: result.value,
      };

      const res = await fetch(`http://localhost:4000/v1/contact/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerContentInfos),
      });
      const answerResult = await res.json();

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " پاسخ با موفقیت ارسال شد",
        });
        getAllMessages();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

const removeMessage = async (messageID) => {
  Swal.fire({
    text: "آیا از حذف پیفام مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:4000/v1/contact/${messageID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllMessages();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

// Functions For Session

const getAllSessions = async () => {
  const sessionsWrapperElem = document.querySelector("#sessions-wrapper");
  sessionsWrapperElem.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/courses/sessions`);
  const sessions = await res.json();

  sessions.forEach((session, index) => {
    sessionsWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr class="bg-white border-b hover:bg-gray-50">
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
                    ${session.title}
                </td>
                <td class="px-6 py-4 text-nowrap">
                ${new Date(session.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}	
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${session.time}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${session.course.name}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${session.free === 1 ? "رایگان" : "غیر رایگان"}
                </td>
                <td class="px-6 py-4">
                <button onclick="removeSession('${session._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
                </td>
            </tr>`
    );
  });
};

const prepareCreateSessionForm = async () => {
  const courseListElem = document.querySelector(".course-list");
  const freeSessionElem = document.querySelector("#free");
  const moneySessionElem = document.querySelector("#money");
  const videoSessionElem = document.querySelector(".video");

  const res = await fetch(`http://localhost:4000/v1/courses`);

  const courses = await res.json();

  courses.forEach((course) =>
    courseListElem.insertAdjacentHTML(
      "beforeend",
      `<option value="${course._id}" class="text-gray-700">${course.name}</option>`
    )
  );

  courseListElem.addEventListener(
    "change",
    (event) => (courseID = event.target.value)
  );
  freeSessionElem.addEventListener(
    "change",
    (event) => (isFree = event.target.value)
  );
  moneySessionElem.addEventListener(
    "change",
    (event) => (isFree = event.target.value)
  );
  videoSessionElem.addEventListener(
    "change",
    (event) => (videoSession = event.target.files[0])
  );
};

const createNewSession = async () => {
  const sessionNameElem = document.querySelector("#title");
  const sessionTimeElem = document.querySelector("#time");

  const formData = new FormData();
  formData.append("video", videoSession);
  formData.append("title", sessionNameElem.value.trim());
  formData.append("time", Number(sessionTimeElem.value.trim()));
  formData.append("free", isFree);

  const res = await fetch(
    `http://localhost:4000/v1/courses/${courseID}/sessions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    }
  );

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " جلسه با موفقیت اضافه شد ",
    });

    getAllSessions();
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !",
    });
  }
};

const removeSession = async (sessionID) => {
  Swal.fire({
    text: "آیا از حذف جلسه مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(
        `http://localhost:4000/v1/courses/sessions/${sessionID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllSessions();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

// Functions For Article

const getAllArticles = async () => {
  const articleWrapperElem = document.querySelector("#article-wrapper");
  articleWrapperElem.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/articles`);
  const articles = await res.json();

  articles.forEach((article, index) => {
    articleWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer">
                        <label for="checkbox-table-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 text-nowrap font-medium text-gray-900 whitespace-nowrap">
                    ${index + 1}
                </th>
                <td class="px-6 py-4 text-nowrap">
                    ${article.title}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    جامعه شناسی	
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${article.publish === 1 ? "منتشر شده" : "پیش نویس"}
                </td>
                <td class="px-6 py-4 text-nowrap">
                ${new Date(article.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}	
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${article.creator.name}		
                </td>
                <td class="px-6 py-4">
                <button onclick="removeArticle('${article._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
                </td>
            </tr>`
    );
  });
};

const prepareCreateArticleForm = async () => {

  // Handle Article Body CKEditor
  ClassicEditor.create(document.querySelector("#editor"), {
    language: "fa",
  })
    .then((editor) => {
      articleBodyEditor = editor;
    })
    .catch((error) => {
      console.error(error);
    });

  // Handle CategoryID

  const articleCategoryListElem = document.querySelector(
    ".article-category-list"
  );
  const coverarticleElem = document.querySelector(".cover");

  const res = await fetch(`http://localhost:4000/v1/category`);

  const categories = await res.json();

  categories.forEach((category) =>
    articleCategoryListElem.insertAdjacentHTML(
      "beforeend",
      `<option value="${category._id}" class="text-gray-700">${category.title}</option>`
    )
  );

  articleCategoryListElem.addEventListener(
    "change",
    (event) => (articleCategoryID = event.target.value)
  );
  coverarticleElem.addEventListener(
    "change",
    (event) => (articleCover = event.target.files[0])
  );
};

const createNewArticle = async () => {

  const articleNameElem = document.querySelector('#article-name');
  const articleDescriptionElem = document.querySelector('#article-description');
  const articleShortnameElem = document.querySelector('#article-shortname');

  const formData = new FormData();
  formData.append('title', articleNameElem.value.trim());
  formData.append('description', articleDescriptionElem.value.trim());
  formData.append('shortName', articleShortnameElem.value.trim());
  formData.append('body', articleBodyEditor.getData());
  formData.append('categoryID', articleCategoryID);
  formData.append('cover', articleCover);

  const res = await fetch(`http://localhost:4000/v1/articles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  })

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " مقاله با موفقیت اضافه شد ",
    });

    getAllArticles()
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !"
    });
  }
};

const removeArticle = async (articleID) => {
  Swal.fire({
    text: "آیا از حذف مقاله مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله"
  }).then(async (result) => {
    if (result.isConfirmed) {

      const res = await fetch(`http://localhost:4000/v1/articles/${articleID}`, {
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

        getAllArticles()
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

// Functions For Comments
const getAllComments = async () => {
  const commentsWrapperElem = document.querySelector("#comments-wrapper");
  commentsWrapperElem.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/comments`);
  const articles = await res.json();

  articles.forEach((comment, index) => {
    commentsWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
          <tr class="bg-white border-b hover:bg-gray-50">
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
                ${comment.creator.name}   
            </td>
            <td class="px-6 py-4 text-nowrap">
                ${comment.creator.email}
            </td>
            <td class="px-6 py-4 text-nowrap">
                ${comment.course}
            </td>
            <td class="px-6 py-4 text-nowrap">
            ${new Date(comment.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}	
            </td>
            <td class="px-6 py-4 text-nowrap">
                <button onclick="showCommentBody('${comment.body}')" type="button" class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">مشاهده	</button>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <button onclick="answerComment('${comment._id}')" type="button" class="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">پاسخ		</button>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <button onclick="acceptComment('${comment._id}')" type="button" class="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">تایید</button>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <button onclick="rejectComment('${comment._id}')" type="button" class="focus:outline-none text-gray-900 bg-white border border-blue-500  font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">رد</button>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <button onclick="removeComment('${comment._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
            </td>
          </tr>`
    );
  });
};

const showCommentBody = async (commentBody) => {
  Swal.fire({
    text: commentBody,
    confirmButtonColor: "#0d9488",
    confirmButtonText: "مشاهده",
  });
};

const answerComment = async (commentID) => {
  Swal.fire({
    input: "textarea",
    inputLabel: "ارسال پاسخ",
    confirmButtonColor: "#0d9488",
    confirmButtonText: "ارسال پاسخ",
    cancelButtonColor: "#ef4444",
    cancelButtonText: "لغو",
    showCancelButton: true,
  }).then(async (result) => {
    if (result.value) {
      const answerCommentInfos = {
        body: result.value,
      };

      const res = await fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerCommentInfos),
      });
      const answerResult = await res.json();
      console.log(res);
      console.log(answerResult);
      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " پاسخ با موفقیت ارسال شد",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

const acceptComment = async (commentID) => {
  Swal.fire({
    text: "آیا از تایید کامنت مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله"
  }).then(async (result) => {
    if (result.isConfirmed) {

      const res = await fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " کامنت مورد نظر با موفقیت تایید شد!",
        });

        getAllComments()
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

const rejectComment = async (commentID) => {
  Swal.fire({
    text: "آیا از رد کامنت مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله"
  }).then(async (result) => {
    if (result.isConfirmed) {

      const res = await fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " کامنت مورد نظر با موفقیت رد شد!",
        });

        getAllComments()
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

const removeComment = async (commentID) => {
  Swal.fire({
    text: "آیا از حذف کامنت مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله"
  }).then(async (result) => {
    if (result.isConfirmed) {

      const res = await fetch(`http://localhost:4000/v1/comments/${commentID}`, {
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

        getAllComments()
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

// Functions For Discount
const getAllDiscount = async () => {
  const discountWrapperElem = document.querySelector("#discount-wrapper");
  discountWrapperElem.innerHTML = "";
  const res = await fetch(`http://localhost:4000/v1/offs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  const discounts = await res.json();

  discounts.forEach((discount, index) => {
    discountWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
          <tr class="bg-white border-b hover:bg-gray-50">
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
                ${discount.code}   
            </td>
            <td class="px-6 py-4 text-nowrap">
                ${discount.creator}
            </td>
            <td class="px-6 py-4 text-nowrap">
                ${discount.percent}
            </td>
            <td class="px-6 py-4 text-nowrap">
                ${discount.max}
            </td>
            <td class="px-6 py-4 text-nowrap">
                ${discount.uses}
            </td>
            <td class="px-6 py-4 text-nowrap">
            ${new Date(discount.createdAt).toLocaleString("fa-IR").slice(0, 10).split(",", 1)}	
            </td>
            <td class="px-6 py-4 text-nowrap">
            <button onclick="removeDiscount('${discount._id}')" type="button" class="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2">حذف</button>
            </td>
          </tr>`
    );
  });
};

const prepareCreateDiscountForm = async () => {
  const courseListElem = document.querySelector(".course-item-list");

  const res = await fetch(`http://localhost:4000/v1/courses`);

  const courses = await res.json();
  courses.forEach((course) => courseListElem.insertAdjacentHTML("beforeend", `<option value="${course._id}" class="text-gray-700">${course.name}</option>`));

  courseListElem.addEventListener("change", event => (courseDiscountID = event.target.value));
};

const createNewDiscount = async () => {
  const codeInputElem = document.querySelector("#code");
  const percentInputElem = document.querySelector("#percent");
  const maxInputElem = document.querySelector("#max");

  const newoffsInfos = {
    code: codeInputElem.value.trim(),
    percent: percentInputElem.value.trim(),
    max: maxInputElem.value.trim(),
    course: courseDiscountID,
  };

  const res = await fetch(`http://localhost:4000/v1/offs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newoffsInfos),
  });

  if (res.ok) {
    Toast.fire({
      icon: "success",
      title: " ایتم با موفقیت اضافه شد ",
    });

    getAllDiscount();
  } else {
    Toast.fire({
      icon: "error",
      title: "مشکلی رخ داده است",
      text: "لطفا بعدا امتحان کنید !",
    });
  }
};

const removeDiscount = async (discountID) => {
  Swal.fire({
    text: "آیا از حذف کد تخفیف مورد نظر اطمینان دارید؟",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "خیر",
    confirmButtonText: "بله",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:4000/v1/offs/${discountID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: " حذف با موفقیت انجام شد",
        });

        getAllDiscount();
      } else {
        Toast.fire({
          icon: "error",
          title: "مشکلی رخ داده است",
          text: "لطفا بعدا امتحان کنید !",
        });
      }
    }
  });
};

// Export All Functions
export {
  insertNotificationHTMLTemplate,
  seenNotification,

  // Export Functions Courses
  getAllCourses,
  prepareCreateCourseForm,
  createNewCourse,
  removeCourse,

  // Export Functions Menus
  getAllMenus,
  prepareCreateMenuItem,
  createNewMenuItem,
  removeMenuItem,

  // Export Functions Users
  getAllUsers,
  getRecentlyUser,
  createNewUser,
  removeUser,
  banUser,
  changeRole,
  editUser,

  // Export Functions Category
  getAllCategories,
  createNewCategory,
  removeCategory,

  // Export Functions Message
  getAllMessages,
  showContentBody,
  answerToContact,
  removeMessage,

  // Export Functions Session
  getAllSessions,
  prepareCreateSessionForm,
  createNewSession,
  removeSession,

  // Export Functions Article
  getAllArticles,
  prepareCreateArticleForm,
  createNewArticle,
  removeArticle,

  // Export Functions Comments
  getAllComments,
  removeComment,
  acceptComment,
  rejectComment,
  showCommentBody,
  answerComment,

  // Export Functions Comments
  getAllDiscount,
  prepareCreateDiscountForm,
  createNewDiscount,
  removeDiscount,
};
