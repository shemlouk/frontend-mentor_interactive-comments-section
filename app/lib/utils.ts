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
    createdAt: new Date().toJSON(),
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

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneWeek = oneDay * 7;
const oneMonth = oneDay * 30;

export function simplifyTime(isoDate: string) {
  const date = new Date(isoDate);
  const timestamp = new Date().getTime() - date.getTime();

  switch (true) {
    case timestamp < oneSecond:
      return "now";
      break;

    case timestamp < oneMinute:
      return `${Math.round(timestamp / oneSecond)} seconds ago`;
      break;

    case timestamp < oneHour:
      return `${Math.round(timestamp / oneMinute)} minutes ago`;
      break;

    case timestamp < oneDay:
      return `${Math.round(timestamp / oneHour)} hours ago`;
      break;

    case timestamp < oneWeek:
      return `${Math.round(timestamp / oneDay)} days ago`;
      break;

    case timestamp < oneMonth:
      return `${Math.round(timestamp / oneWeek)} weeks ago`;
      break;

    case timestamp < oneMonth * 5:
      return `${Math.round(timestamp / oneMonth)} months ago`;
      break;

    default:
      return date.toDateString();
      break;
  }
}
