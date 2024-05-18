import { describe, it, expect, vi, afterEach } from "vitest";
import getProductDetailFromDb from "@/lib/server/getProductDetailFromDb";
import prismadb from "@/lib/prisma-db";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    product: {
      findFirst: vi.fn(),
    },
  },
}));

describe("getProductDetailFromDb", () => {
  afterEach(() => {
    // Reset all mocks after each test
    vi.resetAllMocks();
  });

  it("returns product details if found", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      slug: "test-product",
      ProductAddOn: [],
      RelatedProduct: [],
    };
    (prismadb.product.findFirst as any).mockResolvedValue(mockProduct);
    const product = await getProductDetailFromDb("test-product");
    expect(prismadb.product.findFirst).toHaveBeenCalledWith({
      where: { slug: "test-product" },
      include: {
        ProductAddOn: true,
        RelatedProduct: true,
      },
    });
    expect(product).toEqual(mockProduct);
  });

  it("returns null if no product is found", async () => {
    (prismadb.product.findFirst as any).mockResolvedValue(null);
    const product = await getProductDetailFromDb("non-existent");
    expect(product).toBeNull();
  });

  it("throws an error if the database operation fails", async () => {
    const errorMessage = "Database error";
    (prismadb.product.findFirst as any).mockRejectedValue(
      new Error(errorMessage)
    );
    await expect(getProductDetailFromDb("test-product")).rejects.toThrow(
      "Error fetching product: "
    );
  });
});
