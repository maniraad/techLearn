import { getAllCourses, prepareCreateCourseForm, createNewCourse, removeCourse } from "./func/shared.js";

window.removeCourse = removeCourse
window.addEventListener("load", () => {
    const addCourseBtn = document.querySelector('#addCourseBtn');

    getAllCourses();
    prepareCreateCourseForm();

    addCourseBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewCourse()
    });
});

