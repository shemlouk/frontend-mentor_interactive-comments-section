import { ReplyTo, User } from "./definitions";
import * as utils from "./utils";

const { buildComment, findCommentById, setLocalData, getLocalData } = utils;

export function createComment(user: User, content: string, replyTo?: ReplyTo) {
  const data = getLocalData();
  if (!data) return;

  const newComment = buildComment({ content, user });

  if (replyTo) {
    const { username, commentId } = replyTo;

    newComment.replyingTo = username;
    delete newComment.replies;

    const { comment, arr } = findCommentById(commentId, data.comments);
    (comment?.replies ?? arr).push(newComment);
  } else {
    data.comments.push(newComment);
  }

  setLocalData(data);
}

export function updateScore(commentId: number, action: "add" | "sub") {
  const data = getLocalData();
  if (!data) return;

  const { comment } = findCommentById(commentId, data.comments);
  if (comment) comment.score += action === "add" ? 1 : -1;

  setLocalData(data);
}

export function deleteComment(commentId: number) {
  const data = getLocalData();
  if (!data) return;

  const { index, arr } = findCommentById(commentId, data.comments);
  if (index > -1) arr.splice(index, 1);

  setLocalData(data);
}

export function editContent(commentId: number, content: string) {
  const data = getLocalData();
  if (!data) return;

  const { comment } = findCommentById(commentId, data.comments);
  if (comment && content) comment.content = content;

  setLocalData(data);
}
