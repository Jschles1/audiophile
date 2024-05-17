"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategorieProducts } from "@/lib/fetchers";
import ProductListingItem from "./product-listing-item";
import { Product } from "@prisma/client";
import ProductListSkeletons from "./product-list-skeletons";

interface ProductListProps {
  initialData: Product[];
  categoryName: string;
}

export default function ProductList({
  initialData,
  categoryName,
}: ProductListProps) {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["categoryProducts", categoryName],
    queryFn: () => fetchCategorieProducts(categoryName),
    initialData: initialData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  /* v8 ignore next 3 */
  if (isLoading || isFetching || isRefetching) {
    return <ProductListSkeletons />;
  }

  return (
    <div className="flex flex-col px-6 gap-y-[7.5rem] pb-[10.75rem] pt-16 md:pt-[7.5rem] mx-auto max-w-[1110px]">
      {data?.map((product: Product, index: number) => (
        <ProductListingItem
          key={product.id}
          index={index}
          name={product.name}
          description={product.description}
          href={`/${categoryName}/${product.slug}`}
          isNew={product.new}
          image={product.desktopImage}
        />
      ))}
    </div>
  );
}
