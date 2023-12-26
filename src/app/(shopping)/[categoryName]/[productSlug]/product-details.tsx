"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CounterButton from "@/app/counter-button";
import { cn } from "@/lib/utils";

const mobile_placeholder_image =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/ff2d3b3a-b435-4f46-9764-2ffb3d1e2600/public";
const tablet_placeholder_image =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/fa21b5a5-9372-4514-07ef-36ff5834a100/public";
const desktop_placeholder_image =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/884c5a2c-4f0d-49b9-4313-3e5f889a8000/public";
const placeholder_image_gallery =
  '{"first":{"mobile":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/dc7f6bfd-5a79-4b84-2d9d-dee5d9d96300/public","tablet":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/e0bed1f9-4522-4d82-fbe4-8d903ccc8c00/public","desktop":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/6195f602-f747-4a6d-9358-95234cd80500/public"},"second":{"mobile":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/0ea8ed3a-25f2-430e-49a2-4386cc2d3600/public","tablet":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/d8d17025-e963-4ca7-0a19-fad88059c200/public","desktop":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/f94cac4c-811f-4c24-7a98-85484be9b700/public"},"third":{"mobile":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/c0007c19-f2a4-43a1-eb64-cc69067b2c00/public","tablet":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/ca617d7d-8dff-4f59-3851-28274bda6a00/public","desktop":"https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/025eb5d9-bdc1-42b4-eb87-8dd08c46d700/public"}}';

function ProductFeature({
  name,
  quantity,
}: {
  name: string;
  quantity: number;
}) {
  return (
    <div className="flex items-center gap-x-6">
      <p className="text-[0.938rem] text-raw-sienna leading-[1.563rem]">
        {quantity}x
      </p>
      <p className="text-[0.938rem] text-black text-opacity-50 leading-[1.563rem]">
        {name}
      </p>
    </div>
  );
}

function RelatedProductItem({
  name,
  mobileImage,

  desktopImage,
  tabletImage,
  productSlug,
  categoryName,
}: {
  name: string;
  mobileImage: string;
  desktopImage: string;
  tabletImage: string;
  productSlug: string;
  categoryName: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center flex-1">
      <div className="bg-seashell rounded-lg w-full mb-8">
        <div className="bg-seashell rounded-lg md:py-[3.875rem] md:px-[2.313rem]">
          <div className="relative h-[130px] md:h-[225px] w-full">
            <picture className="">
              <source media="(min-width:1025px)" srcSet={desktopImage} />
              <source media="(min-width:768px)" srcSet={tabletImage} />
              <Image
                src={mobileImage}
                alt="Product Gallery Image"
                className="w-full rounded-lg"
                fill
              />
            </picture>
          </div>
        </div>
      </div>
      <p className="pb-8 text-[1.75rem] md:text-2xl font-bold leading-[normal] tracking-[0.0625em] uppercase">
        {name}
      </p>
      <Link href={`/${categoryName}/${productSlug}`}>
        <Button variant="default">See Product</Button>
      </Link>
    </div>
  );
}

