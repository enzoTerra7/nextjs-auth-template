"use client";

import Link from "next/link";
import { type NavItem } from "./nav.definitions";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/utils";

export function NavItem(item: NavItem) {
  const pathname = usePathname();
  const isActive = item.partialMatch
    ? pathname.startsWith(item.href)
    : pathname === item.href;

  return (
    <Link
      className={cn(
        "w-full flex items-center gap-2 p-2 transition-colors duration-300 rounded-md hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}
      href={item.href}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
}
