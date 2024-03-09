import { getAndShowCategoryCourses } from "./funcs/shared.js";

const sort = document.querySelector('#sort');
const sortBox = document.querySelector('#sort-box');
const Grouping = document.querySelector('#Grouping');
const GroupingBox = document.querySelector('#Grouping-box');

sort.addEventListener('click', () => {
    sortBox.classList.toggle('hide');
});

Grouping.addEventListener('click', () => {
    GroupingBox.classList.toggle('hide');
});

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(data => {
    });
});