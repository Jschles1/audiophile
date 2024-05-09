import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartItemCount from "@/app/shared/header/cart-item-count";
import useCartItems from "@/lib/useCartItems";

vi.mock("@/lib/useCartItems", () => ({
  default: vi.fn(),
}));

describe("CartItemCount Component", () => {
  it("renders the cart item count when items are present", () => {
    (useCartItems as any).mockReturnValue({
      data: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 3 },
      ],
    });

    render(<CartItemCount />);
    const countDisplay = screen.getByText("2");
    expect(countDisplay).toBeInTheDocument();
  });

  it("does not render when there are no cart items", () => {
    (useCartItems as any).mockReturnValue({
      data: [],
    });

    const { container } = render(<CartItemCount />);
    expect(container).toBeEmptyDOMElement();
  });
});
