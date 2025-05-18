import { cn } from "@/app/_lib/utils";
import { CircleAlert } from "lucide-react";

export function FormError({
  error,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  error?: string | string[];
}) {
  if (!error) return null;

  return (
    <span
      className={cn(
        "text-xs text-red-500 font-medium inline-flex items-center",
        className
      )}
      {...props}
    >
      <CircleAlert className="size-4 inline shrink-0 mr-1" />
      {typeof error === "string" ? error : error.join(" ")}
    </span>
  );
}
