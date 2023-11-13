export function CommentSkeleton() {
  return (
    <div className="bg-white w-full rounded-md border border-lightGray">
      <div className="animate-pulse gap-4 flex flex-col p-4 md:p-6 md:flex-row md:gap-6 shadow-sm">
        <div className="hidden md:block">
          <div className="w-24 h-10 rounded-lg bg-lightGray md:w-10 md:h-24" />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-[34px] h-[34px] bg-lightGray rounded-full" />
              <div className="w-56 h-[24px] bg-lightGray rounded" />
            </div>

            <div className="hidden md:block">
              <div className="w-16 h-6 bg-lightGray rounded" />
            </div>
          </div>

          <div className="h-24 w-full rounded bg-lightGray" />
        </div>

        <div className="flex items-center justify-between md:hidden">
          <div className="w-24 h-10 rounded-lg bg-lightGray md:w-10 md:h-24" />
          <div className="w-16 h-6 bg-lightGray rounded" />
        </div>
      </div>
    </div>
  );
}

export function CreateCommentFormSkeleton() {
  return (
    <div className="bg-white w-full rounded-md border border-lightGray md:mt-10 z-10 shadow-sm">
      <div className="animate-pulse grid grid-cols-2 grid-rows-[1fr] gap-4 p-4 md:p-6 md:grid-cols-[auto_1fr_auto]">
        <textarea disabled className="bg-lightGray col-span-2 md:col-span-1" />
        <div className="w-[34px] h-[34px] bg-lightGray rounded-full md:order-first" />
        <div className="bg-lightGray rounded-md w-[86px] h-10 md:w-28 md:h-11 md:order-last place-self-end md:place-self-start" />
      </div>
    </div>
  );
}
