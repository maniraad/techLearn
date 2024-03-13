import { getCourseDetails, observerScroll } from "./funcs/shared.js";

const topicLesson = document.querySelector('.topic__name');
const topicBody = document.querySelector('.topic__body');
const topicName = document.querySelector('.topic__name');
const topicNameArrow = document.querySelector('.topic__name--arrow');

topicLesson.addEventListener('click', () => {
    topicName.classList.toggle('topic__name--active');
    topicBody.classList.toggle('max-h-full');
    topicNameArrow.classList.toggle('rotate-180');
});

window.addEventListener("load", () => {
    observerScroll()
    getCourseDetails()
});