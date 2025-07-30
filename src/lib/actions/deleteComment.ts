"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
  postId?: string;
};

export async function deleteComment(commentId: string, postId: string) {
  await prisma.comment.delete({
    where: { id: commentId },
  });
  redirect(`/posts/${postId}`);
}
