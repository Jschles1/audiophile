import prismadb from "@/lib/prisma-db";

export default async function getCategoryProducts(categoryName: string) {
  try {
    const data = await prismadb.category.findFirst({
      where: {
        name: categoryName,
      },
      include: {
        Product: {
          orderBy: {
            new: "desc",
          },
        },
      },
    });

    if (!data || !data.Product) return null;

    return data.Product;
  } catch (error: any) {
    throw new Error("Error fetching products: ", error);
  }
}
