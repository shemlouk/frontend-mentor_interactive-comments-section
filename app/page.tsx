import { fetchData } from "./lib/data";
import Comment from "./ui/comment";
import CommentForm from "./ui/comment-form";

export default async function Home() {
  const { comments, currentUser } = await fetchData();

  return (
    <main className="w-full h-screen bg-veryLightGray p-4 py-6 text-grayishBlue flex flex-col gap-4">
      <div className="flex-1 flex flex-col-reverse overflow-y-scroll">
        <ul className="flex flex-col gap-4">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <Comment
                  {...comment}
                  isCurrentUser={comment.user.username === currentUser.username}
                />
                {!!comment.replies.length && (
                  <div className="flex gap-4 mt-4">
                    <div className="items-stretch w-2 rounded-full bg-lightGray" />
                    <ul className="flex flex-col gap-4">
                      {comment.replies.map((reply) => {
                        return (
                          <li key={reply.id}>
                            <Comment
                              {...reply}
                              isCurrentUser={
                                reply.user.username === currentUser.username
                              }
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <CommentForm {...currentUser} />
    </main>
  );
}
