import prismadb from "@/lib/prisma-db";

export default async function getProductDetail(slug: string) {
  try {
    const data = await prismadb.product.findFirst({
      where: {
        slug,
      },
      include: {
        ProductAddOn: true,
        RelatedProduct: true,
      },
    });

    if (!data) return null;

    return data;
  } catch (error: any) {
    throw new Error("Error fetching product: ", error);
  }
}
