import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DesktopZX9Image from "/public/assets/home/desktop/image-speaker-zx9.png";
import DesktopZX7Image from "/public/assets/home/desktop/image-speaker-zx7.jpg";
import DesktopYX1Image from "/public/assets/home/desktop/image-earphones-yx1.jpg";
import MobileZX9Image from "/public/assets/home/mobile/image-speaker-zx9.png";
import MobileZX7Image from "/public/assets/home/mobile/image-speaker-zx7.jpg";
import MobileYX1Image from "/public/assets/home/mobile/image-earphones-yx1.jpg";
import TabletZX9Image from "/public/assets/home/tablet/image-speaker-zx9.png";
import TabletZX7Image from "/public/assets/home/tablet/image-speaker-zx7.jpg";
import TabletYX1Image from "/public/assets/home/tablet/image-earphones-yx1.jpg";
import PatternCircles from "/public/assets/home/desktop/pattern-circles.svg";

export default function Banners() {
  return (
    <div className="max-w-[1110px] mx-auto px-6 pt-24 flex flex-col gap-y-6">
      <div className="rounded-lg flex flex-col  items-center bg-raw-sienna px-6 py-[3.438rem] md:py-16 text-center lg:text-left relative overflow-hidden">
        <div className="absolute top-[-20px] md:top-[-190px] pointer-events-none lg:left-[-143px]">
          <Image src={PatternCircles} alt="" />
        </div>

        <div className="z-20 lg:absolute lg:left-[130px] lg:top-[36px]">
          <picture>
            <source media="(min-width:1025px)" srcSet={DesktopZX9Image.src} />
            <source media="(min-width:768px)" srcSet={TabletZX9Image.src} />
            <Image
              src={MobileZX9Image}
              alt="ZX9 Speaker"
              className="w-[140px] h-[172px] lg:h-[493px] lg:w-[410px]"
            />
          </picture>
        </div>

        <div className="mr-0 ml-auto">
          <p className="text-white uppercase pt-8 text-4xl font-bold leading-10 tracking-[0.080375em]">
            ZX9 <br /> Speaker
          </p>

          <p className="py-6 text-white text-opacity-75 text-[0.938rem] md:mx-auto md:max-w-[350px]">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>

          <Link href="/">
            <Button variant="black">See Product</Button>
          </Link>
        </div>
      </div>
      <div className="relative py-[6.25rem] px-6 md:px-16">
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width:1025px)" srcSet={DesktopZX7Image.src} />
            <source media="(min-width:768px)" srcSet={TabletZX7Image.src} />
            <Image
              src={MobileZX7Image}
              alt="ZX7 Speaker"
              fill
              className="rounded-lg"
            />
          </picture>
        </div>
        <div>
          <p className="uppercase text-black text-[1.75rem] font-bold tracking-[0.125em] pb-8 z-20 relative hover:text-black">
            ZX7 Speaker
          </p>
          <Link href="/" className="z-20">
            <Button variant="white" className="relative">
              See Product
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 md:flex-row md:items-stretch md:gap-x-4">
        <div className="md:basis-1/2">
          <picture>
            <source media="(min-width:1025px)" srcSet={DesktopYX1Image.src} />
            <source media="(min-width:768px)" srcSet={TabletYX1Image.src} />
            <Image
              src={MobileYX1Image}
              alt="YX1 Earphones"
              className="rounded-lg"
            />
          </picture>
        </div>

        <div className="bg-seashell rounded-lg px-6 py-10 md:basis-1/2 md:flex md:flex-col md:justify-center">
          <p className="uppercase text-black text-[1.75rem] font-bold tracking-[0.125em] pb-8 z-10 relative">
            YX1 Earphones
          </p>
          <Link href="/">
            <Button variant="white" className="z-10 relative">
              See Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
