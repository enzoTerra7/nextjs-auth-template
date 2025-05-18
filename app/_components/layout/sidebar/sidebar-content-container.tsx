import { cn } from "@/app/_lib/utils";

export function SidebarContentContainer({
  children,
  className,
  customComp,
}: {
  children: React.ReactNode;
  className?: string;
  customComp?: keyof React.JSX.IntrinsicElements;
}) {
  const Comp = customComp || "div";
  return (
    <Comp className={cn("w-full p-4 flex flex-col gap-4", className)}>
      {children}
    </Comp>
  );
}
