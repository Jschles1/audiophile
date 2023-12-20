"use client";

import Image from "next/image";
import CartIcon from "/public/assets/shared/desktop/icon-cart.svg";
import { Button } from "@/components/ui/button";

export default function Cart() {
  // TODO: Implement dialog
  return (
    <Button className="relative p-0" aria-label="Cart" variant="ghost">
      <Image src={CartIcon} alt="Cart Icon" />
    </Button>
  );
}
