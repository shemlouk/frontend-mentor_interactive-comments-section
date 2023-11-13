import { fetchData } from "./lib/data";
import CommentsFeed from "./ui/comments-feed";
import ContextsContainer from "./ui/contexts-container";
import DeleteModal from "./ui/delete-modal";
import CreateCommentForm from "./ui/forms/create-comment-form";

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="w-full h-screen bg-veryLightGray px-4 py-6 text-grayishBlue flex flex-col gap-4 md:px-[10%] lg:px-[20%] xl:px-[30%] md:py-16 selection:bg-lightGrayishBlue selection:text-moderateBlue">
      <ContextsContainer {...{ data }}>
        <DeleteModal>
          <CommentsFeed />
        </DeleteModal>
        <div className="md:mt-10 md:shadow-[rgba(13,_38,_76,_0.04)_0px_9px_20px]">
          <CreateCommentForm />
        </div>
      </ContextsContainer>
    </main>
  );
}
