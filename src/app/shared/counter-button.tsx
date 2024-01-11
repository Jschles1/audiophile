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
        className={cn(
          "flex flex-row items-center justify-between bg-seashell",
          className
        )}
      >
        <Button
          className={cn(
            "bg-seashell text-black text-opacity-25 text-[0.813rem] font-bold leading-[normal] tracking-[0.080375em]",
            isPdpVariant && "pl-4 pr-5",
            isCartVariant && "px-[0.75rem]"
          )}
          variant="ghost"
          disabled={value === 0}
          onClick={onDecrement}
        >
          -
        </Button>
        <div
          className={cn(
            "text-black font-bold leading-[normal] tracking-[0.080375em] text-[0.813rem]",
            isPdpVariant && " "
          )}
        >
          {value}
        </div>
        <Button
          className={cn(
            "bg-seashell text-black text-opacity-25 text-[0.813rem] font-bold leading-[normal] tracking-[0.080375em]",
            isPdpVariant && "pr-4 pl-5",
            isCartVariant && "px-[0.75rem]"
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
