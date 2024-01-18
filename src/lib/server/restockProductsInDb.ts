import prismadb from "@/lib/prisma-db";
import { NextResponse } from "next/server";

export default async function restockProductsInDb() {
  try {
    const restockedProducts = await prismadb.product.updateMany({
      data: {
        quantityInStock: 250,
      },
    });

    console.log(`Restocked ${restockedProducts.count} products`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    throw new Error("Error adding product to cart: ", error);
  }
}
