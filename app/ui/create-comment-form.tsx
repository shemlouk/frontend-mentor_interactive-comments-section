"use client";

import Image from "next/image";
import { useCallback, useContext, useRef } from "react";
import { createComment } from "../lib/actions";
import { UserContext } from "../lib/contexts";
import { ReplyTo } from "../lib/definitions";

export default function CreateCommentForm(isReply: { to?: ReplyTo }) {
  const currentUser = useContext(UserContext);
  const createCommentWithCurrentUser = createComment.bind(null, currentUser);

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useCallback(
    async (formData: FormData) => {
      formRef.current?.reset();
      createCommentWithCurrentUser(formData, isReply.to);
    },
    [createCommentWithCurrentUser, isReply]
  );

  return (
    <form
      ref={formRef}
      action={dispatch}
      className="bg-white w-full flex flex-col gap-4 p-4 rounded-md"
    >
      <textarea
        id="content"
        name="content"
        required
        placeholder="Add a comment..."
        className="w-full rounded-md border border-lightGray px-4 py-2 resize-none h-24 outline-none"
      />

      <div className="flex items-center justify-between">
        <Image
          src={currentUser.image.webp}
          alt="your profile picture"
          width={34}
          height={34}
        />

        <button
          type="submit"
          className="bg-moderateBlue rounded-md flex items-center justify-center w-[86px] h-10 text-white text-sm font-medium"
        >
          {isReply.to ? "REPLY" : "SEND"}
        </button>
      </div>
    </form>
  );
}
