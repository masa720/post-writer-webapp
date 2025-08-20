import { allPosts } from "@/.contentlayer/generated";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Mdx from "@/components/mdx-component";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

const getPostFromSlug = async (slug: string) => {
  const posts = allPosts.find((post) => post.slugAsParams === slug);
  return posts;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPostFromSlug(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: page.image ? [page.image] : [],
      creator: "@XXX",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = await getPostFromSlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl py-6 lg:py-10">
      <div>
        {post.date && <time>Publish on {format(post.date, "yyyy/MM/dd")}</time>}
        <h1 className="mt-2 font-extrabold text-4xl lg:text-5xl leading-tight">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 border bg-muted"
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="py-6 text-center lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          全ての記事を見る
        </Link>
      </div>
    </article>
  );
}
