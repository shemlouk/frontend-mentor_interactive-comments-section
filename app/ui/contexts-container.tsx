"use client";

import { CommentsContext, UserContext } from "../lib/contexts";
import { Data } from "../lib/definitions";

export default function CommentSection({
  data,
  children,
}: {
  data: Data;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={data.currentUser}>
      <CommentsContext.Provider value={data.comments}>
        {children}
      </CommentsContext.Provider>
    </UserContext.Provider>
  );
}
