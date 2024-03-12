import { getCourseDetails } from "./funcs/shared.js";

const topicLesson = document.querySelector('.topic__name');
const topicBody = document.querySelector('.topic__body');
const topicName = document.querySelector('.topic__name');
const topicNameArrow = document.querySelector('.topic__name--arrow');
const selectSection = document.querySelectorAll('.select-section');
const menuItems = document.querySelectorAll('.menu__item');

// Intersection Observer Scroll
const observer = new IntersectionObserver(observerHandler, { threshold: 0.7 });
function observerHandler(allSections) {
    allSections.map(section => {
        let sectionClassName = section.target.id;
        let sectionMenuItem = document.querySelector(`.menu__item[data-section=${sectionClassName}]`);
    })
};
selectSection.forEach(section => {
    observer.observe(section);
});
menuItems.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(`.menu-item-active`).classList.remove("menu-item-active");
        item.classList.add("menu-item-active");

        let sectionClass = item.getAttribute("data-section");
        let sectionOffsetTop = document.querySelector(`#${sectionClass}`).offsetTop;

        window.scrollTo({
            top: sectionOffsetTop - 130,
            behavior: "smooth"
        });
    })
});

topicLesson.addEventListener('click', () => {
    topicName.classList.toggle('topic__name--active');
    topicBody.classList.toggle('max-h-full');
    topicNameArrow.classList.toggle('rotate-180');
});

window.addEventListener("load", () => {
    getCourseDetails()
});