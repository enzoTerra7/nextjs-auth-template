import { cn } from "@/app/_lib/utils";

export function FormMessage({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs text-neutral-500 font-medium", className)}
      {...props}
    >
      {children}
    </p>
  );
}
