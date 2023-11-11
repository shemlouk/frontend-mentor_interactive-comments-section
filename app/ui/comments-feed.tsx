"use client";

import { useContext } from "react";
import { CommentsContext, UserContext } from "../lib/contexts";
import { Comment as TypeComment } from "../lib/definitions";
import Comment from "./comment";

export default function CommentsFeed() {
  const { username } = useContext(UserContext);
  const comments = useContext(CommentsContext);

  return (
    <div className="flex-1 flex flex-col-reverse overflow-y-scroll">
      <CommentList {...{ comments, username }} />
    </div>
  );
}

function CommentList({
  comments,
  username,
}: {
  comments: TypeComment[];
  username: string;
}) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isCurrentUser={comment.user.username === username}
        >
          {!!comment.replies?.length && (
            <div className="flex gap-4 mt-4">
              <div className="items-stretch w-2 rounded-full bg-lightGray" />
              <CommentList comments={comment.replies} username={username} />
            </div>
          )}
        </CommentItem>
      ))}
    </ul>
  );
}

function CommentItem({
  comment,
  isCurrentUser,
  children,
}: {
  comment: TypeComment;
  isCurrentUser: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Comment {...{ ...comment, isCurrentUser }} />
      {children}
    </li>
  );
}
