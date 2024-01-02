import { notFound } from "next/navigation";
import getCategoryProducts from "@/lib/server/getCategoryProducts";
import AboutAudiofile from "../about-audiofile";
import Categories from "../categories";
import CategoryHeader from "./category-header";
import ProductList from "./product-list";

export default async function ProductListingPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const { categoryName } = params;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const categoryProducts = await getCategoryProducts(categoryName);

  if (categoryProducts === null) {
    notFound();
  }

  console.log({ categoryProducts });
  return (
    <div className="w-full bg-alabaster">
      <CategoryHeader categoryName={categoryName} />
      <ProductList initialData={categoryProducts} categoryName={categoryName} />
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
