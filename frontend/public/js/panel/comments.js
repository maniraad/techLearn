import { getAllComments, removeComment, acceptComment, rejectComment,showCommentBody } from "./func/shared.js";

window.showCommentBody = showCommentBody
window.acceptComment = acceptComment
window.rejectComment = rejectComment
window.removeComment = removeComment
window.addEventListener("load", () => {

    getAllComments()

});