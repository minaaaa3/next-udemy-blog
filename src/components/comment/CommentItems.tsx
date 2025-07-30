"use client";

import { useState } from "react";
import DeleteCommentDialog from "./Delete";

type CommentWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  user?: { name: string | null } | null;
};

export default function CommentItem({
  comment,
  postId,
}: {
  comment: CommentWithUser;
  postId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border p-4 rounded">
      <p className="text-gray-800">{comment.content}</p>
      <p className="text-sm text-gray-500">
        投稿者: {comment.user?.name ?? "匿名"}
      </p>
      <p className="text-sm text-gray-400">
        投稿日: {new Date(comment.createdAt).toLocaleString("ja-JP")}
      </p>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-red-500 underline mt-2"
      >
        削除
      </button>
      <DeleteCommentDialog
        commentId={comment.id}
        postId={postId}
        isOpen={open}
        onOpenChange={setOpen}
      />
    </li>
  );
}
