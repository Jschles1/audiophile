// src/app/__tests__/layout.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";
import Header from "@/app/shared/header/header";
import Footer from "@/app/shared/footer";

vi.mock("@/app/shared/header/header", () => ({
  __esModule: true,
  default: () => <header>Header</header>,
}));

vi.mock("@/app/shared/footer", () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>,
}));

describe("RootLayout", () => {
  it("renders children and layout components correctly", () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    // Check for the presence of child content
    expect(screen.getByText("Test Child")).toBeInTheDocument();

    // Check for the presence of layout components
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();

    // Check for the presence of specific classes
    expect(document.body).toHaveClass("manrope-latin");
  });
});
