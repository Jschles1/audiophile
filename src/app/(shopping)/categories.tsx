import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeadphonesImage from "/public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import SpeakersImage from "/public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import EarphonesImage from "/public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import ArrowIcon from "/public/assets/shared/desktop/icon-arrow-right.svg";

function Category({
  name,
  image,
  href,
}: {
  name: string;
  image: StaticImageData;
  href: string;
}) {
  return (
    <Card className="bg-seashell w-full relative">
      <CardContent className="flex flex-col pb-[1.375rem] pt-[5.5rem]">
        <Image
          src={image}
          alt={name}
          className="mx-auto absolute top-[-3.125rem] right-0 left-0 h-[140px] w-[160px]"
        />
        <p className="text-center text-black font-bold text-[0.938rem] pb-4 uppercase">
          {name}
        </p>
        <Link href={href} className="mx-auto">
          <Button
            className="mx-auto uppercase pt-0 font-bold text-center text-black text-opacity-50 flex items-center gap-x-2 text-[0.813rem]"
            variant="ghost"
          >
            Shop
            <Image src={ArrowIcon} alt="" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function Categories() {
  return (
    <div className="flex max-w-[1110px] mx-auto flex-col md:flex-row w-full items-center gap-x-[0.625rem] px-6 pt-[3.25rem] gap-y-[4.25rem]">
      <Category name="Headphones" href="/headphones" image={HeadphonesImage} />
      <Category name="Speakers" href="/speakers" image={SpeakersImage} />
      <Category name="Earphones" href="/earphones" image={EarphonesImage} />
    </div>
  );
}
