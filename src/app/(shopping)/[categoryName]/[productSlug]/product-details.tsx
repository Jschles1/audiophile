"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductAddOn, RelatedProduct } from "@prisma/client";
import { Loader2 } from "lucide-react";
import useStore from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CounterButton from "@/app/counter-button";
import { cn } from "@/lib/utils";
import ConfirmationIcon from "/public/assets/checkout/icon-order-confirmation.svg";
import CartItem from "@/app/cart-item";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "@/lib/fetchers";

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
      <p className="pb-8 text-[1.75rem] md:text-2xl font-bold leading-[normal] tracking-[0.0625em] uppercase lg:text-2xl lg:pt-10">
        {name}
      </p>
      <Link href={`/${categoryName}/${productSlug}`}>
        <Button variant="default">See Product</Button>
      </Link>
    </div>
  );
}

interface ProductDetailsProps {
  initialData: Product;
  categoryName: string;
  productSlug: string;
}

export default function ProductDetails({
  categoryName,
  initialData,
  productSlug,
}: ProductDetailsProps) {
  const { cartItems, addProductToCart, incrementAmount } = useStore();
  const { data, isLoading } = useQuery({
    queryKey: ["productDetail", productSlug],
    queryFn: () => fetchProductDetail(categoryName, productSlug),
    initialData: initialData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const [addedProducts, setAddedProducts] = React.useState<number>(1);
  // State property to mimic API request pending state
  const [isAddToCartLoading, setIsAddToCartLoading] =
    React.useState<boolean>(false);
  const [isProductAdded, setIsProductAdded] = React.useState<boolean>(false);
  const gallery = JSON.parse(data.imageGallery);
  const isNew = data.new;

  async function handleAddToCart() {
    setIsAddToCartLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const existingProduct = cartItems.find(
      (cartItem) => cartItem.id === data.id
    );
    if (existingProduct) {
      console.log("existingProduct", existingProduct);
      incrementAmount(data.id);
    } else {
      console.log("no existingProduct");
      addProductToCart({
        id: data.id,
        name: data.name,
        quantity: addedProducts,
        price: data.price,
        image: data.mobileImage,
      });
    }
    setIsAddToCartLoading(false);
    setIsProductAdded(true);
  }

  function closeConfirmationDialog() {
    if (isProductAdded) setIsProductAdded(false);
  }

  if (isLoading) {
    return <div>Loading Product...</div>;
  }

  return (
    <div className="px-6 mx-auto max-w-[1110px]">
      <div className="md:flex md:flex-row md:items-center">
        <div className={cn("md:p-0", isNew ? "pb-8" : "pb-10")}>
          <div className="relative h-[327px] md:h-[490px] md:w-[281px] lg:h-[560px] lg:w-[540px]">
            <picture className="">
              <source media="(min-width:1025px)" srcSet={data.desktopImage} />
              <source media="(min-width:768px)" srcSet={data.tabletImage} />
              <Image
                src={data.mobileImage}
                alt="Product Gallery Image"
                className="w-full rounded-lg"
                fill
              />
            </picture>
          </div>
        </div>

        <div className="md:py-[2.813rem] md:pl-[4.375rem] lg:pl-[7.813rem]">
          {isNew && (
            <p className="text-raw-sienna uppercase font-normal text-sm tracking-[0.625em] leading-[normal] pb-8 md:text-xs md:pb-4 lg:text-sm">
              New Product
            </p>
          )}
          <h1 className="uppercase text-[1.75rem] font-bold leading-[normal] tracking-[0.0625em] max-w-[55%] pb-6 md:pb-8 lg:text-[2.5rem] lg:leading-[2.75rem] lg:pb-8">
            {data.name}
          </h1>
          <p className="text-[0.938rem] text-black text-opacity-50 leading-[1.563rem] pb-6 md:pb-8">
            {data.description}
          </p>
          <p className="font-bold text-black text-[1.125rem] tracking-[0.080375em] pb-6 md:pb-8 lg:pb-12">
            <span className="mr-2">$</span>
            {data.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-x-4">
            <CounterButton
              variant="pdp"
              onIncrement={() => setAddedProducts((prev) => prev + 1)}
              onDecrement={() => setAddedProducts((prev) => prev - 1)}
              value={addedProducts}
            />
            <Dialog
              open={isProductAdded}
              onOpenChange={closeConfirmationDialog}
            >
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="min-w-[157px]"
                  disabled={addedProducts === 0 || isAddToCartLoading}
                  onClick={handleAddToCart}
                >
                  {isAddToCartLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <Image src={ConfirmationIcon} alt="" />
                  <DialogTitle>Added to Your Cart</DialogTitle>
                  <DialogDescription>
                    <div className="rounded-lg bg-seashell p-6">
                      <CartItem
                        id={data.id}
                        name={data.name}
                        quantity={addedProducts}
                        price={data.price.toLocaleString()}
                        image={data.mobileImage}
                        variant="checkout"
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col">
                  <DialogClose asChild>
                    <Button variant="black" className="w-full">
                      Continue Shopping
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link href="/checkout">
                      <Button variant="default" className="w-full">
                        Checkout
                      </Button>
                    </Link>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-row lg:items-start lg:py-40 lg:gap-x-[7.813rem]">
        <div className="py-[5.5rem] md:py-[7.5rem] lg:p-0 lg:max-w-[635px]">
          <h2 className="uppercase text-[1.5rem] md:text-[2rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6 md:pb-8">
            Features
          </h2>
          <p className="text-black text-opacity-50 leading-[1.563rem] text-[0.938rem]">
            {data.features}
          </p>
        </div>

        <div className="pb-24 md:pb-[7.5rem] md:flex md:flex-row md:items-start md:justify-between md:w-[80%] lg:block">
          <h2 className="uppercase text-[1.5rem] md:text-[2rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6">
            In the box
          </h2>
          <div className="flex flex-col gap-y-2">
            {data.ProductAddOn.map((productAddOn: ProductAddOn) => (
              <ProductFeature
                key={productAddOn.id}
                name={productAddOn.item}
                quantity={productAddOn.quantity}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6">
        <div className="flex flex-col gap-y-6 md:basis-[30%]">
          <div className="relative h-[188px] md:w-[300px] lg:h-[310.5px] lg:w-[375px]">
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
          <div className="relative h-[188px] md:w-[300px] lg:h-[310.5px] lg:w-[375px]">
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

        <div className="relative h-[400px] lg:h-[645px] md:basis-[60%] lg:basis-auto lg:flex-1">
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
        <h2 className="uppercase text-[1.5rem] md:text-[2rem] text-center font-bold leading-[2.25rem] tracking-[0.0535625em] pb-10 lg:text-[2rem]">
          You may also like
        </h2>
        <div className="flex flex-col gap-y-14 md:flex-row md:items-center md:gap-x-[0.688rem] lg:gap-x-[1.875rem]">
          {data.RelatedProduct.map((relatedProduct: RelatedProduct) => (
            <RelatedProductItem
              key={relatedProduct.id}
              categoryName={categoryName}
              name={relatedProduct.name}
              productSlug={relatedProduct.slug}
              mobileImage={relatedProduct.mobileImage}
              desktopImage={relatedProduct.desktopImage}
              tabletImage={relatedProduct.tabletImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
