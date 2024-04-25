import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/app/shared/header/header";
import { render } from "../../../../vitest.setup";

vi.mock("@/lib/useCartItems", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: [],
    isLoading: false,
    isFetching: false,
    isRefetching: false,
    cartId: "1",
  })),
}));

describe("<Header />", () => {
  it("Renders the header", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Contains navigation links with correct hrefs", () => {
    render(<Header />);
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

  it("Checks for correct alt text in images", () => {
    render(<Header />);
    expect(screen.getByAltText("Audiophile Logo")).toBeDefined();
  });

  it("Toggles the menu on menu button click", async () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Menu");
    expect(screen.queryByTestId("menu-container")).not.toBeInTheDocument(); // Assuming "menu" is part of the menu

    // Open menu
    await userEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId("menu-container")).toBeInTheDocument();
    });

    // Close menu
    await userEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.queryByTestId("menu-container")).not.toBeInTheDocument();
    });
  });

  it("Toggles the cart on cart button click", async () => {
    render(<Header />);
    const cartButton = screen.getByLabelText("Cart");
    expect(screen.queryByTestId("cart")).not.toBeInTheDocument(); // Assuming "cart" is part of the cart component

    // Open cart
    await userEvent.click(cartButton);
    await waitFor(() => {
      expect(screen.getByTestId("cart")).toBeInTheDocument();
    });

    // Close cart
    await userEvent.click(cartButton);
    await waitFor(() => {
      expect(screen.queryByTestId("cart")).not.toBeInTheDocument();
    });
  });

  it("Applies different background class when on homepage", () => {
    // Mock `usePathname` to return homepage path
    vi.mock("next/navigation", () => ({
      usePathname: vi.fn(() => "/"),
    }));

    render(<Header />);
    expect(screen.getByTestId("header")).toHaveClass("bg-soft-black");
  });
});
