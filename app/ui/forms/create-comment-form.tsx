"use client";

import { buildComment } from "@/app/lib/utils";
import Image from "next/image";
import { useCallback, useContext, useRef } from "react";
import { createComment } from "../../lib/actions";
import { CommentsContext, UserContext } from "../../lib/contexts";
import { ReplyTo } from "../../lib/definitions";
import { FormButton } from "../buttons";

export default function CreateCommentForm({
  isReply,
}: {
  isReply?: { to: ReplyTo; closeForm(): void };
}) {
  const { updateComments } = useContext(CommentsContext);
  const user = useContext(UserContext);

  const createCommentWithUser = createComment.bind(null, user);
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useCallback(
    (formData: FormData) => {
      const content = (formData.get("content") ?? "").toString();
      createCommentWithUser(content, isReply?.to);

      const commentPlaceholder = buildComment();
      commentPlaceholder.id = -1;
      updateComments(commentPlaceholder, isReply?.to.commentId);

      isReply?.closeForm();
      formRef.current?.reset();
    },
    [createCommentWithUser, isReply, updateComments]
  );

  return (
    <form
      ref={formRef}
      action={dispatch}
      className="bg-white w-full grid grid-cols-2 grid-rows-[1fr] gap-4 p-4 rounded-md md:p-6 md:grid-cols-[auto_1fr_auto]"
    >
      <textarea
        id="content"
        name="content"
        required
        placeholder="Add a comment..."
        className="col-span-2 md:col-span-1"
      />
      <Image
        src={user.image.webp}
        alt="your profile picture"
        width={34}
        height={34}
        className="md:order-first"
      />
      <div className="w-fit h-fit place-self-end md:place-self-start">
        <FormButton value={isReply ? "reply" : "send"} />
      </div>
    </form>
  );
}
