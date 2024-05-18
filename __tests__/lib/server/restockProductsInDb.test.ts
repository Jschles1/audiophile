import { describe, it, expect, vi, afterEach } from "vitest";
import restockProductsInDb from "@/lib/server/restockProductsInDb";
import prismadb from "@/lib/prisma-db";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    product: {
      updateMany: vi.fn(),
    },
  },
}));

describe("restockProductsInDb", () => {
  afterEach(() => {
    // Reset all mocks after each test
    vi.resetAllMocks();
  });

  it("successfully restocks products", async () => {
    const mockRestockedProducts = { count: 10 };
    (prismadb.product.updateMany as any).mockResolvedValue(
      mockRestockedProducts
    );
    const response = await restockProductsInDb();
    expect(prismadb.product.updateMany).toHaveBeenCalledWith({
      data: {
        quantityInStock: 250,
      },
    });
    expect(await response.json()).toEqual({ success: true });
  });

  it("throws an error if the restocking process fails", async () => {
    const errorMessage = "Failed to restock";
    (prismadb.product.updateMany as any).mockRejectedValue(
      new Error(errorMessage)
    );
    await expect(restockProductsInDb()).rejects.toThrow(
      "Error adding product to cart: "
    );
  });
});
