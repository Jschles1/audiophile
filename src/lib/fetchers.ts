import axios from "axios";
import { CartItem } from "@prisma/client";

function handleAxiosError(error: any, route: string) {
  if (axios.isAxiosError(error)) {
    throw new Error(`Error fetching from ${route}: ${error.response?.data}`);
  }
}

async function fetchResource(route: string) {
  try {
    const response = await axios.get(route);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    handleAxiosError(error, route);
  }
}

async function postResource<T>(route: string, data: T) {
  try {
    const response = await axios.post(route, data);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    handleAxiosError(error, route);
  }
}

async function patchResource<T>(route: string, data: T) {
  try {
    const response = await axios.patch(route, data);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    handleAxiosError(error, route);
  }
}

async function deleteResource(route: string) {
  try {
    const response = await axios.delete(route);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    handleAxiosError(error, route);
  }
}

export async function fetchCategorieProducts(categoryName: string) {
  return await fetchResource(`/api/${categoryName}`);
}

export async function fetchProductDetail(categoryName: string, slug: string) {
  return await fetchResource(`/api/${categoryName}/${slug}`);
}

export async function fetchCartItems(cartId: string) {
  return await fetchResource(`/api/cart/${cartId}`);
}

export async function postAddCartItem(cartId: string, cartItem: CartItem) {
  let cartIdParam = cartId ? cartId : "new";
  return await postResource<CartItem>(`/api/cart/${cartIdParam}`, cartItem);
}

export async function deleteRemoveAllCartItems(cartId: string) {
  return await deleteResource(`/api/cart/${cartId}`);
}

export async function postUpdateCartItemQuantity(
  cartId: string,
  cartItem: CartItem
) {
  return await patchResource<CartItem>(`/api/cart/${cartId}`, cartItem);
}
