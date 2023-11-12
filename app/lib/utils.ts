import { Comment } from "./definitions";

export function generateRandomNumber(max: number) {
  return Math.round(Math.random() * max);
}

export function findCommentById(searchId: number, comments: Comment[]) {
  let searchResult: Comment | undefined;

  comments.forEach((comment) => {
    if (comment.id === searchId) {
      return (searchResult = comment);
    } else if (!!comment.replies?.length) {
      const result = findCommentById(searchId, comment.replies);
      if (result) return (searchResult = result);
    }
  });

  return searchResult;
}

export function findCommentParentById(searchId: number, comments: Comment[]) {
  return comments.find(
    ({ id, replies }) =>
      id === searchId || replies?.some(({ id }) => id === searchId)
  );
}
