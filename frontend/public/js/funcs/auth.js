import { Toast, saveIntoLocalStorage } from "./utils.js";

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

  fetch(`http://localhost:4000/v1/auth/register`, {
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
        // setTimeout(function () {
        //   location.href = "index.html"
        // }, 3000000);
      } else if (res.status === 409) {
        Toast.fire({
          icon: "error",
          title: "نام کاربری یا ایمیل قبلا استفاده شده",
        });
      };

      return res.json();
    })
    .then((result) => {
      console.log(result);
      saveIntoLocalStorage('user', { token: result.accessToken })
    });
};

export { register };