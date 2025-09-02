import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Icon } from "./icon";

export default function UserAuthForm() {
  return (
    <div className="grid gap-6">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" placeholder="name@example.com" type="email" />
          </div>
          <button className={cn(buttonVariants())}>
            メールアドレスでログイン
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 text-muted-foreground bg-background">
            または
          </span>
        </div>
      </div>

      <button className={cn(buttonVariants({ variant: "outline" }))}>
        <Icon.github className="mr-2" />
        Github
      </button>
    </div>
  );
}
