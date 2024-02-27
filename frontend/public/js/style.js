const $ = document;

const menuNavElem = $.querySelector('#nav-bar-icon');
const navigation = $.querySelector('.navigation');
const navigationCloseBtn = $.querySelector('.navigation__close-btn');
const overlay = $.querySelector('.overlay');

// Open Navigation
menuNavElem.addEventListener('click', () => {
    navigation.classList.remove('-right-64');
    navigation.classList.add('right-0');
    overlay.classList.remove('opacity-0');
    overlay.classList.remove('invisible');
});

// Close Navigation
navigationCloseBtn.addEventListener('click', () => {
    navigation.classList.remove('right-0');
    navigation.classList.add('-right-64');
        overlay.classList.add('opacity-0');
});
overlay.addEventListener('click', () => {
    navigation.classList.remove('right-0');
    navigation.classList.add('-right-64');
        overlay.classList.add('invisible');
});