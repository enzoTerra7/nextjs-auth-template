import { cn } from "@/lib/utils";

export function Input({
  className,
  id,
  name,
  ...props
}: React.ComponentProps<"input"> & {
  name: string;
}) {
  return (
    <input
      name={name}
      id={id || name}
      className={cn("w-full flex-1 px-1 h-full outline-none", className)}
      {...props}
    />
  );
}
