import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST, PATCH, DELETE } from "@/app/api/cart/[cartId]/route";

vi.mock("@/api/cart", () => ({
  getCartItems: vi.fn(() =>
    Promise.resolve([{ id: 1, name: "Product", quantity: 2 }])
  ),
  addCartItem: vi.fn((cartId, cartItem) =>
    Promise.resolve({
      id: parseInt(cartId),
      name: cartItem.name,
      quantity: cartItem.quantity,
    })
  ),
  updateCartItemQuantity: vi.fn((cartId, cartItem) =>
    Promise.resolve({
      id: parseInt(cartId),
      name: cartItem.name,
      quantity: cartItem.quantity,
    })
  ),
  removeAllCartItems: vi.fn((cartId) =>
    Promise.resolve({ success: true, cartId: parseInt(cartId) })
  ),
}));

describe("/api/cart/[cartId]", () => {
  it("GET /api/cart/[cartId] should return cart items", async () => {
    const req = new NextRequest("http://localhost/api/cart/1");
    const response = await GET(req, { params: { cartId: "1" } });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([
      { id: 1, name: "Product", quantity: 2 },
    ]);
  });

  it("POST /api/cart/[cartId] should add item to cart", async () => {
    const req = new NextRequest("http://localhost/api/cart/1", {
      method: "POST",
      body: JSON.stringify({ name: "Product 2", quantity: 1 }),
    });
    const response = await POST(req, { params: { cartId: "1" } });
    expect(response).toEqual({
      id: 1,
      name: "Product 2",
      quantity: 1,
    });
  });

  it("PATCH /api/cart/[cartId] should update item in cart", async () => {
    const req = new NextRequest("http://localhost/api/cart/1", {
      method: "PATCH",
      body: JSON.stringify({ name: "Product 2", quantity: 2 }),
    });
    const response = await PATCH(req, { params: { cartId: "1" } });
    expect(await response.json()).toEqual({
      id: 1,
      name: "Product 2",
      quantity: 2,
    });
  });

  it("DELETE /api/cart/[cartId] should remove all items from cart", async () => {
    const req = new NextRequest("http://localhost/api/cart/1", {
      method: "DELETE",
    });
    const response = await DELETE(req, { params: { cartId: "1" } });
    expect(response).toEqual({ success: true, cartId: 1 });
  });
});
