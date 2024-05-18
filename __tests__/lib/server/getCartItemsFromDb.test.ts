import { describe, it, expect, vi, afterEach } from "vitest";
import getCartItemsFromDb from "@/lib/server/getCartItemsFromDb";
import prismadb from "@/lib/prisma-db";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    cart: {
      findFirst: vi.fn(),
    },
  },
}));

describe("getCartItemsFromDb", () => {
  afterEach(() => {
    // Reset all mocks after each test
    vi.resetAllMocks();
  });

  it("returns an empty array if no cartId is provided", async () => {
    const items = await getCartItemsFromDb("");
    expect(items).toEqual([]);
  });

  it("returns an empty array if cart is not found", async () => {
    (prismadb.cart.findFirst as any).mockResolvedValue(null);
    const items = await getCartItemsFromDb("1");
    expect(items).toEqual([]);
  });

  it("returns an empty array if cart has no items", async () => {
    (prismadb.cart.findFirst as any).mockResolvedValue({ id: "1", items: [] });
    const items = await getCartItemsFromDb("1");
    expect(items).toEqual([]);
  });

  it("returns items if cart is found with items", async () => {
    const mockItems = [{ id: 1, name: "Product", quantity: 2 }];
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: mockItems,
    });
    const items = await getCartItemsFromDb("1");
    expect(items).toEqual(mockItems);
  });
});
