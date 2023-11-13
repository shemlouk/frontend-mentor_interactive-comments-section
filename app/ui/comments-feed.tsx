"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CommentsContext, UserContext } from "../lib/contexts";
import { Comment as TypeComment } from "../lib/definitions";
import Comment from "./comment";

export default function CommentsFeed() {
  const { username } = useContext(UserContext);
  const comments = useContext(CommentsContext);

  const [isOnBottom, setIsOnBottom] = useState(true);

  return (
    <div
      onScroll={(e) => {
        const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
        const value = Math.abs(scrollHeight - clientHeight - scrollTop);
        const offset = 200;
        setIsOnBottom(value - offset < 1);
      }}
      className="flex-1 overflow-y-scroll no-scrollbar md:-m-10 md:p-10"
    >
      <CommentList {...{ comments, username }} />

      <div
        onClick={(e) => {
          const parent = e.currentTarget.parentElement;
          if (parent) {
            const { scrollHeight, clientHeight } = parent;
            parent.scrollTo({
              top: scrollHeight - clientHeight,
              behavior: "smooth",
            });
          }
        }}
        data-hide={isOnBottom}
        className="md:data-[hide=true]:scale-0 data-[hide=true]:h-0 sticky group h-10 md:h-[2px] w-full bottom-0 md:-bottom-10 left-0 z-10 bg-moderateBlue transition-all md:hover:h-10 cursor-pointer flex justify-center items-center"
      >
        <span className="group-data-[hide=true]:text-transparent md:group-hover:text-white md:text-transparent text-white transition-colors text-sm font-medium">
          Scroll back to bottom
        </span>
      </div>
    </div>
  );
}

function CommentList({
  username,
  comments,
}: {
  username: string;
  comments: TypeComment[];
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
            <div className="group flex gap-4 mt-4 md:gap-8 md:mt-6">
              <div className="items-stretch w-[2px] rounded-full bg-lightGray md:ml-8 md:group-hover:bg-grayishBlue/25 transition-colors" />
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
  const itemRef = useRef<HTMLLIElement>(null);
  useEffect(() => itemRef.current?.scrollIntoView({ behavior: "smooth" }), []);

  return (
    <li ref={itemRef}>
      <Comment {...{ ...comment, isCurrentUser }} />
      {children}
    </li>
  );
}
