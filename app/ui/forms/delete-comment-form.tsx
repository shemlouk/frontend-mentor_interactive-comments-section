import { deleteComment } from "@/app/lib/actions";

export default function DeleteCommentForm({
  id,
  closeDialog,
}: {
  id: number;
  closeDialog(): void;
}) {
  return (
    <form
      onSubmit={closeDialog}
      className="flex justify-between gap-4 items-center"
    >
      <button
        type="submit"
        formMethod="dialog"
        className="rounded-lg py-3 flex-1 text-white bg-grayishBlue font-semibold tracking-wide"
      >
        NO, CANCEL
      </button>
      <button
        type="submit"
        formAction={() => deleteComment(id)}
        className="rounded-lg py-3 flex-1 text-white bg-softRed font-semibold tracking-wide"
      >
        YES, DELETE
      </button>
    </form>
  );
}
