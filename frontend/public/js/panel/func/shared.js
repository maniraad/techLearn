import { Toast, getToken } from "../../funcs/utils.js";

let categoryID = -1;
let courseID = -1;
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

    notificationsWrapperElem.insertAdjacentHTML(
      "afterend",
      `
        <div class="text-center border-t">
            <a href="#" class="block py-2.5 text-sm hover:text-blue-500 transition-all">مشاهده همه</a>
        </div>`
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
                                 <td class="px-6 py-4 text-nowrap">
                                     <a href="#"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                                 </td>
                                 <td class="px-6 py-4">
                                     <a href="#" onclick="removeCourse('${course._id
      }')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
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
                    <td class="px-6 py-4 text-nowrap">
                        <a href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" onclick="removeMenuItem('${menu._id}')"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
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
                    <a href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                </td>
                <td class="px-6 py-4">
                    <a href="#" onclick="removeUser('${user._id}')"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
                </td>
                <td class="px-6 py-4 text-nowrap">
                    <a href="#"  onclick="banUser('${user._id}')"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">بن</a>
                </td>
            </tr>`
    );
  });
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
                                     <a href="#"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                                 </td>
                                 <td class="px-6 py-4">
                                     <a href="#" onclick="removeCategory('${category._id
      }')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
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
                    ${message.createdAt.slice(0, 10)}
                </td>
                <td class="px-6 py-4 text-nowrap">
                    <span onclick="showContentBody('${message.body}')"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">مشاهده</span>
                </td>
                <td class="px-6 py-4 text-nowrap">
                    <span onclick="answerToContact('${message.email}')"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">پاسخ</span>
                </td>
                <td class="px-6 py-4">
                    <span onclick="removeMessage('${message._id}')"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">حذف</span>
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
                    ${session.createdAt.slice(0, 10)}
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
                <td class="px-6 py-4 text-nowrap">
                    <a href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                </td>
                <td class="px-6 py-4">
                    <a href="#" onclick="removeSession('${session._id}')"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
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
                    ${article.createdAt.slice(0, 10)}	
                </td>
                <td class="px-6 py-4 text-nowrap">
                    ${article.creator.name}		
                </td>
                <td class="px-6 py-4">
                    <a href="#" onclick="removeArticle('${article._id}')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
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
    console.log(comment);
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
                ${comment.createdAt.slice(0, 10)}
            </td>
            <td class="px-6 py-4 text-nowrap">
                <span onclick="showCommentBody('${comment.body}')"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">مشاهده</span>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <span
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">پاسخ</span>
            </td>
            <td class="px-6 py-4">
                <span onclick="acceptComment('${comment._id}')"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">تایید</span>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <span onclick="rejectComment('${comment._id}')"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">رد</span>
            </td>
            <td class="px-6 py-4 text-nowrap">
                <span onclick="removeComment('${comment._id}')"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">حذف</span>
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
  createNewUser,
  removeUser,
  banUser,

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
};
