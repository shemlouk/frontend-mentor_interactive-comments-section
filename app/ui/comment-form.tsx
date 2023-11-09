import Image from "next/image";
import { User } from "../lib/definitions";

export default function CommentForm({ image }: User) {
  return (
    <form className="bg-white w-full flex flex-col gap-4 p-4 rounded-md">
      <textarea
        name="content"
        id="content"
        placeholder="Add a comment..."
        className="w-full rounded-md border border-lightGray px-4 py-2 resize-none h-24 outline-none"
      />

      <div className="flex items-center justify-between">
        <Image
          src={image.webp}
          alt="your profile picture"
          width={34}
          height={34}
        />

        <button
          type="submit"
          className="bg-moderateBlue rounded-md flex items-center justify-center w-[86px] h-10 text-white text-sm font-medium"
        >
          SEND
        </button>
      </div>
    </form>
  );
}
