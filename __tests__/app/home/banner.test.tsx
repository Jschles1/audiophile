import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Banners from "@/app/home/banners";

describe("Banners Component", () => {
  it("renders the banners with images and links", () => {
    render(<Banners />);

    // Check if images are rendered
    expect(screen.getByAltText("ZX9 Speaker")).toBeInTheDocument();
    expect(screen.getByAltText("ZX7 Speaker")).toBeInTheDocument();
    expect(screen.getByAltText("YX1 Earphones")).toBeInTheDocument();

    // Check if links are correct
    expect(screen.getAllByText("See Product")[0].closest("a")).toHaveAttribute(
      "href",
      "/speakers/zx9-speaker"
    );
    expect(screen.getAllByText("See Product")[1].closest("a")).toHaveAttribute(
      "href",
      "/speakers/zx7-speaker"
    );
    expect(screen.getAllByText("See Product")[2].closest("a")).toHaveAttribute(
      "href",
      "/earphones/yx1-earphones"
    );
  });
});
