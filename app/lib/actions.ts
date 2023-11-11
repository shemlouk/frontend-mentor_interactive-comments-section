"use server";

import * as fs from "fs";
import { fetchData } from "./data";
import { Comment, ReplyTo, User } from "./definitions";
import { findCommentById, generateRandomId } from "./utils";

const PATH_TO_FILE = "./data.json";

export async function createComment(
  currentUser: User,
  formData: FormData,
  replyTo?: ReplyTo
) {
  try {
    const data = await fetchData();
    const newId = generateRandomId();

    const newComment = {
      id: newId,
      content: formData.get("content") as string,
      createdAt: "now",
      score: 0,
      user: currentUser,
      replies: [],
    } as Comment;

    if (replyTo) {
      newComment.replyingTo = replyTo.username;
      delete newComment.replies;

      const comment = findCommentById(replyTo.commentId, data.comments);
      comment?.replies?.push(newComment);
    } else {
      data.comments.push(newComment);
    }

    const dataToWrite = JSON.stringify(data);
    fs.writeFileSync(PATH_TO_FILE, dataToWrite);
  } catch (error) {
    console.error(error);
  }
}
