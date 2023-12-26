import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DesktopPlaceholderImage from "/public/assets/shared/desktop/image-xx99-mark-two-headphones.jpg";

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
      className={cn(
        "flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:items-start text-center lg:text-start",
        !isEvenIndex && "lg:flex-row-reverse"
      )}
    >
      <div className="bg-seashell rounded-lg w-full mb-8 lg:mb-0 lg:h-full lg:basis-1/2">
        {/* DesktopImage only seems to be viable here */}
        <Image
          src={DesktopPlaceholderImage}
          alt="Placeholder"
          className="rounded-lg h-[275px] w-[300px] mx-auto lg:h-[540px] lg:w-[560px]"
        />
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
            {/* Placeholder name */}
            XX99 Mark II Headphones
          </p>
          <p className="pb-6 text-black text-opacity-50 text-[0.938rem] leading-[1.563rem]">
            {/* Placehodler description */}
            The new XX99 Mark II headphones is the pinnacle of pristine audio.
            It redefines your premium headphone experience by reproducing the
            balanced depth and precision of studio-quality sound.
          </p>
          <Link href={href}>
            <Button>See Product</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
