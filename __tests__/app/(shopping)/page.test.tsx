import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(shopping)/page";

describe("Home Page", () => {
  it("renders correctly with all subcomponents", () => {
    render(<Home />);

    // Check if all components are rendered
    expect(
      screen.getByText(
        "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Speakers")).toBeInTheDocument();
    expect(screen.getByAltText("Best Gear Image")).toBeInTheDocument();
    expect(screen.getByText("ZX7 Speaker")).toBeInTheDocument();
  });
});
