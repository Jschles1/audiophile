import Image from "next/image";
import CounterButton from "./counter-button";
import { truncateProductName } from "@/lib/utils";

interface CartItemProps {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  variant: "checkout" | "cart";
}

export default function CartItem({
  name,
  quantity,
  price,
  image,
  variant,
}: CartItemProps) {
  return (
    // TODO: Need to add truncated version of the product name
    <div className="flex flex-row items-center">
      <div>
        <Image
          className="rounded-lg"
          src={image}
          alt={name}
          height={64}
          width={64}
        />
      </div>

      <div className="pl-4 flex-1">
        <p className="text-black text-[0.938rem] leading-[1.563rem]">
          {truncateProductName(name)}
        </p>
        <p className="text-black text-opacity-50 text-sm leading-[1.563rem]">
          ${(price * quantity).toLocaleString()}
        </p>
      </div>

      {variant === "cart" && (
        <CounterButton
          variant="cart"
          className="w-[96px]"
          onIncrement={() => {}}
          onDecrement={() => {}}
          value={quantity}
        />
      )}

      {variant === "checkout" && (
        <p className="text-black text-[0.938rem] leading-[1.563rem] text-opacity-50">
          x{quantity}
        </p>
      )}
    </div>
  );
}
