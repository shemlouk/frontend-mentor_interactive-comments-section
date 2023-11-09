import IconMinus from "@/public/images/icon-minus.svg";
import IconPlus from "@/public/images/icon-plus.svg";
import IconReply from "@/public/images/icon-reply.svg";
import Image from "next/image";
import Link from "next/link";
import { Comment } from "../lib/definitions";

export default function Comment({
  createdAt,
  content,
  user,
  score,
  replyingTo,
}: Comment) {
  return (
    <div className="bg-white w-full gap-4 rounded-md flex flex-col p-4">
      <div className="flex gap-4 items-center">
        <Image
          src={user.image.webp}
          alt={`${user.username} profile's picture`}
          width={34}
          height={34}
        />
        <Link href="#" className="font-bold text-darkBlue">
          {user.username}
        </Link>
        <span>{createdAt}</span>
      </div>

      <p>
        <span className="text-moderateBlue font-bold mr-2">@{replyingTo}</span>
        {content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center w-24 h-10 overflow-hidden rounded-lg bg-veryLightGray">
          <button className="flex-1 flex justify-center items-center">
            <Image src={IconPlus} alt="plus icon" />
          </button>
          <span className="text-center text-moderateBlue font-semibold">
            {score}
          </span>
          <button className="flex-1 flex justify-center items-center">
            <Image src={IconMinus} alt="minus icon" />
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <Image src={IconReply} alt="reply icon" />
          <span className="text-moderateBlue font-semibold">Reply</span>
        </div>
      </div>
    </div>
  );
}
