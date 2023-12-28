import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[56px] w-full rounded-lg border border-input-border bg-white px-6 py-[1.125rem] text-sm focus-visible:outline-none focus-visible:border-raw-sienna focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !!error && "border-red",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
