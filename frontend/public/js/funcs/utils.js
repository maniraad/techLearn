const Toast = Swal.mixin({
    position: "top-end",
    icon: "success",
    title: "ثبت نام با موفقیت انجام شد",
    showConfirmButton: false,
    timer: 1500,
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export { Toast };