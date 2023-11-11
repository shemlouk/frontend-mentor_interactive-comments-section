export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: Comment[];
};

export type Data = {
  currentUser: User;
  comments: Comment[];
};

export type ReplyTo = {
  commentId: number;
  username: string;
};
