import { getAllCourses, createNewCourse } from "./func/shared.js";

window.addEventListener("load", () => {
    getAllCourses();
    createNewCourse();
});

