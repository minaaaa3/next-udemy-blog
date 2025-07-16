import { notFound } from "next/navigation";
import { getPost } from "@/lib/post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
type Params = {
  params: { id: string };
};
export default async function PostPage({ params }: Params) {
  const { id } = params;
  console.log("記事ID:", id);
  const post = await getPost(id);
  console.log("記事内容:", post);
  console.log(post);

  if (!post) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        {post.topImage && (
          <div className="relative h-48 w-full lg:h-96">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
              priority
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <div className="flex justify-between items-center mb-4 px-6">
          <p className="text-sm text-gray-500">投稿者:{post.author.name}</p>
          <time className="text-sm text-gray-500">
            {format(new Date(post.createdAt), `yyyy年MM月dd日`, { locale: ja })}
          </time>
        </div>
        <CardContent>{post.content}</CardContent>
      </Card>
    </div>
  );
}
