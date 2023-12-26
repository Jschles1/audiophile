import AboutAudiofile from "../about-audiofile";
import Categories from "../categories";
import CategoryHeader from "./category-header";
import ProductListingItem from "./product-listing-item";

export default function ProductListingPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const { categoryName } = params;
  return (
    <div className="w-full bg-alabaster">
      <CategoryHeader categoryName={categoryName} />
      <div className="flex flex-col px-6 gap-y-[7.5rem] pb-[10.75rem] pt-16 md:pt-[7.5rem] mx-auto max-w-[1110px]">
        <ProductListingItem
          index={0}
          name="test"
          description="test"
          href="test"
          isNew={true}
          image="test"
        />
        <ProductListingItem
          index={1}
          name="test"
          description="test"
          href="test"
          isNew={true}
          image="test"
        />
        <ProductListingItem
          index={2}
          name="test"
          description="test"
          href="test"
          isNew={true}
          image="test"
        />
      </div>
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
