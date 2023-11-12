import { fetchData } from "./lib/data";
import CommentsFeed from "./ui/comments-feed";
import ContextsContainer from "./ui/contexts-container";
import DeleteModal from "./ui/delete-modal";
import CreateCommentForm from "./ui/forms/create-comment-form";

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="w-full h-screen bg-veryLightGray px-4 py-6 text-grayishBlue flex flex-col gap-4 md:px-[10%] lg:px-[20%] xl:px-[30%] md:py-16">
      <ContextsContainer {...{ data }}>
        <DeleteModal>
          <CommentsFeed />
        </DeleteModal>
        <CreateCommentForm />
      </ContextsContainer>
    </main>
  );
}
