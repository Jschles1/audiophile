import { describe, it, expect, vi, afterEach } from "vitest";
import removeAllCartItemsFromCartInDb from "@/lib/server/removeAllCartItemsFromCartInDb";
import prismadb from "@/lib/prisma-db";
import { NextResponse } from "next/server";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    cart: {
      findFirst: vi.fn(),
    },
    cartItem: {
      deleteMany: vi.fn(),
    },
  },
}));

describe("removeAllCartItemsFromCartInDb", () => {
  afterEach(() => {
    // Reset all mocks after each test
    vi.resetAllMocks();
  });

  it("throws an error if no cartId is provided", async () => {
    await expect(removeAllCartItemsFromCartInDb("")).rejects.toThrow(
      "cartId not found"
    );
  });

  it("throws an error if cart is not found", async () => {
    (prismadb.cart.findFirst as any).mockResolvedValue(null);
    await expect(removeAllCartItemsFromCartInDb("1")).rejects.toThrow(
      "cartId not found"
    );
  });

  it("successfully removes all items from the cart", async () => {
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: [{ id: 1 }],
    });
    (prismadb.cartItem.deleteMany as any).mockResolvedValue({ count: 1 });
    const response = await removeAllCartItemsFromCartInDb("1");
    expect(prismadb.cartItem.deleteMany).toHaveBeenCalledWith({
      where: {
        cartId: parseInt("1"),
      },
    });
    expect(await response.json()).toEqual({ success: true, cartId: "1" });
  });

  it("handles errors during the removal process", async () => {
    const errorMessage = "Failed to delete";
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: [{ id: 1 }],
    });
    (prismadb.cartItem.deleteMany as any).mockRejectedValue(
      new Error(errorMessage)
    );
    await expect(removeAllCartItemsFromCartInDb("1")).rejects.toThrow(
      "Error removing cart items: "
    );
  });
});
