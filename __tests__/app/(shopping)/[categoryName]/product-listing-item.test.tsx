// src/app/(shopping)/[categoryName]/__tests__/product-listing-item.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductListingItem from "@/app/(shopping)/[categoryName]/product-listing-item";

describe("ProductListingItem", () => {
  const baseProps = {
    index: 0,
    image: "/path/to/image.jpg",
    isNew: true,
    name: "Sample Product",
    description: "This is a sample description.",
    href: "/product/sample-product",
  };

  it("renders the product information correctly", () => {
    render(<ProductListingItem {...baseProps} />);

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample description.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Placeholder" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See Product" })).toHaveAttribute(
      "href",
      "/product/sample-product"
    );
  });

  it("conditionally displays the new product label", () => {
    const { rerender } = render(
      <ProductListingItem {...baseProps} isNew={true} />
    );
    expect(screen.getByText("New Product")).toBeInTheDocument();

    rerender(<ProductListingItem {...baseProps} isNew={false} />);
    expect(screen.queryByText("New Product")).not.toBeInTheDocument();
  });

  it("applies correct styling based on index", () => {
    const { rerender } = render(
      <ProductListingItem {...baseProps} index={0} />
    );
    expect(screen.getByTestId("product-container")).toHaveClass("lg:flex-row");

    rerender(<ProductListingItem {...baseProps} index={1} />);
    expect(screen.getByTestId("product-container")).toHaveClass(
      "lg:flex-row-reverse"
    );
  });
});
