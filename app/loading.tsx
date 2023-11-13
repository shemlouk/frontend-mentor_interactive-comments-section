import { CommentSkeleton, CreateCommentFormSkeleton } from "./ui/skeletons";

export default function Loading() {
  return (
    <main className="w-full h-screen bg-veryLightGray px-4 py-6 flex flex-col gap-4 md:px-[10%] lg:px-[20%] xl:px-[30%] md:py-16">
      <div className="flex-1 overflow-y-scroll no-scrollbar md:-m-10 md:p-10">
        <div className="flex flex-col gap-4 flex-1 md:gap-6">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </div>
      <CreateCommentFormSkeleton />
    </main>
  );
}
