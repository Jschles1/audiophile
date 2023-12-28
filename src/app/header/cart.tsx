"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import CounterButton from "../counter-button";
import CartItem from "../cart-item";
import { Button } from "@/components/ui/button";

const xx99_placeholder =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/da22de76-9f3e-4b4f-fb6c-873ae4bad600/public";
const xx59_placeholder =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/ff2d3b3a-b435-4f46-9764-2ffb3d1e2600/public";
const yx1_placeholder =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/18a6e5ad-f8d3-46c1-f7d9-44500c50e200/public";

// Use zustand to manage the cart state

const Cart = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-[calc(105px+1.5rem)] bg-white w-[calc(100%-3rem)] py-8 px-7 rounded-lg z-60 mx-auto left-0 right-0 md:w-[377px] md:left-auto md:right-6"
    >
      <div className="flex flex-row items-center justify-between z-50 relative">
        <p className="text-black font-bold text-lg tracking-[0.080375em] leading-[normal]">
          Cart (3)
        </p>
        <Button
          variant="ghost"
          className="text-black text-opacity-50 underline p-0 normal-case text-[0.938rem] leading-[1.563rem] hover:text-raw-sienna"
        >
          Remove all
        </Button>
      </div>
      <div className="flex flex-col py-8 gap-y-6">
        <CartItem
          variant="cart"
          name="XX99 Mark II"
          quantity={1}
          price={2999}
          image={xx99_placeholder}
        />

        <CartItem
          variant="cart"
          name="XX59"
          quantity={1}
          price={899}
          image={xx59_placeholder}
        />

        <CartItem
          name="YX1"
          quantity={1}
          price={599}
          image={yx1_placeholder}
          variant="cart"
        />
      </div>
      <div className="pb-6 flex flex-row item-center justify-between">
        <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
          Total
        </p>
        <p className="text-black font-bold text-lg leading-[normal]">
          ${(5496).toLocaleString()}
        </p>
      </div>
      <Link href="/checkout">
        <Button variant="default" className="w-full">
          Checkout
        </Button>
      </Link>
    </div>
  );
});
Cart.displayName = "Cart";

export default Cart;
