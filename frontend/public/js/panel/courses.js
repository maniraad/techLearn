import { getAllCourses, prepareCreateCourseForm, createNewCourse } from "./func/shared.js";

window.addEventListener("load", () => {
    const addCourseBtn = document.querySelector('#addCourseBtn');

    getAllCourses();
    prepareCreateCourseForm();

    addCourseBtn.addEventListener("click", event => {
        event.preventDefault();
        createNewCourse()
    });
});

