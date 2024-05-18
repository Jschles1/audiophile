import { describe, it, expect, vi, afterEach } from "vitest";
import getCategoryProductsFromDb from "@/lib/server/getCategoryProductsFromDb";
import prismadb from "@/lib/prisma-db";

vi.mock("@/lib/prisma-db", () => ({
  default: {
    category: {
      findFirst: vi.fn(),
    },
  },
}));

describe("getCategoryProductsFromDb", () => {
  afterEach(() => {
    // Reset all mocks after each test
    vi.resetAllMocks();
  });

  it("returns products if found in the category", async () => {
    const mockProducts = [
      { id: 1, name: "Product A", new: true },
      { id: 2, name: "Product B", new: false },
    ];
    (prismadb.category.findFirst as any).mockResolvedValue({
      name: "Electronics",
      Product: mockProducts,
    });
    const products = await getCategoryProductsFromDb("Electronics");
    expect(prismadb.category.findFirst).toHaveBeenCalledWith({
      where: { name: "Electronics" },
      include: {
        Product: {
          orderBy: {
            new: "desc",
          },
        },
      },
    });
    expect(products).toEqual(mockProducts);
  });

  it("returns null if no products are found in the category", async () => {
    (prismadb.category.findFirst as any).mockResolvedValue(null);
    const products = await getCategoryProductsFromDb("Nonexistent");
    expect(products).toBeNull();
  });

  it("throws an error if the database operation fails", async () => {
    const errorMessage = "Database error";
    (prismadb.category.findFirst as any).mockRejectedValue(
      new Error(errorMessage)
    );
    await expect(getCategoryProductsFromDb("Electronics")).rejects.toThrow(
      "Error fetching products: "
    );
  });
});
