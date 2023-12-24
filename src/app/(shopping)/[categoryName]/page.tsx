import CategoryHeader from "./category-header";

export default function ProductListingPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const { categoryName } = params;
  return (
    <div className="w-full bg-alabaster">
      <CategoryHeader categoryName={categoryName} />
    </div>
  );
}
