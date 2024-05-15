import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductListingItemProps {
  index: number;
  image: string;
  isNew: boolean;
  name: string;
  description: string;
  href: string;
}

export default function ProductListingItem({
  index,
  image,
  isNew,
  name,
  description,
  href,
}: ProductListingItemProps) {
  const isEvenIndex = index === 0 || index % 2 == 0;
  return (
    <div
      data-testid="product-container"
      className={cn(
        "flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:items-start text-center lg:text-start",
        !isEvenIndex && "lg:flex-row-reverse"
      )}
    >
      <div className="bg-seashell rounded-lg w-full mb-8 lg:mb-0 lg:h-full lg:basis-1/2">
        <div className="relative h-[275px] w-[300px] mx-auto lg:h-[540px] lg:w-[530px]">
          <Image src={image} alt="Placeholder" fill className="rounded-lg" />
        </div>
      </div>
      <div
        className={cn(
          "lg:py-[6.75rem] lg:lg:basis-1/2",
          isEvenIndex ? "lg:pl-[7.813rem]" : "lg:pr-[7.813rem]"
        )}
      >
        {isNew && (
          <p className="text-raw-sienna uppercase font-normal text-sm tracking-[0.625em] leading-[normal]">
            New Product
          </p>
        )}
        <div className="md:mx-auto md:max-w-[572px] lg:max-w-none">
          <p className="py-6 text-[1.75rem] md:text-[2.5rem] font-bold leading-[normal] tracking-[0.0625em] uppercase">
            {name}
          </p>
          <p className="pb-6 text-black text-opacity-50 text-[0.938rem] leading-[1.563rem]">
            {description}
          </p>
          <Link href={href}>
            <Button>See Product</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
