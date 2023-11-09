"use client";

import Image from "next/image";
import { useRef } from "react";
import { createComment } from "../lib/actions";
import { User } from "../lib/definitions";

export default function CommentForm(user: User) {
  const createCommentWithCurrentUser = createComment.bind(null, user);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        formRef.current?.reset();
        createCommentWithCurrentUser(formData);
      }}
      className="bg-white w-full flex flex-col gap-4 p-4 rounded-md"
    >
      <textarea
        id="content"
        name="content"
        required
        defaultValue=""
        placeholder="Add a comment..."
        className="w-full rounded-md border border-lightGray px-4 py-2 resize-none h-24 outline-none"
      />

      <div className="flex items-center justify-between">
        <Image
          src={user.image.webp}
          alt="your profile picture"
          width={34}
          height={34}
        />

        <button className="bg-moderateBlue rounded-md flex items-center justify-center w-[86px] h-10 text-white text-sm font-medium">
          SEND
        </button>
      </div>
    </form>
  );
}
