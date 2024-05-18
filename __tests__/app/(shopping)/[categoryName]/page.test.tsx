// src/app/(shopping)/[categoryName]/__tests__/page.test.tsx
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import ProductListingPage from "@/app/(shopping)/[categoryName]/page";
import { getCategoryProducts } from "@/api";
import { notFound } from "next/navigation";
import { render } from "../../../../vitest.setup";

// Mock the API and navigation functions
vi.mock("@/api", () => ({
  getCategoryProducts: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("ProductListingPage", () => {
  it("renders the page with products when data is available", async () => {
    const mockProducts = [
      {
        id: 1,
        name: "Product 1",
        description: "Description 1",
        slug: "product-1",
        new: false,
        desktopImage: "image1.jpg",
      },
    ];
    (getCategoryProducts as any).mockResolvedValue(mockProducts);

    render(
      await ProductListingPage({ params: { categoryName: "electronics" } })
    );

    await screen.findByText("Product 1"); // Using findBy for async operations
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("calls notFound when no products are available", async () => {
    (getCategoryProducts as any).mockResolvedValue(null);

    render(await ProductListingPage({ params: { categoryName: "unknown" } }));

    expect(notFound).toHaveBeenCalled();
  });
});
