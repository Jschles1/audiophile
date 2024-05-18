import { describe, it, expect, vi, afterEach } from "vitest";
import updateCartItemQuantityInDb from "@/lib/server/updateCartItemQuantityInDb";
import prismadb from "@/lib/prisma-db";
import { CartItem } from "@prisma/client";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    cart: {
      findFirst: vi.fn(),
    },
    cartItem: {
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));
describe("updateCartItemQuantityInDb", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns 400 if no cart item provided", async () => {
    const response = await updateCartItemQuantityInDb(
      "1",
      null as unknown as CartItem
    );
    expect(response.status).toBe(400);
    expect(await response.text()).toBe("No cart item provided");
  });

  it("returns 400 if item is out of stock", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Item",
      price: 100,
      image: "url_to_image",
      quantity: 0,
      cartId: 1,
      quantityInStock: 0,
    };
    const response = await updateCartItemQuantityInDb("1", cartItem);
    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Item is out of stock");
  });

  it("throws an error if no cartId is provided", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Item",
      price: 100,
      image: "url_to_image",
      quantity: 10,
      cartId: 1,
      quantityInStock: 5,
    };
    await expect(updateCartItemQuantityInDb("", cartItem)).rejects.toThrow(
      "cartId not found"
    );
  });

  it("throws an error if cart is not found", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Item",
      price: 100,
      image: "url_to_image",
      quantity: 10,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.findFirst as any).mockResolvedValue(null);
    await expect(updateCartItemQuantityInDb("1", cartItem)).rejects.toThrow(
      "cartId not found"
    );
  });

  it("updates the quantity of an existing item", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Item",
      price: 100,
      image: "url_to_image",
      quantity: 5,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: [{ id: 1, quantity: 3 }],
    });
    const response = await updateCartItemQuantityInDb("1", cartItem);
    expect(prismadb.cartItem.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { quantity: 5 },
    });
    expect(response.status).toBe(200);
  });

  it("deletes the item if quantity is 0", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Item",
      price: 100,
      image: "url_to_image",
      quantity: 0,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: [{ id: 1, quantity: 3 }],
    });
    const response = await updateCartItemQuantityInDb("1", cartItem);
    expect(prismadb.cartItem.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(response.status).toBe(200);
  });

  it("throws an error if item not found in the cart", async () => {
    const cartItem = {
      id: 2,
      name: "Sample Item",
      price: 100,
      image: "url_to_image",
      quantity: 5,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: [],
    });
    await expect(updateCartItemQuantityInDb("1", cartItem)).rejects.toThrow(
      "Cannot update quantity of non-existent cart item"
    );
  });
});
