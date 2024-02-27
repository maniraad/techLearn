const landingStatusCourse = document.querySelector('.course-status');
const landingStudents = document.querySelector('.student');
const landingBlogs = document.querySelector('.blogs');

console.log(landingStatusCourse);

window.addEventListener('load', () => {
    makeCounter(40, landingStatusCourse, 'دوره آموزشی')
    makeCounter(1293, landingStudents, 'دانشجو')
    makeCounter(453, landingBlogs, 'مقاله رایگان')
})

function makeCounter(max, elemCounter ,elemName) {
    let counter = 0;
    const interval = setInterval(() => {
        elemCounter.innerHTML = `${counter}  ${elemName} `
        counter++
        if (counter === max) {
            clearInterval(interval)
        }
    }, 0.5);
}