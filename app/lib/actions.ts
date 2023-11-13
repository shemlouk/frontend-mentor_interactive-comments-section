"use server";

import * as fs from "fs";
import { fetchData } from "./data";
import { Comment, ReplyTo, User } from "./definitions";
import {
  findCommentById,
  findCommentParentById,
  generateRandomNumber,
} from "./utils";

const PATH_TO_FILE = "./data.json";
const MAX_ID = 1000000;

export async function createComment(
  currentUser: User,
  formData: FormData,
  replyingTo?: ReplyTo
) {
  try {
    const data = await fetchData();
    const newId = generateRandomNumber(MAX_ID);

    const newComment: Comment = {
      id: newId,
      content: (formData.get("content") ?? "").toString(),
      createdAt: "now",
      score: 0,
      user: currentUser,
      replies: [],
    };

    if (replyingTo) {
      const { username, commentId } = replyingTo;

      newComment.replyingTo = username;
      delete newComment.replies;

      const parentComment = findCommentParentById(commentId, data.comments);
      parentComment?.replies?.push(newComment);
    } else {
      data.comments.push(newComment);
    }

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export async function updateScore(commentId: number, action: "add" | "sub") {
  try {
    const data = await fetchData();

    const { comment } = findCommentById(commentId, data.comments);
    if (comment) comment.score += action === "add" ? 1 : -1;

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(commentId: number) {
  try {
    const data = await fetchData();

    const { index, arr } = findCommentById(commentId, data.comments);
    if (index > -1) arr.splice(index, 1);

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

export async function editCommentContent(
  commentId: number,
  formData: FormData
) {
  try {
    const data = await fetchData();
    const content = formData.get("content")?.toString();

    const { comment } = findCommentById(commentId, data.comments);
    if (comment && content) comment.content = content;

    fs.writeFileSync(PATH_TO_FILE, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}
