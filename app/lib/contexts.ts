"use client";

import { createContext } from "react";
import { Comment, User } from "./definitions";

export const UserContext = createContext<User>({
  image: { png: "", webp: "" },
  username: "",
});

export const CommentsContext = createContext<Comment[]>([]);

export const DeleteCommentContext = createContext((id: number) => {});
