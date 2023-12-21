"use client";

import Image from "next/image";
import Link from "next/link";
import AudiophileLogo from "/public/assets/shared/desktop/logo.svg";
import HamburgerMenu from "./hamburger-menu";
import Cart from "./cart";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function HeaderLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      className="uppercase text-[0.813rem] font-bold tracking-widest leading-[1.5625em] hover:text-raw-sienna"
      href={href}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header
      className={cn(
        "bg-black text-white border-b border-white border-opacity-50 md:border-none",
        isHome && "bg-opacity-90"
      )}
    >
      <div className="max-w-[1110px] mx-auto w-full">
        <h1 className="hidden">Audiophile</h1>
        <div className="mx-6 py-8 flex justify-between items-center md:border-white md:border-b md:border-opacity-50">
          <HamburgerMenu />
          <Link href="/" className="block md:mr-[30rem] lg:mr-0">
            <Image src={AudiophileLogo} alt="Audiophile logo" />
          </Link>
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/headphones">Headphones</HeaderLink>
            <HeaderLink href="/speakers">Speakers</HeaderLink>
            <HeaderLink href="/earphones">Earphones</HeaderLink>
          </div>
          <Cart />
        </div>
      </div>
    </header>
  );
}
