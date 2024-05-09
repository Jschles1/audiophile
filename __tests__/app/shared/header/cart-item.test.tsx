import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "@/app/shared/header/cart-item";
import { postUpdateCartItemQuantity } from "@/lib/fetchers";

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(({ mutationFn }) => ({
    mutate: mutationFn,
  })),
  useQueryClient: vi.fn(() => ({
    refetchQueries: vi.fn(),
  })),
}));

vi.mock("@/lib/fetchers", () => ({
  postUpdateCartItemQuantity: vi.fn(),
}));

vi.mock("@/components/ui/use-toast", () => ({
  useToast: vi.fn(() => ({ toast: vi.fn() })),
}));

vi.mock("@/lib/useCartItems", () => ({
  default: vi.fn(() => ({
    cartId: "123",
  })),
}));

describe("CartItem Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly and handles increment and decrement actions", () => {
    const props = {
      id: 1,
      name: "Test Product",
      quantity: 2,
      price: 100,
      image: "/test-image.jpg",
      quantityInStock: 5,
      variant: "cart" as "cart",
    };

    render(<CartItem {...props} />);

    // Check if the product name and price are displayed correctly
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();

    // Simulate increment action
    fireEvent.click(screen.getByText("+"));
    expect(postUpdateCartItemQuantity).toHaveBeenCalledWith("123", {
      id: 1,
      name: "Test Product",
      quantity: 3,
      price: 100,
      image: "/test-image.jpg",
      quantityInStock: 5,
      cartId: parseInt("123"),
    });

    // Simulate decrement action
    fireEvent.click(screen.getByText("-"));
    expect(postUpdateCartItemQuantity).toHaveBeenCalledWith("123", {
      id: 1,
      name: "Test Product",
      quantity: 1,
      price: 100,
      image: "/test-image.jpg",
      quantityInStock: 5,
      cartId: parseInt("123"),
    });
  });
});
