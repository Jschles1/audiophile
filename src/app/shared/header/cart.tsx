"use client";

import * as React from "react";
import Link from "next/link";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import useCartItems from "@/lib/useCartItems";
import { CartItem as CartItemModel } from "@prisma/client";
import { useCookies } from "next-client-cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRemoveAllCartItems } from "@/lib/fetchers";

const Cart = React.forwardRef<HTMLDivElement>((_, ref) => {
  const cookies = useCookies();
  const { data, cartId } = useCartItems();
  const queryClient = useQueryClient();
  const cartItems: CartItemModel[] = data || [];
  const hasCartItems = cartItems.length > 0;
  const total = hasCartItems
    ? cartItems.reduce((a, b) => a + b.price * b.quantity, 0)
    : 0;

  const removeCartItemsMutation = useMutation({
    mutationFn: () => deleteRemoveAllCartItems(cartId),
    onSuccess: async (_) => {
      await queryClient.refetchQueries({
        queryKey: ["cart", cartId],
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data;
      // toast({
      //   title: "Something went wrong!",
      //   description: `Error: ${errorMessage}`,
      // });
    },
  });

  return (
    <div
      ref={ref}
      className="absolute top-[calc(105px+1.5rem)] bg-white w-[calc(100%-3rem)] py-8 px-7 rounded-lg z-60 mx-auto left-0 right-0 md:w-[377px] md:left-auto md:right-6"
    >
      <div className="flex flex-row items-center justify-between z-50 relative">
        <p className="text-black font-bold text-lg tracking-[0.080375em] leading-[normal]">
          Cart ({cartItems.length})
        </p>
        <Button
          variant="ghost"
          onClick={() => removeCartItemsMutation.mutate()}
          className="text-black text-opacity-50 underline p-0 normal-case text-[0.938rem] leading-[1.563rem] hover:text-raw-sienna"
        >
          Remove all
        </Button>
      </div>
      <div className="flex flex-col py-8 gap-y-6">
        {hasCartItems ? (
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
          ))
        ) : (
          <div className="h-full flex items-center text-center text-black text-opacity-50 w-auto">
            Your cart is empty.
          </div>
        )}
      </div>
      <div className="pb-6 flex flex-row item-center justify-between">
        <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
          Total
        </p>
        <p className="text-black font-bold text-lg leading-[normal]">
          ${total.toLocaleString()}
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
