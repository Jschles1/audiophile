"use client";

import * as React from "react";
import Categories from "../categories";
import AboutAudiofile from "../about-audiofile";
import { Skeleton } from "@/components/ui/skeleton";
import ProductListSkeletons from "./product-list-skeletons";

export default function Loading() {
  return (
    <div className="w-full bg-alabaster">
      <div className="bg-black text-white uppercase text-center font-bold text-[1.75rem] md:text-[2.5rem] py-8 md:pt-[6.563rem] md:pb-[6.063rem]">
        Loading...
      </div>
      <ProductListSkeletons />
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
