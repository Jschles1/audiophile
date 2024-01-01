import useStore from "@/lib/store";

export default function CartItemCount() {
  const cartItems = useStore((state) => state.cartItems);

  if (!cartItems.length) {
    return null;
  }

  return (
    <div className="rounded-full absolute top-0 right-0 bg-white text-black h-4 w-4 text-xs">
      {cartItems.length}
    </div>
  );
}
