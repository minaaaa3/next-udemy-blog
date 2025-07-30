import { prisma } from "@/lib/prisma";

export async function getComments(postId: string) {
  return await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}
