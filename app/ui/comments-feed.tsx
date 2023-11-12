"use client";

import { useContext } from "react";
import { CommentsContext, UserContext } from "../lib/contexts";
import { Comment as TypeComment } from "../lib/definitions";
import Comment from "./comment";

export default function CommentsFeed() {
  const { username } = useContext(UserContext);
  const comments = useContext(CommentsContext);

  return (
    <div className="flex-1 flex flex-col-reverse overflow-y-scroll no-scrollbar">
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
    <ul className="flex flex-col gap-4 flex-1 md:gap-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isCurrentUser={comment.user.username === username}
        >
          {!!comment.replies?.length && (
            <div className="flex gap-4 mt-4 md:gap-8 md:mt-6">
              <div className="items-stretch w-[2px] rounded-full bg-lightGray md:ml-8" />
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
  children,
  isCurrentUser,
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
