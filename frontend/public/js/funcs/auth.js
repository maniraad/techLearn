import { Toast, saveIntoLocalStorage, getToken } from "./utils.js";

const register = () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone-number");
  const passwordInput = document.querySelector("#password");

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };

  fetch(`https://techlearn-backend.liara.run/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfos),
  })
    .then((res) => {

      if (res.status === 201) {
        Toast.fire({
          icon: "success",
          title: "ثبت نام با موفقیت انجام شد",
        });
        setTimeout(function () {
          location.href = "index.html"
        }, 3000);
      } else if (res.status === 409) {
        Toast.fire({
          icon: "error",
          title: "نام کاربری یا ایمیل قبلا استفاده شده",
        });
      } else if (res.status === 403) {
        Toast.fire({
          icon: "error",
          title: "این شماره بن شده است!",
        });
      };

      return res.json();
    })
    .then((result) => {
      saveIntoLocalStorage('user', { token: result.accessToken })
    });
};

const login = () => {
  const identifierInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');

  const userInfos = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`https://techlearn-backend.liara.run/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfos),
  })
    .then(res => {

      if (res.status === 200) {
        Toast.fire({
          icon: "success",
          title: "ورود با موفقیت انجام شد",
        });
        setTimeout(function () {
          location.href = "index.html"
        }, 3000);
      } else if (res.status === 401) {
        Toast.fire({
          icon: "error",
          title: "کاربری با این ایمیل و رمز عبور یافت نشد.",
        });
      };

      return res.json()
    })
    .then((result) => {
      saveIntoLocalStorage('user', { token: result.accessToken })
    });
};

const getMe = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const res = await fetch(`https://techlearn-backend.liara.run/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  const data = await res.json();

  return data;
};

export { register, login, getMe };