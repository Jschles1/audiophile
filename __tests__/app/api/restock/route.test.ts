import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/restock/route";

vi.mock("@/api/products", () => ({
  restockProducts: vi.fn(() => Promise.resolve({ success: true })),
}));

describe("/api/cart/[cartId]", () => {
  afterEach(() => {
    // Clean up the environment variable after each test
    delete process.env.CRON_SECRET;
  });

  it("GET /api/restock should restock items", async () => {
    process.env.CRON_SECRET = "123";
    const req = new NextRequest("http://localhost/api/restock", {
      headers: { authorization: "Bearer 123" },
    });
    const response = await GET(req);
    expect(await response.json()).toEqual({ success: true });
  });

  it("GET /api/restock should return 401 if no authorization header is provided", async () => {
    const req = new NextRequest("http://localhost/api/restock");
    const response = await GET(req);
    expect(response.status).toBe(401);
  });
});
