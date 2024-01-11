import { Skeleton } from "@/components/ui/skeleton";
import Categories from "../../categories";
import AboutAudiofile from "../../about-audiofile";
import ProductDetailsSkeletons from "./product-details-skeletons";

export default function Loading() {
  return (
    <div className="w-full bg-alabaster">
      <div className="mx-auto max-w-[1110px] px-6 pt-4 py-6 md:pt-[2.063rem]">
        <Skeleton className="h-[40px] w-[65px]" />
      </div>
      <ProductDetailsSkeletons />
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
