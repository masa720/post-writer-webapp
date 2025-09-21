"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icon } from "./icon";
import { type VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostCreateButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Untitled Post" }),
    });

    setIsLoading(false);

    if (!response.ok) {
      return toast.error("問題が発生しました。", {
        description: "投稿が作成されませんでした。もう一度お試しください。",
      });
    }

    const post = await response.json();

    router.refresh();
    router.push(`/editor/${post.id}`);
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": isLoading },
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon.spinner className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Icon.add className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </button>
  );
}