export default function ProductDetails({
  categoryName,
}: {
  categoryName: string;
}) {
  const [addedProducts, setAddedProducts] = React.useState<number>(1);
  // const gallery = JSON.parse(imageGallery);
  const gallery = JSON.parse(placeholder_image_gallery);
  // const isNew = product.isNew;
  const isNew = true;
  // const isNew = false;
  return (
    <div className="px-6 mx-auto max-w-[1110px]">
      <div className="md:flex md:flex-row md:items-center">
        <div className={cn("md:p-0", isNew ? "pb-8" : "pb-10")}>
          <div className="relative h-[327px] md:h-[490px] md:w-[281px]">
            <picture className="">
              <source
                media="(min-width:1025px)"
                srcSet={desktop_placeholder_image}
              />
              <source
                media="(min-width:768px)"
                srcSet={tablet_placeholder_image}
              />
              <Image
                src={mobile_placeholder_image}
                alt="Product Gallery Image"
                className="w-full rounded-lg"
                fill
              />
            </picture>
          </div>
        </div>

        <div className="md:py-[2.813rem] md:pl-[4.375rem]">
          {isNew && (
            <p className="text-raw-sienna uppercase font-normal text-sm tracking-[0.625em] leading-[normal] pb-8 md:text-xs md:pb-4">
              New Product
            </p>
          )}
          <h1 className="uppercase text-[1.75rem] font-bold leading-[normal] tracking-[0.0625em] max-w-[55%] pb-6 md:pb-8">
            XX59 Headphones
          </h1>
          <p className="text-[0.938rem] text-black text-opacity-50 leading-[1.563rem] pb-6 md:pb-8">
            Enjoy your audio almost anywhere and customize it to your specific
            tastes with the XX59 headphones. The stylish yet durable versatile
            wireless headset is a brilliant companion at home or on the move.
          </p>
          <p className="font-bold text-black text-[1.125rem] tracking-[0.080375em] pb-6 md:pb-8">
            <span className="mr-2">$</span>
            {(1000).toLocaleString()}
          </p>
          <div className="flex items-center gap-x-4">
            <CounterButton
              variant="pdp"
              onIncrement={() => setAddedProducts((prev) => prev + 1)}
              onDecrement={() => setAddedProducts((prev) => prev - 1)}
              value={addedProducts}
            />
            <Button variant="default" disabled={addedProducts === 0}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="py-[5.5rem] md:py-[7.5rem]">
        <h2 className="uppercase text-[1.5rem] md:text-[2rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6 md:pb-8">
          Features
        </h2>
        <p className="text-black text-opacity-50 leading-[1.563rem] text-[0.938rem]">
          As the headphones all others are measured against, the XX99 Mark I
          demonstrates over five decades of audio expertise, redefining the
          critical listening experience. This pair of closed-back headphones are
          made of industrial, aerospace-grade materials to emphasize durability
          at a relatively light weight of 11 oz. From the handcrafted microfiber
          ear cushions to the robust metal headband with inner damping element,
          the components work together to deliver comfort and uncompromising
          sound. Its closed-back design delivers up to 27 dB of passive noise
          cancellation, reducing resonance by reflecting sound to a dedicated
          absorber. For connectivity, a specially tuned cable is included with a
          balanced gold connector.
        </p>
      </div>

      <div className="pb-24 md:pb-[7.5rem] md:flex md:flex-row md:items-start md:justify-between md:w-[80%]">
        <h2 className="uppercase text-[1.5rem] md:text-[2rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6">
          In the box
        </h2>
        <div className="flex flex-col gap-y-2">
          <ProductFeature name="Headphone Unit" quantity={1} />
          <ProductFeature name="Replacement Earcups" quantity={2} />
          <ProductFeature name="User Manual" quantity={1} />
          <ProductFeature name="3.5mm 5m Audio Cable" quantity={1} />
        </div>
      </div>

      <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6">
        <div className="flex flex-col gap-y-6 md:basis-[30%]">
          <div className="relative h-[188px] md:w-[300px]">
            <picture className="">
              <source
                media="(min-width:1025px)"
                srcSet={gallery.first.desktop}
              />
              <source media="(min-width:768px)" srcSet={gallery.first.tablet} />
              <Image
                src={gallery.first.mobile}
                alt="Product Gallery Image"
                className="w-full rounded-lg"
                fill
              />
            </picture>
          </div>
          <div className="relative h-[188px] md:w-[300px]">
            <picture className="">
              <source
                media="(min-width:1025px)"
                srcSet={gallery.second.desktop}
              />
              <source
                media="(min-width:768px)"
                srcSet={gallery.second.tablet}
              />
              <Image
                src={gallery.second.mobile}
                alt="Product Gallery Image"
                className="w-full rounded-lg"
                fill
              />
            </picture>
          </div>
        </div>

        <div className="relative h-[400px] md:basis-[60%] lg:basis-auto lg:flex-1">
          <picture className="">
            <source media="(min-width:1025px)" srcSet={gallery.third.desktop} />
            <source media="(min-width:768px)" srcSet={gallery.third.tablet} />
            <Image
              src={gallery.third.mobile}
              alt="Product Gallery Image"
              className="w-full rounded-lg"
              fill
            />
          </picture>
        </div>
      </div>

      <div className="pb-[7.5rem] py-24 md:pb-[10.75rem]">
        <h2 className="uppercase text-[1.5rem] md:text-[2rem] text-center font-bold leading-[2.25rem] tracking-[0.0535625em] pb-10">
          You may also like
        </h2>
        <div className="flex flex-col gap-y-14 md:flex-row md:items-center md:gap-x-[0.688rem] ">
          <RelatedProductItem
            categoryName={categoryName}
            name="XX99 Mark I"
            productSlug="xx99-mark-one-headphones"
            mobileImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/cd417cd8-22d5-482e-b219-a7092f8b6b00/public"
            desktopImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/e70bfa57-4c74-4f99-8d1a-a3747638e600/public"
            tabletImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/d3d64d4f-8af7-4f94-a2f2-914b25724700/public"
          />
          <RelatedProductItem
            categoryName={categoryName}
            name="XX59"
            productSlug="xx59-headphones"
            mobileImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/fc1b38c5-ba24-42b6-c53d-1c906e114d00/public"
            desktopImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/99ca669a-2a25-47f9-0ac9-51ac3f315100/public"
            tabletImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/2adcb545-9d7a-4f64-4b8f-7ea8b1de6200/public"
          />
          <RelatedProductItem
            categoryName={categoryName}
            name="ZX9 Speaker"
            productSlug="zx9-speaker"
            mobileImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/70e16a34-e6fe-4390-78f6-80bddd848800/public"
            desktopImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/2b872dfc-e207-4b9b-4d30-988fa066ff00/public"
            tabletImage="https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/4c65d9e8-c8d0-4388-bae9-f0e28e550300/public"
          />
        </div>
      </div>
    </div>
  );
}
