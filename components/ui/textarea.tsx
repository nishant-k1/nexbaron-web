import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full border border-border bg-neutral-bg px-3 py-2.5 text-sm text-heading ring-offset-background placeholder:text-muted focus:outline-none focus:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50 rounded-xl",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
