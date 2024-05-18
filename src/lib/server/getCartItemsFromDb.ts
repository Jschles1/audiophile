import prismadb from "@/lib/prisma-db";

export default async function getCartItemsFromDb(cartId: string) {
  if (!cartId) return [];
  try {
    const cart = await prismadb.cart.findFirst({
      where: {
        id: parseInt(cartId),
      },
      include: {
        items: true,
      },
    });

    if (!cart || !cart.items) return [];

    return cart.items;
  } /* v8 ignore next 2 */ catch (error: any) {
    throw new Error("Error fetching products: ", error);
  }
}
