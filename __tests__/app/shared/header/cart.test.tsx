import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "@/app/shared/header/cart";
import { deleteRemoveAllCartItems } from "@/lib/fetchers";
import useCartItems from "@/lib/useCartItems";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(({ mutationFn }) => ({
    mutate: mutationFn,
  })),
  useQueryClient: vi.fn(() => ({
    refetchQueries: vi.fn(),
  })),
}));

vi.mock("@/lib/fetchers", () => ({
  deleteRemoveAllCartItems: vi.fn(),
}));

vi.mock("@/components/ui/use-toast", () => ({
  useToast: vi.fn(() => ({ toast: vi.fn() })),
}));

vi.mock("@/lib/useCartItems", () => ({
  default: vi.fn(() => ({
    data: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
    cartId: "123",
  })),
}));

describe("Cart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders cart items and handles interactions", () => {
    render(<Cart />);

    // Check if cart items are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    // Simulate clicking the remove all button
    fireEvent.click(screen.getByText("Remove all"));
    expect(deleteRemoveAllCartItems).toHaveBeenCalledWith("123");

    // Simulate clicking the checkout button
    fireEvent.click(screen.getByText("Checkout"));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/checkout");
  });

  it("displays empty cart message when no items are present", () => {
    (useCartItems as any).mockReturnValueOnce({
      data: [],
      cartId: "123",
    });

    render(<Cart />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
