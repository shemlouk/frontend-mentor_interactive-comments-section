"use client";

import { useCallback, useRef } from "react";
import { deleteComment } from "../lib/actions";
import { DeleteCommentContext } from "../lib/contexts";

export default function DeleteCommentModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const commentId = useRef(-1);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModelWithId = useCallback((id: number) => {
    commentId.current = id;
    dialogRef.current?.showModal();
    dialogRef.current?.classList.remove("invisible");
  }, []);

  return (
    <DeleteCommentContext.Provider value={openModelWithId}>
      {children}

      <dialog
        ref={dialogRef}
        onClose={(e) => e.currentTarget.classList.add("invisible")}
        className="invisible w-full flex flex-col gap-5 rounded-lg p-6 backdrop:bg-black/25"
      >
        <h1 className="font-semibold text-xl text-darkBlue">Delete Comment</h1>

        <p className="text-grayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>

        <form className="flex justify-between gap-4 items-center">
          <button
            type="submit"
            formMethod="dialog"
            className="rounded-lg py-3 flex-1 text-white bg-grayishBlue font-semibold tracking-wide"
          >
            NO, CANCEL
          </button>

          <button
            type="submit"
            onClick={() => dialogRef.current?.close()}
            formAction={() => deleteComment(commentId.current)}
            className="rounded-lg py-3 flex-1 text-white bg-softRed font-semibold tracking-wide"
          >
            YES, DELETE
          </button>
        </form>
      </dialog>
    </DeleteCommentContext.Provider>
  );
}
