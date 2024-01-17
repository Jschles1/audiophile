import prismadb from "@/lib/prisma-db";
import { Cart, CartItem } from "@prisma/client";
import { NextResponse } from "next/server";

export default async function addCartItemToDb(
  cartId: string,
  cartItem: CartItem
) {
  try {
    let cart;
    if (!cartId || cartId === "new") {
      // Create a new cart
      cart = await prismadb.cart.create({
        include: {
          items: true,
        },
      });
    } else {
      cart = await prismadb.cart.findFirst({
        where: {
          id: parseInt(cartId),
        },
        include: {
          items: true,
        },
      });
    }

    if (!cart) {
      throw new Error("cartId not found");
    }

    const existingItem = cart.items.find((item) => item.id === cartItem.id);

    if (existingItem) {
      await prismadb.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + cartItem.quantity,
        },
      });
    } else {
      await prismadb.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: {
            create: {
              image: cartItem.image,
              name: cartItem.name,
              price: cartItem.price,
              quantity: cartItem.quantity,
            },
          },
        },
      });
    }

    return NextResponse.json({ success: true, cartId: cart.id });
  } catch (error: any) {
    throw new Error("Error adding product to cart: ", error);
  }
}
