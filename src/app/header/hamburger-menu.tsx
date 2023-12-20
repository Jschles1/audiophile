import Image from "next/image";
import { Button } from "@/components/ui/button";
import HamburgerMenuIcon from "/public/assets/shared/tablet/icon-hamburger.svg";

export default function HamburgerMenu() {
  return (
    <Button
      className="relative lg:hidden p-0"
      aria-label="Hamburger Menu"
      variant="ghost"
    >
      <Image src={HamburgerMenuIcon} alt="Hamburger Menu Icon" />
    </Button>
  );
}
