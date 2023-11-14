import { fetchData } from "./lib/data";
import CommentsFeed from "./ui/comments-feed";
import ContextsContainer from "./ui/contexts-container";
import DeleteModal from "./ui/delete-modal";
import CreateCommentForm from "./ui/forms/create-comment-form";

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="w-full flex flex-col items-center gap-4 h-screen px-4 py-6 md:px-[10%] md:py-16 bg-veryLightGray text-grayishBlue selection:bg-lightGrayishBlue selection:text-moderateBlue">
      <ContextsContainer {...{ data }}>
        <DeleteModal>
          <CommentsFeed />
        </DeleteModal>
        <div className="md:mt-10 w-full md:max-w-3xl md:shadow-[rgba(13,_38,_76,_0.04)_0px_9px_20px]">
          <CreateCommentForm />
        </div>
      </ContextsContainer>
    </main>
  );
}
