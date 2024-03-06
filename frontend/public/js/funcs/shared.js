import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const showUserNameInNavbar = () => {
    const userInfos = getMe().then(data => {
        console.log(data);
    })
};

export { showUserNameInNavbar }