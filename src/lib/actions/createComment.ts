"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};
export async function CreateComment(
  prevstate: ActionState,
  formData: FormData
): Promise<ActionState> {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  if (!content || !postId) {
    return {
      success: false,
      errors: { content: ["コメントまたは投稿IDが足りません"] },
    };
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("不正なリクエストです");
  }

  try {
    await prisma.comment.create({
      data: {
        content,
        userId: userId,
        postId,
      },
    });
    // console.log("✅ コメント保存成功");
  } catch (error) {
    // console.error("❌ コメント保存失敗", error);
    return {
      success: false,
      errors: { content: ["コメントの保存に失敗しました"] },
    };
  }
  redirect(`/posts/${postId}`);
}
