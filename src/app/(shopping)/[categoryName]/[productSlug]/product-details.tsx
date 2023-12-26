"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CounterButton from "@/app/counter-button";
import PlaceholderImage from "/public/assets/shared/desktop/image-xx59-headphones.jpg";
import RelatedProductPlaceholderImage from "/public/assets/shared/desktop/image-xx99-mark-two-headphones.jpg";

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

function RelatedProductItem() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="bg-seashell rounded-lg w-full mb-8 lg:mb-0 lg:h-full lg:basis-1/2">
        <Image
          src={RelatedProductPlaceholderImage}
          alt="Placeholder"
          className="rounded-lg h-[175px] w-[200px] mx-auto lg:h-[540px] lg:w-[560px]"
        />
      </div>
      <p className="pb-8 text-[1.75rem] font-bold leading-[normal] tracking-[0.0625em] uppercase">
        XX99 Mark II Headphones
      </p>
      <Button variant="default">See Product</Button>
    </div>
  );
}

export default function ProductDetails() {
  const [addedProducts, setAddedProducts] = React.useState<number>(1);
  // const gallery = JSON.parse(imageGallery);
  const gallery = JSON.parse(placeholder_image_gallery);
  console.log({ gallery });
  return (
    <div className="px-6 mx-auto max-w-[1110px]">
      <div className="pb-10">
        <Image
          src={PlaceholderImage}
          alt="Product name"
          className="rounded-lg w-[327px] h-[327px]"
        />
      </div>
      <h1 className="uppercase text-[1.75rem] font-bold leading-[normal] tracking-[0.0625em] max-w-[55%] pb-6">
        XX59 Headphones
      </h1>
      <p className="text-[0.938rem] text-black text-opacity-50 leading-[1.563rem] pb-6">
        Enjoy your audio almost anywhere and customize it to your specific
        tastes with the XX59 headphones. The stylish yet durable versatile
        wireless headset is a brilliant companion at home or on the move.
      </p>
      <p className="font-bold text-black text-[1.125rem] tracking-[0.080375em] pb-6">
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

      <div className="py-[5.5rem]">
        <h2 className="uppercase text-[1.5rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6">
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

      <div className="pb-24">
        <h2 className="uppercase text-[1.5rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6">
          In the box
        </h2>
        <div className="flex flex-col gap-y-2">
          <ProductFeature name="Headphone Unit" quantity={1} />
          <ProductFeature name="Replacement Earcups" quantity={2} />
          <ProductFeature name="User Manual" quantity={1} />
          <ProductFeature name="3.5mm 5m Audio Cable" quantity={1} />
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <div className="relative h-[200px]">
          <picture className="">
            <source media="(min-width:1025px)" srcSet={gallery.first.desktop} />
            <source media="(min-width:768px)" srcSet={gallery.first.tablet} />
            <Image
              src={gallery.first.mobile}
              alt="Product Gallery Image"
              className="w-full rounded-lg"
              fill
            />
          </picture>
        </div>
        <div className="relative h-[200px]">
          <picture className="">
            <source
              media="(min-width:1025px)"
              srcSet={gallery.second.desktop}
            />
            <source media="(min-width:768px)" srcSet={gallery.second.tablet} />
            <Image
              src={gallery.second.mobile}
              alt="Product Gallery Image"
              className="w-full rounded-lg"
              fill
            />
          </picture>
        </div>
        <div className="relative h-[375px]">
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

      <div className="pb-[7.5rem] py-24">
        <h2 className="uppercase text-[1.5rem] text-center font-bold leading-[2.25rem] tracking-[0.0535625em] pb-10">
          You may also like
        </h2>
        <div className="flex flex-col gap-y-14">
          <RelatedProductItem />
          <RelatedProductItem />
          <RelatedProductItem />
        </div>
      </div>
    </div>
  );
}
