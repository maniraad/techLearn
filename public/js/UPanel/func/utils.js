import { getToken } from "../../funcs/utils.js"

const logout = () => {
        localStorage.removeItem('user');
        location.replace("../index.html");
};

export { logout }