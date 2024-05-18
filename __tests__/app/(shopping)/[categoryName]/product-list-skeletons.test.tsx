// src/app/(shopping)/[categoryName]/__tests__/product-list-skeletons.test.tsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../../vitest.setup";
import ProductListSkeletons from "@/app/(shopping)/[categoryName]/product-list-skeletons";

describe("ProductListSkeletons", () => {
  it("renders skeleton elements correctly", () => {
    render(<ProductListSkeletons />);

    // Check for the presence of skeleton elements
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0); // Ensure there are skeleton elements rendered

    // Optionally, check for specific skeleton properties or classes
    expect(skeletons[0]).toHaveClass(
      "relative h-[275px] w-[300px] md:w-full mx-auto lg:h-[540px] lg:w-[530px]"
    );
  });
});
