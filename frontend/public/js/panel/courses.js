import { getAllCourses, prepareCreateCourseForm } from "./func/shared.js";

window.addEventListener("load", () => {
    getAllCourses();
    prepareCreateCourseForm();
});

