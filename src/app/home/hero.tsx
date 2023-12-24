import Image from "next/image";
import Link from "next/link";
import DesktopHero from "/public/assets/home/desktop/image-hero.jpg";
import MobileHero from "/public/assets/home/mobile/image-header.jpg";
import TabletHero from "/public/assets/home/tablet/image-header.jpg";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="pb-12">
      <div className="absolute inset-0 mx-auto max-w-[1440px]">
        <picture className="">
          <source media="(min-width:1025px)" srcSet={DesktopHero.src} />
          <source media="(min-width:768px)" srcSet={TabletHero.src} />
          <Image
            src={MobileHero}
            alt="Hero Image"
            className="w-full h-[590px] min-[430px]:h-[570px] md:h-[660px]"
          />
        </picture>
      </div>
      <div className="bg-soft-black">
        <div className="max-w-[1110px] mx-auto relative text-center lg:text-left text-white">
          <div className="px-6 md:px-0 py-[6.75rem] pb-[7.75rem] md:pb-[12rem] md:max-w-[420px] md:mx-auto lg:ml-6">
            <p className="uppercase text-white text-opacity-40 tracking-[0.625em] text-sm leading-[normal] pb-4">
              New Product
            </p>
            <p className="text-white uppercase text-4xl md:text-[3.5rem] font-bold leading-10 md:leading-[3.5rem] tracking-[0.080375em] pb-6">
              XX99 Mark II
              <br /> Headphones
            </p>
            <p className="text-white text-opacity-75 text-[0.938rem] leading-6 pb-7">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href="/">
              <Button variant="default">See Product</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
