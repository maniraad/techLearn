const $ = document;

const menuNavElem = $.querySelector('#nav-bar-icon');
const navigation = $.querySelector('.navigation');
const navigationCloseBtn = $.querySelector('.navigation__close-btn');

// Open Navigation
menuNavElem.addEventListener('click', () => {
    navigation.classList.remove('-right-64');
    navigation.classList.add('right-0');
});

// Close Navigation
navigationCloseBtn.addEventListener('click', () => {
    navigation.classList.remove('right-0');
    navigation.classList.add('-right-64');
});