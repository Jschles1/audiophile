// src/app/(shopping)/[categoryName]/[productSlug]/__tests__/page.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../../vitest.setup";
import { screen } from "@testing-library/react";
import ProductDetailPage from "@/app/(shopping)/[categoryName]/[productSlug]/page";
import { getProductDetail } from "@/api";
import { notFound } from "next/navigation";

// Mock the API and navigation functions
vi.mock("@/api", () => ({
  getProductDetail: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));
vi.mock("next-client-cookies", () => ({
  useCookies: () => ({
    get: vi.fn().mockImplementation((key) => {
      if (key === "cartId") return "123";
      return null;
    }),
    set: vi.fn(),
  }),
}));

const testProduct = {
  id: 1,
  name: "Test Product",
  slug: "test-product",
  description: "Test Description",
  price: 100,
  imageGallery: JSON.stringify({
    first: {
      mobile: "first-mobile.jpg",
      tablet: "first-tablet.jpg",
      desktop: "first-desktop.jpg",
    },
    second: {
      mobile: "second-mobile.jpg",
      tablet: "second-tablet.jpg",
      desktop: "second-desktop.jpg",
    },
    third: {
      mobile: "third-mobile.jpg",
      tablet: "third-tablet.jpg",
      desktop: "third-desktop.jpg",
    },
  }),
  mobileImage: "first-mobile.jpg",
  tabletImage: "first-tablet.jpg",
  desktopImage: "first-desktop.jpg",
  new: true,
  quantityInStock: 10,
  features: "Test Features",
  ProductAddOn: [{ id: 1, item: "Test AddOn", quantity: 2 }],
  RelatedProduct: [
    {
      id: 2,
      name: "Related Product",
      slug: "related-product",
      mobileImage: "related-mobile.jpg",
      desktopImage: "related-desktop.jpg",
      tabletImage: "related-tablet.jpg",
    },
  ],
};

describe("ProductDetailPage", () => {
  it("renders the page with product details when data is available", async () => {
    (getProductDetail as any).mockResolvedValue(testProduct);

    // Await the component before rendering
    const page = await ProductDetailPage({
      params: { categoryName: "electronics", productSlug: "product-1" },
    });
    render(page as JSX.Element);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("calls notFound when no product data is available", async () => {
    (getProductDetail as any).mockResolvedValue(null);

    // Await the component before rendering
    const page = await ProductDetailPage({
      params: { categoryName: "electronics", productSlug: "unknown-product" },
    });
    render(page as JSX.Element);

    expect(notFound).toHaveBeenCalled();
  });
});
