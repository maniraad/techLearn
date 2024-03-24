import { getAllComments, removeComment, acceptComment, rejectComment,showCommentBody,answerComment } from "./func/shared.js";

window.showCommentBody = showCommentBody
window.answerComment = answerComment
window.acceptComment = acceptComment
window.rejectComment = rejectComment
window.removeComment = removeComment
window.addEventListener("load", () => {

    getAllComments()

});