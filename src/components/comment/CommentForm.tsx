"use client";

import { useState, useActionState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { CreateComment } from "@/lib/actions/createComment";

type Props = {
  postId: string;
};

export function CommentForm({ postId }: Props) {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [state, formAction] = useActionState(CreateComment, {
    success: false,
    errors: {},
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  return (
    <form action={formAction} className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">コメント</h1>
      <input type="hidden" name="postId" value={postId} />
      <TextareaAutosize
        id="content"
        name="content"
        placeholder="コメントを入力してください"
        className="w-full border p-2"
        value={content}
        onChange={handleContentChange}
        minRows={3}
      />

      <div className="text-right text-sm text-gray-500 mt-1">
        文字数: {contentLength}
      </div>

      <Button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        コメントを投稿する
      </Button>
    </form>
  );
}
