import prismadb from "@/lib/prisma-db";
import { Product, Prisma } from "@prisma/client";

interface ProductResponse {
  id: number;
  slug: string;
  name: string;
  mobileImage: string;
  tabletImage: string;
  desktopImage: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  imageGallery: Prisma.JsonValue;
}

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
