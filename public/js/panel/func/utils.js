import { getToken } from "../../funcs/utils.js"

const getAdminInfos = async () => {
    const res = await fetch(`https://techlearn-backend.liara.run/v1/auth/me`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
    const data = await res.json();
    return data
};

const logout = () => {
    localStorage.removeItem('user');
    location.replace("../index.html");
};

// const clearInput = () => {
//     console.log(arguments);
//     arguments.value = ''
// }

function clearInput() {  
    const args = Array.from(arguments)
    args.forEach(arg => {
        arg.value = ''
    });
  }

export { getAdminInfos, logout, clearInput }