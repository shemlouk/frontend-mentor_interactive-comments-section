"use client";

import { useCallback, useEffect, useState } from "react";
import { CommentsContext, UserContext } from "../lib/contexts";
import { Comment, Data } from "../lib/definitions";
import { findCommentById } from "../lib/utils";

export default function CommentSection({
  data,
  children,
}: {
  data: Data;
  children: React.ReactNode;
}) {
  const [comments, setComments] = useState(data.comments);

  useEffect(() => setComments(data.comments), [data.comments]);

  const updateComments = useCallback(
    (newComment: Comment, replyCommentId?: number) => {
      if (replyCommentId) {
        const { comment, arr } = findCommentById(replyCommentId, comments);
        (comment?.replies ?? arr).push(newComment);
      } else {
        comments.push(newComment);
      }

      setComments([...comments]);
    },
    [comments]
  );

  return (
    <UserContext.Provider value={data.currentUser}>
      <CommentsContext.Provider value={{ comments, updateComments }}>
        {children}
      </CommentsContext.Provider>
    </UserContext.Provider>
  );
}
