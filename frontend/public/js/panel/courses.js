import { getAllCourses } from "./func/shared.js";

window.addEventListener("load", () => {

    const coursesWrapper = document.querySelector('#courses-wrapper')

    getAllCourses().then(courses => {
        courses.forEach((course, index) => {
            coursesWrapper.insertAdjacentHTML("beforeend", `
                             <tr
                                 class="bg-white border-b hover:bg-gray-50">
                                 <td class="w-4 p-4">
                                     <div class="flex items-center">
                                         <input id="checkbox-table-1" type="checkbox"
                                             class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer">
                                         <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                     </div>
                                 </td>
                                 <th scope="row"
                                     class="px-6 py-4 text-nowrap font-medium text-gray-900 whitespace-nowrap">
                                     ${index + 1}
                                 </th>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.name}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                 ${course.price === 0 ? "رایگان" : course.price.toLocaleString() + ` <span class="text-base">تومان</span>`}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.registers}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     ${course.categoryID.title}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                    ${course.isComplete === 0 ? "درحال برگذاری" : "تکمیل شده"}
                                 </td>
                                 <td class="px-6 py-4 text-nowrap">
                                     <a href="#"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ویرایش</a>
                                 </td>
                                 <td class="px-6 py-4">
                                     <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">حذف</a>
                                 </td>
                             </tr>`)
        });
    });

});