import getCartItemsFromDb from "@/lib/server/getCartItemsFromDb";
/* v8 ignore start */
import addCartItemToDb from "@/lib/server/addCartItemToDb";
import removeAllCartItemsFromCartInDb from "@/lib/server/removeAllCartItemsFromCartInDb";
import updateCartItemQuantityFromDb from "@/lib/server/updateCartItemQuantityInDb";
import { CartItem } from "@prisma/client";

export async function getCartItems(cartId: string) {
  return await getCartItemsFromDb(cartId);
}

export async function addCartItem(cartId: string, body: CartItem) {
  return await addCartItemToDb(cartId, body);
}

export async function updateCartItemQuantity(cartId: string, body: CartItem) {
  return await updateCartItemQuantityFromDb(cartId, body);
}

export async function removeAllCartItems(cartId: string) {
  return await removeAllCartItemsFromCartInDb(cartId);
}
/* v8 ignore end */
