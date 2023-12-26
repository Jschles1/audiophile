"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CounterButtonProps {
  variant: "pdp" | "cart";
  className?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  value: number;
}

const CounterButton = React.forwardRef<HTMLDivElement, CounterButtonProps>(
  ({ variant, className, onIncrement, onDecrement, value }, ref) => {
    const isPdpVariant = variant === "pdp";
    const isCartVariant = variant === "cart";
    return (
      <div
        ref={ref}
        className={cn("flex flex-row items-center bg-seashell", className)}
      >
        <Button
          className={cn(
            "bg-seashell",
            isPdpVariant &&
              "pl-4 pr-5 text-[0.813rem] font-bold leading-[normal] tracking-[0.080375em]"
          )}
          variant="ghost"
          disabled={value === 0}
          onClick={onDecrement}
        >
          -
        </Button>
        <div
          className={cn(
            "text-black",
            isPdpVariant &&
              "text-[0.813rem] font-bold leading-[normal] tracking-[0.080375em]"
          )}
        >
          {value}
        </div>
        <Button
          className={cn(
            "bg-seashell",
            isPdpVariant &&
              "pr-4 pl-5 text-[0.813rem] font-bold leading-[normal] tracking-[0.080375em]"
          )}
          variant="ghost"
          onClick={onIncrement}
        >
          +
        </Button>
      </div>
    );
  }
);
CounterButton.displayName = "CounterButton";

export default CounterButton;
