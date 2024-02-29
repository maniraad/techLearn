const register = () => {
    const nameInput = document.querySelector('#name');
    const userNameInput = document.querySelector('#userName');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const passwordInput = document.querySelector('#password');

    const newUserInfo = {
        name: nameInput.value,
        userName: userNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        password: passwordInput.value,
        confirmPassword: passwordInput.value,
    }

    fetch(`http://localhost:4000/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
    }).then(res => res.json())
        .then(result => console.log(result))

}

export { register }