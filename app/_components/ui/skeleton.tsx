import { cn } from "@/app/_lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("bg-muted rounded-md animate-pulse", className)} />;
}
