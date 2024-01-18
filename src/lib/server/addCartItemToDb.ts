import prismadb from "@/lib/prisma-db";
import { CartItem } from "@prisma/client";
import { NextResponse } from "next/server";

export default async function addCartItemToDb(
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
      return new NextResponse("cartId not found", { status: 404 });
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
              quantityInStock: cartItem.quantityInStock,
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
