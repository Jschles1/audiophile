import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/app/home/hero";

describe("Hero Component", () => {
  it("renders the hero section with image and link", () => {
    render(<Hero />);

    // Check if the hero image is rendered
    expect(screen.getByAltText("Hero Image")).toBeInTheDocument();

    // Check if the link is correct
    expect(screen.getByText("See Product").closest("a")).toHaveAttribute(
      "href",
      "/headphones/xx99-mark-two-headphones"
    );
  });
});
