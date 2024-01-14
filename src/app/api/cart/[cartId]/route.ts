import getCartItems from "@/lib/server/getCartItems";
import addCartItem from "@/lib/server/addCartItem";
import updateCartItemQuantity from "@/lib/server/updateCartItemQuantity";
import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@prisma/client";
import removeAllCartItems from "@/lib/server/removeAllCartItems";

export async function GET(
  req: NextRequest,
  { params }: { params: { cartId: string } }
) {
  try {
    const cartItems = await getCartItems(params.cartId);

    return NextResponse.json(cartItems);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { cartId: string } }
) {
  try {
    const body = (await req.json()) as CartItem;
    const cart = await addCartItem(params.cartId, body);

    return cart;
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { cartId: string } }
) {
  try {
    const body = (await req.json()) as CartItem;
    const cart = await updateCartItemQuantity(params.cartId, body);

    return NextResponse.json(cart);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { cartId: string } }
) {
  try {
    const result = await removeAllCartItems(params.cartId);

    return result;
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
