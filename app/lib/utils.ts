import { Comment } from "./definitions";

export function generateRandomId() {
  const maxId = 1000;
  return Math.round(Math.random() * maxId);
}

export function findCommentById(searchId: number, comments: Comment[]) {
  return comments.find(
    ({ id, replies }) =>
      id === searchId || replies?.some(({ id }) => id === searchId)
  );
}
