"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as contexts from "../lib/contexts";
import { Comment as TypeComment } from "../lib/definitions";
import Comment from "./comment";

const { CommentsContext, DeleteCommentContext, UserContext } = contexts;

const ANIMATION_TIMEOUT = 400;
const SCROLL_BACK_THRESHOLD_DISTANCE = 150;

export default function CommentsFeed() {
  const { username } = useContext(UserContext);
  const comments = useContext(CommentsContext);

  const [isOnBottom, setIsOnBottom] = useState(true);

  const updateIsOnBottom = useCallback<React.UIEventHandler>(
    (e) => {
      const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;

      const distance = Math.abs(scrollHeight - clientHeight - scrollTop);
      const updatedIsOnBottom = distance - SCROLL_BACK_THRESHOLD_DISTANCE < 1;

      if (updatedIsOnBottom !== isOnBottom) setIsOnBottom(updatedIsOnBottom);
    },
    [isOnBottom]
  );

  const scrollBackToBottom = useCallback<React.MouseEventHandler>((e) => {
    const parent = e.currentTarget.parentElement;

    if (parent) {
      const { scrollHeight, clientHeight } = parent;
      const elementPosition = scrollHeight - clientHeight;
      parent.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      onScroll={updateIsOnBottom}
      className="flex-1 overflow-y-scroll no-scrollbar md:-m-10 md:p-10"
    >
      <CommentList {...{ comments, username }} />

      <div
        data-hide={isOnBottom}
        onClick={scrollBackToBottom}
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
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          {...{ comment, index }}
          isCurrentUser={comment.user.username === username}
        >
          {!!comment.replies?.length && (
            <RepliesContainer replies={comment.replies} username={username} />
          )}
        </CommentItem>
      ))}
    </ul>
  );
}

function RepliesContainer({
  replies,
  username,
}: {
  replies: TypeComment[];
  username: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const repliesList = containerRef.current?.querySelector("ul");

    if (repliesList) {
      const listObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.target.nodeName === "LI") {
            const replies = repliesList.querySelectorAll("li");
            const total = repliesList.childElementCount;

            let count = 0;
            replies.forEach((reply) => {
              if (reply.getAttribute("data-deleted") === "true") count++;
            });

            if (count === total) {
              setTimeout(
                () => containerRef.current?.classList.add("hidden"),
                ANIMATION_TIMEOUT
              );
            }
          }
        }
      });

      listObserver.observe(repliesList, { attributes: true, subtree: true });
    }
  }, []);

  return (
    <div ref={containerRef} className="group flex gap-4 mt-4 md:gap-8 md:mt-6">
      <div className="items-stretch w-[2px] rounded-full bg-lightGray md:ml-8 md:group-hover:bg-grayishBlue/25 transition-colors" />
      <CommentList comments={replies} username={username} />
    </div>
  );
}

function CommentItem({
  index,
  comment,
  children,
  isCurrentUser,
}: {
  index: number;
  comment: TypeComment;
  isCurrentUser: boolean;
  children: React.ReactNode;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    itemRef.current?.scrollIntoView({ behavior: "smooth" });

    const loadAnimationTimeout = 100 * index;
    setTimeout(() => setHide(false), loadAnimationTimeout);
  }, [index]);

  const { deletedId } = useContext(DeleteCommentContext);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const deleteStatus = deletedId === comment.id;

    if (deleteStatus) {
      setIsDeleted(true);
      setTimeout(() => setHide(true), ANIMATION_TIMEOUT);
    }
  }, [deletedId, comment]);

  return (
    <li
      ref={itemRef}
      data-hide={hide}
      data-deleted={isDeleted}
      className="data-[hide=true]:translate-y-10 data-[hide=true]:opacity-0 transition-all duration-ANIMATION_TIMEOUT ease-out data-[deleted=true]:translate-x-10 data-[deleted=true]:opacity-0 data-[deleted=true]:data-[hide=true]:hidden"
    >
      <Comment {...{ ...comment, isCurrentUser }} />
      {children}
    </li>
  );
}
