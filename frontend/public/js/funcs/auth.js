const register = () => {
    const nameInput = document.querySelector('#name');
    const userNameInput = document.querySelector('#userName');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const passwordInput = document.querySelector('#password');

    const newUserInfo = {
        name: nameInput.value.trim(),
        userName: userNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: passwordInput.value.trim(),
    }

    fetch(`http://localhost:4000/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserInfo)
    }).then(res => res.json())
        .then(result => console.log(result))

}

export { register }