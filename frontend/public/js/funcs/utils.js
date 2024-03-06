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

export { Toast, saveIntoLocalStorage, getFromLocalStorage, getToken };