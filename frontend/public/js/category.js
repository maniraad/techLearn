import { getAndShowCategoryCourses } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(data=>{
        console.log(data);
    })
    
});