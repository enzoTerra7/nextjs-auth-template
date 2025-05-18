import { cn } from "@/app/_lib/utils";

export function FieldWrapper({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-1 rounded-lg gap-x-2 border p-2 px-3 h-12 items-center transition-all duration-300 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-transparent focus-within:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
