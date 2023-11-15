"use client";

import { useCallback, useEffect, useState } from "react";
import { CommentsContext, UserContext } from "../lib/contexts";
import { Comment, Data } from "../lib/definitions";
import * as utils from "../lib/utils";

const {
  generateRandomNumber,
  findCommentById,
  getLocalData,
  setLocalData,
  buildComment,
} = utils;

const ANIMATION_DELAY = () => generateRandomNumber(3000);

const COMMENTS_PLACEHOLDER = [0, 0, 0, 0].map((_, i) => {
  const placeholderComment = buildComment();
  placeholderComment.id = -1 - i;
  return placeholderComment;
});

export default function CommentSection({
  data,
  children,
}: {
  data: Data;
  children: React.ReactNode;
}) {
  const [comments, setComments] = useState(COMMENTS_PLACEHOLDER);

  useEffect(() => {
    const localData = getLocalData();

    if (localData) {
      setComments(localData.comments);
    } else {
      setLocalData(data);
      setComments(data.comments);
    }
  }, [data]);

  const updateComments = useCallback(
    (placeholder: Comment, id?: number) => {
      if (id) {
        const { comment, arr } = findCommentById(id, comments);
        (comment?.replies ?? arr).push(placeholder);
      } else {
        comments.push(placeholder);
      }

      setComments([...comments]);

      setTimeout(() => {
        const localData = getLocalData();
        if (localData) setComments(localData.comments);
      }, ANIMATION_DELAY());
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
