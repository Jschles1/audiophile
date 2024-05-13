import React from "react";
import { screen } from "@testing-library/react";
import ProductList from "@/app/(shopping)/[categoryName]/product-list";
import { Product } from "@prisma/client";
import { vi, describe, expect, it } from "vitest";
import { render } from "../../../../vitest.setup";

// Mock the fetcher function
vi.mock("@/lib/fetchers", () => ({
  fetchCategorieProducts: vi.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    slug: "product-1",
    new: false,
    desktopImage: "image1.jpg",
    mobileImage: "image1-mobile.jpg",
    tabletImage: "image1-tablet.jpg",
    price: 100,
    features: "Feature 1, Feature 2",
    imageGallery: JSON.parse('{"images": ["image1.jpg", "image2.jpg"]}'),
    quantityInStock: 10,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    slug: "product-2",
    new: true,
    desktopImage: "image2.jpg",
    mobileImage: "image2-mobile.jpg",
    tabletImage: "image2-tablet.jpg",
    price: 150,
    features: "Feature 3, Feature 4",
    imageGallery: JSON.parse('{"images": ["image3.jpg", "image4.jpg"]}'),
    quantityInStock: 5,
  },
];

describe("ProductList", () => {
  it("renders product items correctly", async () => {
    render(
      <ProductList initialData={mockProducts} categoryName="test-category" />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });
});
