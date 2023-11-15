"use client";

import { createContext } from "react";
import { Comment, User } from "./definitions";

export const UserContext = createContext<User>({
  image: { png: "", webp: "" },
  username: "",
});

export const CommentsContext = createContext({
  comments: [] as Comment[],
  updateComments: (newComment: Comment, replyCommentId?: number) => {},
});

export const DeleteCommentContext = createContext({
  deletedId: -Infinity,
  openModel: (id: number) => {},
});
