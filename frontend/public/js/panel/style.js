const profileMenu = document.querySelector('.profile-menu');
const profile = document.querySelector('.profile');
const profileIconArrow = document.querySelector('.profile-icon');
const asideElem = document.querySelector('aside');
const mainElem = document.querySelector('main');
const menuButton = document.querySelector('.menu-btn');

profile.addEventListener('click', () => {
    profileMenu.classList.toggle('profile-menu--show');
    profileIconArrow.classList.toggle('rotate-180')
});

menuButton.addEventListener('click', () => {
    asideElem.classList.toggle('!-right-64');
    mainElem.classList.toggle('!mr-0');
});