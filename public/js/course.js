import { getCourseDetails, observerScroll, submitComments } from "./funcs/shared.js";

window.addEventListener("load", () => {

    const topicLesson = document.querySelector('.courses-sessions-head');
    const topicBody = document.querySelector('.courses-sessions-wrapper');
    const topicName = document.querySelector('.courses-sessions-title');
    const topicNameArrow = document.querySelector('.courses-sessions--arrow');
    const addCommentButton = document.querySelector('#add-comment');
    const formCommentElem = document.querySelector('#form-comment');
    const commentSubmitButton = document.querySelector('#comment-submit-btn');

    topicLesson.addEventListener('click', () => {
        topicName.classList.toggle('courses-sessions-title--active');
        topicBody.classList.toggle('max-h-full');
        topicNameArrow.classList.toggle('rotate-180');
    });

    addCommentButton.addEventListener("click", (event) => {
        event.preventDefault();
        formCommentElem.classList.toggle('!show-comment')
    });

    commentSubmitButton.addEventListener("click", (event)=>{
        event.preventDefault();
        submitComments();
    });
    
    observerScroll();
    getCourseDetails(); 
});