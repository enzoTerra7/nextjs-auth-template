import { cn } from "@/app/_lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const messageAlertVariants = cva(
  "w-full flex items-center justify-center border-b text-balance text-center gap-2 py-4 px-4 md:px-6 lg:px-8 xl:px-10 ",
  {
    variants: {
      variant: {
        default: "bg-accent border-accent-foreground text-accent-foreground",
        destructive:
          "bg-rose-700 border-destructive-foreground text-destructive-foreground font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface MessageAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageAlertVariants> {}

const MessageAlert = React.forwardRef<HTMLDivElement, MessageAlertProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        className={cn(messageAlertVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MessageAlert.displayName = "MessageAlert";

export { MessageAlert, messageAlertVariants };
