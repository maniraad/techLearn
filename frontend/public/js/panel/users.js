import { getAllUsers, prepareCreateUser, createNewUser, removeUser  } from "./func/shared.js";

window.removeUser = removeUser
window.addEventListener("load", () => {
    
    getAllUsers();
    
    // const addCourseBtn = document.querySelector('#addCourseBtn');
    
    // addCourseBtn.addEventListener("click", event => {
    //     event.preventDefault();
    //     createNewCourse()
    // });
});