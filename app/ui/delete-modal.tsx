"use client";

import { useCallback, useRef, useState } from "react";
import { DeleteCommentContext } from "../lib/contexts";
import DeleteCommentForm from "./forms/delete-comment-form";

export default function DeleteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commentId, setCommentId] = useState(-1);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModelWithId = useCallback((id: number) => {
    setCommentId(id);
    dialogRef.current?.showModal();
    dialogRef.current?.classList.remove("invisible");
  }, []);

  return (
    <DeleteCommentContext.Provider value={openModelWithId}>
      {children}

      <dialog
        ref={dialogRef}
        onClose={(e) => e.currentTarget.classList.add("invisible")}
        className="invisible flex flex-col gap-5 rounded-lg p-6 backdrop:bg-black/25 w-96"
      >
        <h1 className="font-semibold text-xl text-darkBlue">Delete Comment</h1>

        <p className="text-grayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>

        <DeleteCommentForm
          id={commentId}
          closeDialog={() => dialogRef.current?.close()}
        />
      </dialog>
    </DeleteCommentContext.Provider>
  );
}
