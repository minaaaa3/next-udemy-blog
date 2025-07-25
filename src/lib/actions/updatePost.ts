"use server";
import { postSchema } from "../validations/post";
import { saveImage } from "@/utils/image";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { beforeEach } from "node:test";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};
export async function updatePost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;
  const postId = formData.get("postId") as string;
  const published = formData.get("published") === "true";
  const oldImageUrl = formData.get("oldImageUrl") as string;
  const validationResult = postSchema.safeParse({ title, content, topImage });
  console.log(validationResult);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  let imageUrl = oldImageUrl;
  if (
    topImage instanceof File &&
    topImage.size > 0 &&
    topImage.name !== "undefined"
  ) {
    const newImageUrl = await saveImage(topImage);
    if (!newImageUrl) {
      return {
        success: false,
        errors: { image: ["画像の保存に失敗しました"] },
      };
    }
    imageUrl = newImageUrl;
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      published,
      topImage: imageUrl,
    },
  });

  redirect("/dashboard");
}
