"use client";

import { Button } from "@/components/ui/button";

export default function GoBack() {
  return (
    <div className="mx-auto max-w-[1110px] px-6">
      <Button
        className="relative px-0 pt-4 py-6 capitalize font-normal text-[0.938rem] leading-[1.563rem] text-black hover:text-raw-sienna text-opacity-50"
        aria-label="Go Back"
        variant="ghost"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </div>
  );
}
