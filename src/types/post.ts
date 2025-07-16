import { create } from "domain";
export type Post = {
  id: string;
  title: string;
  content: string;
  topImage: string | null;
  updatedAt: Date;
  createdAt: Date;
  author: {
    name: string;
  };
};

export type PostCardProps = { post: Post };
