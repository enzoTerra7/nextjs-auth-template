import { cn } from "@/app/_lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl shadow-md space-y-4 p-4 border",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-px">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg xl:text-2xl font-semibold">{children}</h3>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm xl:text-base text-neutral-500">{children}</p>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col gap-2">{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col shrink-0 gap-2">{children}</div>;
}
