"use client";
import { SidebarNavItem } from "@/types";
import Link from "next/link";
import { Icon } from "./icon";
import { usePathname } from "next/navigation";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export default function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex flex-col space-y-2">
      {items.map((item, index) => {
        if ("href" in item && item.href && "title" in item) {
          const iconKey = (item.icon || "arrowRight") as keyof typeof Icon;
          const IconComponent = Icon[iconKey];
          return (
            <Link href={item.href} key={index}>
              <span
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                  path === item.href ? "bg-accent" : "bg-transparent"
                }`}
              >
                <IconComponent className="mr-2 h-4 w-4" />
                {item.title}
              </span>
            </Link>
          );
        }
        return null;
      })}
    </nav>
  );
}
