import getCategoryProductsFromDb from "@/lib/server/getCategoryProductsFromDb";
import getProductDetailFromDb from "@/lib/server/getProductDetailFromDb";
import restockProductsInDb from "@/lib/server/restockProductsInDb";

export async function getCategoryProducts(categoryName: string) {
  return await getCategoryProductsFromDb(categoryName);
}

export async function getProductDetail(productSlug: string) {
  return await getProductDetailFromDb(productSlug);
}

export async function restockProducts() {
  return await restockProductsInDb();
}
