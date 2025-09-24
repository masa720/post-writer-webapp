import Editor from "@/components/editor";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

interface EditorPageProps {
  params: Promise<{
    postId: string;
  }>;
}

async function getPostForUser(postId: string, userId: string) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return post;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const userId = user?.id;

  const { postId } = await params;
  const post = await getPostForUser(postId, userId);

  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post?.id,
        title: post?.title,
        content: post?.content,
        published: post?.published,
      }}
    />
  );
}
