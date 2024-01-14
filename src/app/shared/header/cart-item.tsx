"use client";

import * as React from "react";
import Image from "next/image";
import CounterButton from "../counter-button";
import { cn, truncateProductName } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCartItems from "@/lib/useCartItems";
import { postUpdateCartItemQuantity } from "@/lib/fetchers";

interface CartItemProps {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  variant: "checkout" | "cart";
}

export default function CartItem({
  id,
  name,
  quantity,
  price,
  image,
  variant,
}: CartItemProps) {
  const queryClient = useQueryClient();
  const { cartId } = useCartItems();

  const updateCartItemMutation = useMutation({
    mutationFn: (action: "increment" | "decrement") => {
      const newQuantity = action === "increment" ? quantity + 1 : quantity - 1;
      return postUpdateCartItemQuantity(cartId, {
        id,
        name,
        quantity: newQuantity,
        price,
        image,
        cartId: parseInt(cartId),
      });
    },

    onSuccess: async (_) => {
      await queryClient.refetchQueries({
        queryKey: ["cart", cartId],
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data;
      console.log({ errorMessage });
      // toast({
      //   title: "Something went wrong!",
      //   description: `Error: ${errorMessage}`,
      // });
    },
  });

  return (
    <div
      className={cn(
        "flex flex-row items-center",
        variant === "checkout" && "justify-between w-full"
      )}
    >
      <div>
        <Image
          className="rounded-lg"
          src={image}
          alt={name}
          height={64}
          width={64}
        />
      </div>

      <div className="pl-4 flex-1">
        <p className="text-black text-[0.938rem] leading-[1.563rem]">
          {truncateProductName(name)}
        </p>
        <p className="text-black text-opacity-50 text-sm leading-[1.563rem]">
          ${(price * quantity).toFixed(2).toLocaleString()}
        </p>
      </div>

      {variant === "cart" && (
        <CounterButton
          variant="cart"
          className="w-[96px]"
          onIncrement={() => updateCartItemMutation.mutate("increment")}
          onDecrement={() => updateCartItemMutation.mutate("decrement")}
          value={quantity}
        />
      )}

      {variant === "checkout" && (
        <p className="text-black text-[0.938rem] leading-[1.563rem] text-opacity-50">
          x{quantity}
        </p>
      )}
    </div>
  );
}
