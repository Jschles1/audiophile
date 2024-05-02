import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import axios from "axios";
import {
  fetchResource,
  postResource,
  patchResource,
  deleteResource,
  fetchCategorieProducts,
  fetchProductDetail,
  fetchCartItems,
  postAddCartItem,
  deleteRemoveAllCartItems,
  postUpdateCartItemQuantity,
} from "@/lib/fetchers";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    isAxiosError: vi.fn(() => true),
  },
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe("fetchResource", () => {
  it("fetches data successfully", async () => {
    (axios.get as any).mockResolvedValue({
      status: 200,
      data: { message: "Success" },
    });
    const data = await fetchResource("/test-route");
    expect(data).toEqual({ message: "Success" });
  });

  it("throws an error when the response status is not 200", async () => {
    (axios.get as any).mockResolvedValue({ status: 404 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(fetchResource("/test-route")).rejects.toThrow(
      "Network response was not ok"
    );
  });
});

describe("postResource", () => {
  it("posts data successfully", async () => {
    (axios.post as any).mockResolvedValue({
      status: 200,
      data: { message: "Posted" },
    });
    const data = await postResource("/test-post", { item: "data" });
    expect(data).toEqual({ message: "Posted" });
  });

  it("throws an error when the response status is not 200", async () => {
    (axios.post as any).mockResolvedValue({ status: 500 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(postResource("/test-post", { item: "data" })).rejects.toThrow(
      "Network response was not ok"
    );
  });
});

describe("patchResource", () => {
  it("patches data successfully", async () => {
    (axios.patch as any).mockResolvedValue({
      status: 200,
      data: { message: "Patched" },
    });
    const data = await patchResource("/test-patch", { item: "update" });
    expect(data).toEqual({ message: "Patched" });
  });

  it("throws an error when the response status is not 200", async () => {
    (axios.patch as any).mockResolvedValue({ status: 400 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(
      patchResource("/test-patch", { item: "update" })
    ).rejects.toThrow("Network response was not ok");
  });
});

describe("deleteResource", () => {
  it("deletes data successfully", async () => {
    (axios.delete as any).mockResolvedValue({
      status: 200,
      data: { message: "Deleted" },
    });
    const data = await deleteResource("/test-delete");
    expect(data).toEqual({ message: "Deleted" });
  });

  it("throws an error when the response status is not 200", async () => {
    (axios.delete as any).mockResolvedValue({ status: 404 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(deleteResource("/test-delete")).rejects.toThrow(
      "Network response was not ok"
    );
  });
});

describe("API fetchers", () => {
  it("fetchCategorieProducts fetches category products successfully", async () => {
    const categoryName = "electronics";
    (axios.get as any).mockResolvedValue({
      status: 200,
      data: [{ id: 1, name: "Camera" }],
    });
    const products = await fetchCategorieProducts(categoryName);
    expect(products).toEqual([{ id: 1, name: "Camera" }]);
  });

  it("fetchCategorieProducts throws an error when the response status is not 200", async () => {
    const categoryName = "electronics";
    (axios.get as any).mockResolvedValue({ status: 404 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(fetchCategorieProducts(categoryName)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("fetchProductDetail fetches category products successfully", async () => {
    const categoryName = "electronics";
    const slug = "camera";
    (axios.get as any).mockResolvedValue({
      status: 200,
      data: { id: 1, name: "Camera" },
    });
    const productDetail = await fetchProductDetail(categoryName, slug);
    expect(productDetail).toEqual({ id: 1, name: "Camera" });
  });

  it("fetchProductDetail throws an error when the response status is not 200", async () => {
    const categoryName = "electronics";
    const slug = "camera";
    (axios.get as any).mockResolvedValue({ status: 404 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(fetchProductDetail(categoryName, slug)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("fetchCartItems fetches cart items successfully", async () => {
    const cartId = "123";
    (axios.get as any).mockResolvedValue({
      status: 200,
      data: [{ id: 1, name: "Product" }],
    });
    const cartItems = await fetchCartItems(cartId);
    expect(cartItems).toEqual([{ id: 1, name: "Product" }]);
  });

  it("fetchCartItems throws an error when the response status is not 200", async () => {
    const cartId = "123";
    (axios.get as any).mockResolvedValue({ status: 404 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(fetchCartItems(cartId)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("postAddCartItem adds a cart item successfully", async () => {
    const cartId = "123";
    const cartItem = {
      id: 1,
      name: "Product",
      price: 100, // example price
      image: "path/to/image.jpg", // example image path
      quantity: 2, // example quantity
      cartId: 123, // example cart ID
      quantityInStock: 50, // example quantity in stock
    };
    (axios.post as any).mockResolvedValue({
      status: 200,
      data: { success: true },
    });
    const result = await postAddCartItem(cartId, cartItem);
    expect(result).toEqual({ success: true });
  });

  it("postAddCartItem throws an error when the response status is not 200", async () => {
    const cartId = "123";
    const cartItem = {
      id: 1,
      name: "Product",
      price: 100,
      image: "path/to/image.jpg",
      quantity: 2,
      cartId: 123,
      quantityInStock: 50,
    };
    (axios.post as any).mockResolvedValue({ status: 400 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(postAddCartItem(cartId, cartItem)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("deleteRemoveAllCartItems removes all cart items successfully", async () => {
    const cartId = "123";
    (axios.delete as any).mockResolvedValue({
      status: 200,
      data: { success: true },
    });
    const result = await deleteRemoveAllCartItems(cartId);
    expect(result).toEqual({ success: true });
  });

  it("deleteRemoveAllCartItems throws an error when the response status is not 200", async () => {
    const cartId = "123";
    (axios.delete as any).mockResolvedValue({ status: 404 });
    (axios.isAxiosError as any).mockReturnValue(true);
    await expect(deleteRemoveAllCartItems(cartId)).rejects.toThrow(
      "Network response was not ok"
    );
  });

  it("postUpdateCartItemQuantity updates cart item quantity successfully", async () => {
    const cartId = "123";
    const cartItem = {
      id: 1,
      name: "Product",
      price: 100,
      image: "path/to/image.jpg",
      quantity: 2,
      cartId: 123,
      quantityInStock: 50,
    };
    (axios.patch as any).mockResolvedValue({
      status: 200,
      data: { success: true },
    });
    const result = await postUpdateCartItemQuantity(cartId, cartItem);
    expect(result).toEqual({ success: true });
  });
});
