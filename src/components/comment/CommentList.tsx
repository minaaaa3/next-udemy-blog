import { getComments } from "@/lib/actions/comment";
import { useState } from "react";
import DeleteCommentDialog from "@/components/comment/Delete";
import CommentItem from "@/components/comment/CommentItems";
type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user?: {
    name: string | null;
  } | null;
};
export async function CommentList({ postId }: { postId: string }) {
  const comments = await getComments(postId);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">コメント一覧</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} />
        ))}
      </ul>
    </div>
  );
}
