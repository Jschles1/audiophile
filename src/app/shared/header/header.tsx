"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import CartButtonIcon from "/public/assets/shared/desktop/icon-cart.svg";
import { usePathname } from "next/navigation";
import CartItemCount from "./cart-item-count";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AudiophileLogo from "/public/assets/shared/desktop/logo.svg";
import HamburgerMenuIcon from "/public/assets/shared/tablet/icon-hamburger.svg";
import Categories from "../../(shopping)/categories";

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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const cartRef = React.useRef<HTMLDivElement>(null);
  const isDialogOpen = isMenuOpen || isCartOpen;
  const pathname = usePathname();
  const isHome = pathname === "/";

  function handleMenuClick() {
    const newValue = !isMenuOpen;
    setIsMenuOpen(newValue);
    setIsCartOpen(false);
    if (newValue) {
      document.addEventListener("click", closeMenuDialog);
    }
  }

  function handleCartClick() {
    const newValue = !isCartOpen;
    setIsCartOpen(newValue);
    setIsMenuOpen(false);
    if (newValue) {
      document.addEventListener("click", closeCartDialog);
    }
  }

  const closeMenuDialog = React.useCallback(
    (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
        document.removeEventListener("click", closeMenuDialog);
      }
    },
    [menuRef, setIsMenuOpen]
  );

  const closeCartDialog = React.useCallback(
    (e: MouseEvent) => {
      if (!cartRef.current?.contains(e.target as Node)) {
        setIsCartOpen(false);
        document.removeEventListener("click", closeCartDialog);
      }
    },
    [cartRef, setIsCartOpen]
  );

  React.useEffect(() => {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    return () => {
      document.removeEventListener("click", closeMenuDialog);
      document.removeEventListener("click", closeCartDialog);
    };
  }, [pathname, closeMenuDialog, closeCartDialog]);

  return (
    <header
      className={cn(
        "bg-black text-white border-b border-white border-opacity-50 md:border-none z-10",
        isHome && "bg-soft-black"
      )}
    >
      <div className="max-w-[1110px] mx-auto w-full relative">
        <div className="mx-6 py-8 flex justify-between items-center md:border-white md:border-b md:border-opacity-50">
          <Button
            className="relative lg:hidden p-0"
            aria-label="Menu"
            variant="ghost"
            onClick={handleMenuClick}
          >
            <Image src={HamburgerMenuIcon} alt="Menu" />
          </Button>
          <Link href="/" className="block md:mr-[30rem] lg:mr-0">
            <Image src={AudiophileLogo} alt="Audiophile logo" />
          </Link>
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/headphones">Headphones</HeaderLink>
            <HeaderLink href="/speakers">Speakers</HeaderLink>
            <HeaderLink href="/earphones">Earphones</HeaderLink>
          </div>
          <Button
            className="relative p-0"
            aria-label="Cart"
            variant="ghost"
            onClick={handleCartClick}
          >
            <Image src={CartButtonIcon} alt="Cart Icon" />
            <CartItemCount />
          </Button>
        </div>

        {isMenuOpen && (
          <div
            className="absolute top-[105px] bg-white w-full py-8 pb-6 rounded-b-lg z-60"
            ref={menuRef}
          >
            <Categories />
          </div>
        )}

        {isCartOpen && <Cart ref={cartRef} />}
      </div>
      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 -z-10 pointer-events-auto" />
      )}
    </header>
  );
}
