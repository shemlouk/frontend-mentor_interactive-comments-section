import { updateScore } from "@/app/lib/actions";
import IconMinus from "@/public/images/icon-minus.svg";
import IconPlus from "@/public/images/icon-plus.svg";
import Image from "next/image";

export default function UpdateScoreForm({
  id,
  score,
}: {
  id: number;
  score: number;
}) {
  return (
    <form className="flex items-center w-24 h-10 overflow-hidden rounded-lg bg-veryLightGray md:flex-col md:w-10 md:h-24">
      <button
        type="submit"
        formAction={() => updateScore(id, "add")}
        className="flex-1 flex justify-center items-center"
      >
        <Image src={IconPlus} alt="plus icon" />
      </button>

      <span className="text-center text-moderateBlue font-semibold">
        {score}
      </span>

      <button
        type="submit"
        formAction={() => updateScore(id, "sub")}
        className="flex-1 flex justify-center items-center"
      >
        <Image src={IconMinus} alt="minus icon" />
      </button>
    </form>
  );
}
