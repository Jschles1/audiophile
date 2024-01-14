"use client";

import * as React from "react";
import useCartItems from "@/lib/useCartItems";

export default function CartItemCount() {
  const { data } = useCartItems();
  const cartItems = data || [];

  if (!cartItems.length) return null;

  return (
    <div className="rounded-full absolute top-0 right-0 bg-white text-black h-4 w-4 text-xs">
      {cartItems.length}
    </div>
  );
}
