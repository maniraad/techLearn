const Toast = Swal.mixin({
    position: "top-end",
    showConfirmButton: false,
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
    return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
    const userInfos = JSON.parse(localStorage.getItem("user")).token;
    return userInfos ? userInfos : null;
};

const isLogin = () => {
    const userInfos = localStorage.getItem('user');
    return userInfos ? true : false
};

const getUrlParam = key => {
    const urlParam = new URLSearchParams(window.location.search)
    return urlParam.get(key);
};

const searchInArray = (array, searchProperty, searchValue) => {
    let outPutArray = array.filter(item => item[searchProperty].includes(searchValue));

    return outPutArray
};

export { Toast, saveIntoLocalStorage, getFromLocalStorage, getToken, isLogin, getUrlParam, searchInArray };