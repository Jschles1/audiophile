import prismadb from "@/lib/prisma-db";
import { CartItem } from "@prisma/client";
import { NextResponse } from "next/server";

export default async function updateCartItemQuantityInDb(
  cartId: string,
  cartItem: CartItem
) {
  if (!cartItem) {
    return new NextResponse("No cart item provided", { status: 400 });
  }
  if (cartItem.quantityInStock === 0) {
    return new NextResponse("Item is out of stock", { status: 400 });
  }
  try {
    let cart;
    if (!cartId) {
      throw new Error("cartId not found");
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
      if (cartItem.quantity === 0) {
        await prismadb.cartItem.delete({
          where: {
            id: existingItem.id,
          },
        });
      } else {
        await prismadb.cartItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: cartItem.quantity,
          },
        });
      }

      return NextResponse.json({ success: true, cartId: cart.id });
    } else {
      throw new Error("Cannot update quantity of non-existent cart item");
    }
  } catch (error: any) {
    throw new Error("Error adding product to cart: ", error);
  }
}
