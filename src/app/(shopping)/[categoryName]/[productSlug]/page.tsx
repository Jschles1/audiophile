import Image from "next/image";
import GoBack from "@/app/go-back";
import AboutAudiofile from "../../about-audiofile";
import Categories from "../../categories";
import ProductDetails from "./product-details";

export default function ProductListingPage({
  params,
}: {
  params: { categoryName: string; productSlug: string };
}) {
  const { productSlug, categoryName } = params;
  return (
    <div className="w-full bg-alabaster">
      <GoBack />
      <ProductDetails categoryName={categoryName} />
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
