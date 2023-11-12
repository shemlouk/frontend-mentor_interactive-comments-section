import { fetchData } from "./lib/data";
import CommentsFeed from "./ui/comments-feed";
import ContextsContainer from "./ui/contexts-container";
import CreateCommentForm from "./ui/create-comment-form";
import DeleteCommentModal from "./ui/delete-comment-modal";

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="w-full h-screen bg-veryLightGray p-4 py-6 text-grayishBlue flex flex-col gap-4">
      <ContextsContainer {...{ data }}>
        <DeleteCommentModal>
          <CommentsFeed />
        </DeleteCommentModal>
        <CreateCommentForm />
      </ContextsContainer>
    </main>
  );
}
