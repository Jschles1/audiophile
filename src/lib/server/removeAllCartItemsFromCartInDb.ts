import prismadb from "@/lib/prisma-db";
import { NextResponse } from "next/server";

export default async function removeAllCartItemsFromCartInDb(cartId: string) {
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

    await prismadb.cartItem.deleteMany({
      where: {
        cartId: parseInt(cartId),
      },
    });

    return NextResponse.json({ success: true, cartId: cart.id });
  } catch (error: any) {
    throw new Error("Error removing cart items: ", error);
  }
}
