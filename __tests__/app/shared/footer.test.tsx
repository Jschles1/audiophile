import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/app/shared/footer";

describe("<Footer />", () => {
  it("Renders without crashing", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /audiophile is an all in one stop to fulfill your audio needs/i
      )
    ).toBeInTheDocument();
  });

  it("Contains navigation links with correct hrefs", () => {
    render(<Footer />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Headphones").closest("a")).toHaveAttribute(
      "href",
      "/headphones"
    );
    expect(screen.getByText("Speakers").closest("a")).toHaveAttribute(
      "href",
      "/speakers"
    );
    expect(screen.getByText("Earphones").closest("a")).toHaveAttribute(
      "href",
      "/earphones"
    );
  });

  it("Displays social links", () => {
    render(<Footer />);
    expect(screen.getAllByAltText("Facebook Icon")).toBeDefined();
    expect(screen.getAllByAltText("Twitter Icon")).toBeDefined();
    expect(screen.getAllByAltText("Instagram Icon")).toBeDefined();
  });

  it("Checks for correct alt text in images", () => {
    render(<Footer />);
    expect(screen.getByAltText("Audiophile Logo")).toBeDefined();
  });

  it("Checks copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/copyright 2023. all rights reserved/i)
    ).toBeDefined();
  });
});
