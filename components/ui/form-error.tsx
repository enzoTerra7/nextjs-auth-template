import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

export function FormError({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-xs text-red-500 font-medium inline-flex items-center",
        className
      )}
      {...props}
    >
      <CircleAlert className="size-4 inline shrink-0 mr-1" /> {children}
    </span>
  );
}
