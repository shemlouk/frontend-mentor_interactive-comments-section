import { fetchData } from "./lib/data";
import CommentsFeed from "./ui/comments-feed";
import ContextsContainer from "./ui/contexts-container";
import CreateCommentForm from "./ui/create-comment-form";

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="w-full h-screen bg-veryLightGray p-4 py-6 text-grayishBlue flex flex-col gap-4">
      <ContextsContainer {...{ data }}>
        <CommentsFeed />
        <CreateCommentForm />
      </ContextsContainer>
    </main>
  );
}
