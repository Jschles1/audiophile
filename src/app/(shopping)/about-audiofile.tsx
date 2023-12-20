import Image from "next/image";
import MobileImage from "/public/assets/shared/mobile/image-best-gear.jpg";
import TabletImage from "/public/assets/shared/tablet/image-best-gear.jpg";
import DesktopImage from "/public/assets/shared/desktop/image-best-gear.jpg";

export default function AboutAudiofile() {
  return (
    <div className="text-center py-[7.5rem] px-6 mx-auto max-w-[1110px] lg:flex lg:flex-row-reverse lg:items-center lg:justify-between">
      <div className="lg:basis-1/2">
        <picture className="relative">
          <source media="(min-width:1025px)" srcSet={DesktopImage.src} />
          <source media="(min-width:768px)" srcSet={TabletImage.src} />
          <Image
            src={MobileImage}
            alt="Best Gear Image"
            className="mx-auto w-full rounded-lg"
          />
        </picture>
      </div>

      <div className="lg:max-w-[445px]">
        <p className="py-8 uppercase text-[1.75rem] leading-[normal] font-bold tracking-[0.0625em] md:text-[2.5rem] md:px-8 md:pt-12 lg:px-0 lg:pt-0">
          Bringing You The <span className="text-raw-sienna">Best</span> Audio
          Gear
        </p>
        <p className="text-opacity-50 leading-[1.5625em] text-[0.938rem] text-black md:px-10 lg:px-0">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
}
