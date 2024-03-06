import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const headerResponsive = () => {
    const menuNavElem = document.querySelector('#nav-bar-icon');
    const navigation = document.querySelector('.navigation');
    const navigationCloseBtn = document.querySelector('.navigation__close-btn');
    const overlay = document.querySelector('.overlay');

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
};

const showUserNameInNavbar = () => {

    const userLoginBtn = document.querySelector('#user-login-btn');
    const userLoginBtnIcon = document.querySelector('#user-login-btn-icon');

    const isUserLogin = isLogin()

    if (isUserLogin) {

        const userInfos = getMe().then(data => {
            userLoginBtnIcon.classList.add("hidden");
            userLoginBtn.setAttribute('href', 'login.html')
            userLoginBtn.innerHTML = data.name
        });

    } else {
        userLoginBtn.setAttribute('href', 'login.html')
        userLoginBtn.innerHTML = 'ورود یا ثبت نام'
    }
};

export { showUserNameInNavbar, headerResponsive }