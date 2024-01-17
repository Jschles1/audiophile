import getCategoryProductsFromDb from "@/lib/server/getCategoryProductsFromDb";
import getProductDetailFromDb from "@/lib/server/getProductDetailFromDb";

export async function getCategoryProducts(categoryName: string) {
  return await getCategoryProductsFromDb(categoryName);
}

export async function getProductDetail(productSlug: string) {
  return await getProductDetailFromDb(productSlug);
}
