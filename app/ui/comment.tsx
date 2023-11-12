"use client";

import IconDelete from "@/public/images/icon-delete.svg";
import IconEdit from "@/public/images/icon-edit.svg";
import IconMinus from "@/public/images/icon-minus.svg";
import IconPlus from "@/public/images/icon-plus.svg";
import IconReply from "@/public/images/icon-reply.svg";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { updateScore } from "../lib/actions";
import { DeleteCommentContext } from "../lib/contexts";
import { Comment } from "../lib/definitions";
import CreateCommentForm from "./create-comment-form";

export default function Comment({
  id,
  createdAt,
  content,
  user,
  score,
  replyingTo,
  isCurrentUser,
}: Comment & { isCurrentUser: boolean }) {
  const [isReplying, setIsReplying] = useState(false);

  const openModelWithId = useContext(DeleteCommentContext);

  const updateScoreWithId = updateScore.bind(null, id);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white w-full gap-4 rounded-md flex flex-col p-4">
        <Header
          username={user.username}
          profilePicture={user.image.webp}
          {...{ createdAt, isCurrentUser }}
        />

        <p>
          {replyingTo && (
            <span className="text-moderateBlue font-bold mr-2">
              @{replyingTo}
            </span>
          )}
          {content}
        </p>

        <Footer
          {...{ score, isCurrentUser }}
          openDeleteModel={() => openModelWithId(id)}
          toggleReply={() => setIsReplying(!isReplying)}
          updateScore={(action) => updateScoreWithId(action)}
        />
      </div>

      {isReplying && (
        <CreateCommentForm to={{ username: user.username, commentId: id }} />
      )}
    </div>
  );
}

function Header({
  username,
  createdAt,
  profilePicture,
  isCurrentUser,
}: {
  username: string;
  createdAt: string;
  profilePicture: string;
  isCurrentUser: boolean;
}) {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={profilePicture}
        alt={`${username} profile's picture`}
        width={34}
        height={34}
      />
      <div className="flex items-center gap-2">
        <Link href="#" className="font-bold text-darkBlue">
          {username}
        </Link>
        {isCurrentUser && (
          <span className="bg-moderateBlue px-[6px] text-white text-sm font-medium rounded-sm tracking-wide">
            you
          </span>
        )}
      </div>
      <span>{createdAt}</span>
    </div>
  );
}

function Footer({
  score,
  isCurrentUser,
  toggleReply,
  updateScore,
  openDeleteModel,
}: {
  score: number;
  isCurrentUser: boolean;
  toggleReply(): void;
  updateScore(action: "add" | "sub"): void;
  openDeleteModel(): void;
}) {
  return (
    <div className="flex items-center justify-between">
      <form className="flex items-center w-24 h-10 overflow-hidden rounded-lg bg-veryLightGray">
        <button
          type="submit"
          formAction={() => updateScore("add")}
          className="flex-1 flex justify-center items-center"
        >
          <Image src={IconPlus} alt="plus icon" />
        </button>

        <span className="text-center text-moderateBlue font-semibold">
          {score}
        </span>

        <button
          type="submit"
          formAction={() => updateScore("sub")}
          className="flex-1 flex justify-center items-center"
        >
          <Image src={IconMinus} alt="minus icon" />
        </button>
      </form>

      {isCurrentUser ? (
        <div className="flex gap-4 items-center">
          <button onClick={openDeleteModel} className="flex gap-2 items-center">
            <Image src={IconDelete} alt="delete icon" />
            <span className="text-softRed font-semibold">Delete</span>
          </button>
          <button className="flex gap-2 items-center">
            <Image src={IconEdit} alt="edit icon" />
            <span className="text-moderateBlue font-semibold">Edit</span>
          </button>
        </div>
      ) : (
        <button className="flex gap-2 items-center" onClick={toggleReply}>
          <Image src={IconReply} alt="reply icon" />
          <span className="text-moderateBlue font-semibold">Reply</span>
        </button>
      )}
    </div>
  );
}
