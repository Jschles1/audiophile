import { describe, it, expect, vi, afterEach } from "vitest";
import addCartItemToDb from "@/lib/server/addCartItemToDb";
import prismadb from "@/lib/prisma-db";
import { CartItem } from "@prisma/client";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    cart: {
      create: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    cartItem: {
      update: vi.fn(),
    },
  },
}));

describe("addCartItemToDb", () => {
  afterEach(() => {
    // Reset all mocks after each test
    vi.resetAllMocks();
  });

  it("returns 400 if no cart item provided", async () => {
    const response = await addCartItemToDb("1", null as unknown as CartItem);
    expect(response.status).toBe(400);
    expect(await response.text()).toBe("No cart item provided");
  });

  it("returns 400 if item is out of stock", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Product",
      price: 100,
      image: "sample-image.jpg",
      quantity: 1,
      cartId: 1,
      quantityInStock: 0,
    };
    const response = await addCartItemToDb("1", cartItem);
    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Item is out of stock");
  });

  it("returns 400 if cartId does not exist", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Product",
      price: 100,
      image: "sample-image.jpg",
      quantity: 1,
      cartId: 1,
      quantityInStock: 0,
    };
    (prismadb.cart.findFirst as any).mockResolvedValue(null);
    const response = await addCartItemToDb("invalid-cart-id", cartItem);
    expect(response.status).toBe(400);
  });

  it('creates a new cart if cartId is "new"', async () => {
    const cartItem = {
      id: 1,
      name: "Sample Product",
      price: 100,
      image: "sample-image.jpg",
      quantity: 1,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.create as any).mockResolvedValue({
      id: "new",
      items: [],
    });
    const response = await addCartItemToDb("new", cartItem);
    expect(prismadb.cart.create).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it("finds an existing cart and updates item quantity", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Product",
      price: 100,
      image: "sample-image.jpg",
      quantity: 1,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.findFirst as any).mockResolvedValue({
      id: "1",
      items: [{ id: 1, quantity: 2 }],
    });
    (prismadb.cartItem.update as any).mockResolvedValue({});
    const response = await addCartItemToDb("1", cartItem);
    expect(prismadb.cart.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { items: true },
    });
    expect(prismadb.cartItem.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { quantity: 3 },
    });
    expect(response.status).toBe(200);
  });

  it("Adds a new item to the cart if it doesn't exist", async () => {
    const cartItem = {
      id: 1,
      name: "Sample Product",
      price: 100,
      image: "sample-image.jpg",
      quantity: 1,
      cartId: 1,
      quantityInStock: 10,
    };
    (prismadb.cart.findFirst as any).mockResolvedValueOnce({
      id: "1",
      items: [],
    });
    const response = await addCartItemToDb("1", cartItem);
    expect(prismadb.cartItem.update).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
