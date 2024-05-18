// src/app/(shopping)/[categoryName]/__tests__/category-header.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../vitest.setup";
import CategoryHeader from "@/app/(shopping)/[categoryName]/category-header";

describe("CategoryHeader", () => {
  it("renders the category name correctly", () => {
    const categoryName = "Electronics";
    render(<CategoryHeader categoryName={categoryName} />);

    const headerElement = screen.getByRole("heading", { name: categoryName });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent(categoryName);
    expect(headerElement).toHaveClass(
      "bg-black text-white uppercase text-center font-bold"
    );
  });

  it("applies responsive styles correctly", () => {
    const categoryName = "Books";
    render(<CategoryHeader categoryName={categoryName} />);

    const headerElement = screen.getByRole("heading", { name: categoryName });
    expect(headerElement).toHaveClass("text-[1.75rem] md:text-[2.5rem]");
  });
});
