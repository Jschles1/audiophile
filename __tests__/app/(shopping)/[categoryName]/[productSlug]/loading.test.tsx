// src/app/(shopping)/[categoryName]/[productSlug]/__tests__/loading.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../../../../vitest.setup";
import Loading from "@/app/(shopping)/[categoryName]/[productSlug]/loading";

vi.mock(
  "@/app/(shopping)/[categoryName]/[productSlug]/product-details-skeletons",
  () => ({
    __esModule: true,
    default: () => <div>Product Details Skeletons</div>,
  })
);

vi.mock("@/app/(shopping)/categories", () => ({
  __esModule: true,
  default: () => <div>Categories</div>,
}));

vi.mock("@/app/(shopping)/about-audiofile", () => ({
  __esModule: true,
  default: () => <div>About Audiofile</div>,
}));

describe("Loading Component", () => {
  it("renders skeleton components", () => {
    render(<Loading />);

    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("About Audiofile")).toBeInTheDocument();
  });
});
