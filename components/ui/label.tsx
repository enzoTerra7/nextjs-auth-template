import { cn } from "@/lib/utils";

export function Label({
  children,
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </label>
  );
}
