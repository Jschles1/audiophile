import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "./fetchers";
import { useCookies } from "next-client-cookies";

export default function useCartItems() {
  const cookies = useCookies();
  const cartId =
    cookies.get("cartId") === "undefined"
      ? "new"
      : (cookies.get("cartId") as string);
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => fetchCartItems(cartId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, isLoading, isFetching, isRefetching, cartId };
}
