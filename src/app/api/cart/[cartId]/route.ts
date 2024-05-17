import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@prisma/client";
import {
  removeAllCartItems,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
} from "@/api";

export async function GET(
  req: NextRequest,
  { params }: { params: { cartId: string } }
) {
  try {
    const cartItems = await getCartItems(params.cartId);

    return NextResponse.json(cartItems);
  } /* v8 ignore next 2 */ catch (error) {
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
  } /* v8 ignore next 2 */ catch (error) {
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
  } /* v8 ignore next 2 */ catch (error) {
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
  } /* v8 ignore next 2 */ catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
