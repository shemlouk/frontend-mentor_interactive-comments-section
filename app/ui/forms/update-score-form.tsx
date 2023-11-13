"use client";

import { updateScore } from "@/app/lib/actions";
import IconMinus from "@/public/images/icon-minus.svg";
import IconPlus from "@/public/images/icon-plus.svg";
import Image from "next/image";
import { useState } from "react";

export default function UpdateScoreForm({
  id,
  score,
}: {
  id: number;
  score: number;
}) {
  const [scoreState, setScoreState] = useState<"add" | "sub">();

  return (
    <form className="flex items-center w-24 h-10 overflow-hidden rounded-lg bg-veryLightGray md:flex-col md:w-10 md:h-24">
      <button
        type="submit"
        formAction={() => {
          updateScore(id, "add");
          setScoreState(scoreState ? undefined : "add");
        }}
        disabled={scoreState === "add"}
        className="h-full md:h-fit md:w-full flex-1 flex justify-center items-center md:enabled:hover:bg-lightGray disabled:cursor-not-allowed transition-colors"
      >
        <Image src={IconPlus} alt="plus icon" />
      </button>

      <span
        data-disabled={!!scoreState}
        className="h-full px-2 md:h-fit md:w-full md:py-1 flex justify-center items-center text-center text-moderateBlue font-semibold data-[disabled=true]:bg-moderateBlue/10 transition-colors"
      >
        {score}
      </span>

      <button
        type="submit"
        formAction={() => {
          updateScore(id, "sub");
          setScoreState(scoreState ? undefined : "sub");
        }}
        disabled={scoreState === "sub"}
        className="h-full md:h-fit md:w-full flex-1 flex justify-center items-center md:enabled:hover:bg-lightGray disabled:cursor-not-allowed transition-colors"
      >
        <Image src={IconMinus} alt="minus icon" />
      </button>
    </form>
  );
}
