import { cn } from "@/app/_lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return <table className={cn("w-full", className)} {...props} />;
}

export function TableHead({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead className={cn("border-b last:border-none", className)} {...props} />
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "p-2 text-neutral-600 dark:text-neutral-400 font-semibold text-sm tracking-tight text-left",
        className
      )}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr className={cn("border-b last:border-none", className)} {...props} />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "p-2 text-card-foreground text-base font-medium",
        className
      )}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody className={cn("border-b last:border-none", className)} {...props} />
  );
}

export function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return <tfoot className={cn("", className)} {...props} />;
}
