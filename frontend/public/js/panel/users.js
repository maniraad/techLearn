import { getAllUsers, prepareCreateUser, createNewUser, removeUser, banUser } from "./func/shared.js";

window.removeUser = removeUser
window.banUser = banUser
window.addEventListener("load", () => {

    getAllUsers();

    // const addCourseBtn = document.querySelector('#addCourseBtn');

    // addCourseBtn.addEventListener("click", event => {
    //     event.preventDefault();
    //     createNewCourse()
    // });
});