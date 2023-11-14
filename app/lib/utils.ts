import { Comment } from "./definitions";

export function generateRandomNumber(max: number) {
  return Math.round(Math.random() * max);
}

type SearchResult = {
  comment?: Comment;
  index: number;
  arr: Comment[];
};

export function findCommentById(searchId: number, comments: Comment[]) {
  let result: SearchResult = { comment: undefined, index: -1, arr: comments };

  comments.forEach((comment, index) => {
    if (comment.id === searchId) {
      result.index = index;
      result.comment = comment;
      return;
    } else if (!!comment.replies?.length) {
      const repliesSearch = findCommentById(searchId, comment.replies);
      if (repliesSearch.index > -1) return (result = repliesSearch);
    }
  });

  return result;
}

export function findCommentParentById(searchId: number, comments: Comment[]) {
  return comments.find(
    ({ id, replies }) =>
      id === searchId || replies?.some(({ id }) => id === searchId)
  );
}

const MAX_ID = 1_000_000;

export function buildComment(
  data?: Pick<Comment, "content" | "user">
): Comment {
  return {
    id: generateRandomNumber(MAX_ID),
    content: data?.content ?? "",
    createdAt: "now",
    score: 0,
    user: data?.user ?? {
      image: {
        png: "",
        webp: "",
      },
      username: "",
    },
    replies: [],
  };
}
