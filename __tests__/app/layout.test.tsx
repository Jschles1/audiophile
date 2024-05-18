// src/app/__tests__/layout.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

vi.mock("@/app/shared/header/header", () => ({
  __esModule: true,
  default: () => <header>Header</header>,
}));

vi.mock("@/app/shared/footer", () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>,
}));

vi.mock("next-client-cookies/server", () => ({
  __esModule: true,
  CookiesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("next/font/google", () => ({
  __esModule: true,
  Manrope: () => ({ className: "manrope-latin" }),
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
  });
});
