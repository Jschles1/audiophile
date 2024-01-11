import Image from "next/image";
import Link from "next/link";
import AudiophileLogo from "/public/assets/shared/desktop/logo.svg";
import FacebookIcon from "/public/assets/shared/desktop/icon-facebook.svg";
import TwitterIcon from "/public/assets/shared/desktop/icon-twitter.svg";
import InstagramIcon from "/public/assets/shared/desktop/icon-instagram.svg";

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      className="uppercase text-[0.813rem] font-bold tracking-widest leading-[1.5625em] hover:text-raw-sienna"
      href={href}
    >
      {children}
    </Link>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <Link className="" href="#">
      {icon}
    </Link>
  );
}

function SocialLinks() {
  return (
    <div className="flex mx-auto md:mx-0 w-[104px] justify-center gap-x-4">
      <SocialLink icon={<Image src={FacebookIcon} alt="Facebook Icon" />} />
      <SocialLink icon={<Image src={TwitterIcon} alt="Twitter Icon" />} />
      <SocialLink icon={<Image src={InstagramIcon} alt="Instagram Icon" />} />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white text-center md:text-left">
      <div className="max-w-[1110px] mx-auto pt-[3.25rem] pb-[2.375rem] relative">
        <div className="max-w-[calc(100%*0.26)] min-w-[101px] absolute h-[4px] bg-raw-sienna top-0 left-0 right-0 md:right-auto md:left-6 mx-auto"></div>
        <div className="lg:flex lg:items-center lg:justify-between">
          <Image
            className="block mx-auto md:mx-0 md:pl-6"
            src={AudiophileLogo}
            alt="Audiophile Logo"
          />

          <div className="py-12 flex flex-col gap-y-4 md:px-6 md:flex-row md:gap-x-8 lg:pr-0">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/headphones">Headphones</FooterLink>
            <FooterLink href="/speakers">Speakers</FooterLink>
            <FooterLink href="/earphones">Earphones</FooterLink>
          </div>
        </div>
        <div className="lg:flex lg:justify-between lg:items-end">
          <p className="text-[0.938rem] px-6 leading-[1.5625em] opacity-50 lg:max-w-[540px]">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>
          <div className="hidden lg:block">
            <SocialLinks />
          </div>
        </div>

        <div className="md:flex md:justify-between md:pt-20 md:px-6">
          <p className="py-12 md:py-0 text-[0.938rem] px-6 md:px-0 leading-[1.5625em] opacity-50 font-bold">
            Copyright 2023. All Rights Reserved
          </p>
          <div className="lg:hidden">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
