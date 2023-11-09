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
};

export type Data = {
  currentUser: User;
  comments: (Comment & { replies: Comment[] })[];
};
