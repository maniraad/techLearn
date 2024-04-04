import { getAllCourses, prepareCreateCourseForm, createNewCourse, removeCourse } from "./func/shared.js";

window.removeCourse = removeCourse
window.addEventListener("load", () => {
    
    getAllCourses();
    prepareCreateCourseForm();
    
    const addCourseBtn = document.querySelector('#addCourseBtn');
    
    addCourseBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewCourse()
    });
});