import { cn } from "@/app/_lib/utils";
import { PropsWithChildren } from "react";

export function PageTitle({
  title,
  description,
  children,
  borderPosition = "bottom",
}: PropsWithChildren & {
  title: string;
  description: string;
  borderPosition?: "top" | "bottom";
}) {
  return (
    <>
      <div
        className={cn(
          "flex flex-col items-start justify-start lg:items-center lg:justify-center md:flex-row gap-2",
          borderPosition === "bottom" && "border-b pb-2",
          borderPosition === "top" && "border-t pt-2"
        )}
      >
        <div className="flex flex-col text-start items-start gap-1 flex-1">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {children && (
          <div className="flex w-fit gap-2 items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </>
  );
}
