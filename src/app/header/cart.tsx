"use client";

import * as React from "react";
import Link from "next/link";
import CartItem from "../cart-item";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

const Cart = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { cartItems, removeAllProducts } = useStore();
  const hasCartItems = cartItems.length > 0;
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
          onClick={removeAllProducts}
          className="text-black text-opacity-50 underline p-0 normal-case text-[0.938rem] leading-[1.563rem] hover:text-raw-sienna"
        >
          Remove all
        </Button>
      </div>
      <div className="flex flex-col py-8 gap-y-6">
        {hasCartItems &&
          cartItems.map((item) => (
            <CartItem
              variant="cart"
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={item.image}
            />
          ))}
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
        <Button variant="default" className="w-full" disabled={!hasCartItems}>
          Checkout
        </Button>
      </Link>
    </div>
  );
});
Cart.displayName = "Cart";

export default Cart;
