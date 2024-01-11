import GoBack from "@/app/shared/go-back";
import AboutAudiofile from "../../about-audiofile";
import Categories from "../../categories";
import ProductDetails from "./product-details";
import getProductDetail from "@/lib/server/getProductDetail";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { categoryName: string; productSlug: string };
}) {
  const { productSlug, categoryName } = params;
  const productData = await getProductDetail(productSlug);

  if (!productData) {
    notFound();
  }

  return (
    <div className="w-full bg-alabaster">
      <GoBack />
      <ProductDetails
        categoryName={categoryName}
        productSlug={productSlug}
        initialData={productData}
      />
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
