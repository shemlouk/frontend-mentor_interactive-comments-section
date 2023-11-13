"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { DeleteCommentContext } from "../lib/contexts";
import { Comment } from "../lib/definitions";
import { CommentButton } from "./buttons";
import CreateCommentForm from "./forms/create-comment-form";
import EditContentForm from "./forms/edit-content-form";
import UpdateScoreForm from "./forms/update-score-form";

export default function Comment({
  id,
  user,
  score,
  content,
  createdAt,
  replyingTo,
  isCurrentUser,
}: Comment & { isCurrentUser: boolean }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModel = useContext(DeleteCommentContext);
  const openModelWithId = openModel.bind(null, id);

  return (
    <div className="flex flex-col gap-4 md:gap-2">
      <div className="bg-white w-full gap-4 rounded-md flex flex-col p-4 md:p-6 md:flex-row md:gap-6 md:hover:shadow-[rgba(7,_65,_210,_0.03)_0px_9px_30px] md:hover:scale-[1.02] transition-all">
        <div className="hidden md:block">
          <UpdateScoreForm {...{ score, id }} />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <header className="flex justify-between">
            <div className="flex gap-4 items-center">
              <Image
                src={user.image.webp}
                alt={`${user.username} profile's picture`}
                width={34}
                height={34}
              />

              <div className="flex items-center gap-2">
                <Link href="#" className="font-bold text-darkBlue">
                  {user.username}
                </Link>

                <span
                  style={{ display: isCurrentUser ? "inline" : "none" }}
                  className="bg-moderateBlue px-[6px] text-white text-sm font-medium rounded-sm tracking-wide"
                >
                  you
                </span>
              </div>

              <span>{createdAt}</span>
            </div>

            <div className="hidden md:block">
              <Buttons
                isCurrentUser={isCurrentUser}
                openDeleteModel={openModelWithId}
                toggleEdit={() => setIsEditing(!isEditing)}
                toggleReply={() => setIsReplying(!isReplying)}
              />
            </div>
          </header>

          {isEditing ? (
            <EditContentForm
              {...{ id, content }}
              closeForm={() => setIsEditing(false)}
            />
          ) : (
            <p>
              <span
                className="text-moderateBlue font-bold mr-2"
                style={{ display: replyingTo ? "inline" : "none" }}
              >
                @{replyingTo}
              </span>
              {content}
            </p>
          )}
        </div>

        <footer className="flex items-center justify-between md:hidden">
          <UpdateScoreForm {...{ score, id }} />
          <Buttons
            isCurrentUser={isCurrentUser}
            openDeleteModel={openModelWithId}
            toggleEdit={() => setIsEditing(!isEditing)}
            toggleReply={() => setIsReplying(!isReplying)}
          />
        </footer>
      </div>

      {isReplying && (
        <CreateCommentForm
          isReply={{
            to: { username: user.username, commentId: id },
            closeForm: () => setIsReplying(false),
          }}
        />
      )}
    </div>
  );
}

function Buttons({
  toggleEdit,
  toggleReply,
  isCurrentUser,
  openDeleteModel,
}: {
  toggleEdit(): void;
  toggleReply(): void;
  isCurrentUser: boolean;
  openDeleteModel(): void;
}) {
  return isCurrentUser ? (
    <div className="flex gap-4 items-center">
      <CommentButton callback={openDeleteModel} value="delete" />
      <CommentButton callback={toggleEdit} value="edit" />
    </div>
  ) : (
    <CommentButton callback={toggleReply} value="reply" />
  );
}
