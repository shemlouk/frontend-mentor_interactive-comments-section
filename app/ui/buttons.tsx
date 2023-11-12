import IconDelete from "@/public/images/icon-delete.svg";
import IconEdit from "@/public/images/icon-edit.svg";
import IconReply from "@/public/images/icon-reply.svg";
import Image from "next/image";

const icons = {
  delete: {
    icon: IconDelete,
    color: "text-softRed",
  },
  edit: {
    icon: IconEdit,
    color: "text-moderateBlue",
  },
  reply: {
    icon: IconReply,
    color: "text-moderateBlue",
  },
};

export function CommentButton({
  value,
  callback,
}: {
  callback(): void;
  value: keyof typeof icons;
}) {
  return (
    <button className="flex gap-2 items-center" onClick={callback}>
      <Image src={icons[value].icon} alt={`${value} icon`} />
      <span className={`${icons[value].color} font-semibold`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    </button>
  );
}

export function FormButton({ value }: { value: string }) {
  return (
    <button
      type="submit"
      className="bg-moderateBlue rounded-md flex items-center justify-center w-[86px] h-10 text-white text-sm font-medium place-self-end md:text-base md:w-28 md:h-11 md:order-last md:place-self-start"
    >
      {value.toUpperCase()}
    </button>
  );
}
