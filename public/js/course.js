// const $ = document;

const topicLesson = document.querySelector('.topic__name');
const topicBody = document.querySelector('.topic__body');

topicLesson.addEventListener('click', () => {

    topicBody.classList.toggle('max-h-full')
})