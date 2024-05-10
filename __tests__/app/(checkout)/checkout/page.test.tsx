import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "@/app/(checkout)/checkout/page";
import { useRouter } from "next/router";
import useCartItems from "@/lib/useCartItems";
import { useMutation } from "@tanstack/react-query";
import { deleteRemoveAllCartItems } from "@/lib/fetchers";
import { afterEach } from "node:test";
import { act } from "react-dom/test-utils";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock necessary hooks and modules
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));
vi.mock("@/lib/useCartItems", () => ({
  default: vi.fn(),
}));
vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(({ mutationFn }) => ({
    mutate: mutationFn,
    mutateAsync: mutationFn,
  })),
  useQueryClient: vi.fn(() => ({
    refetchQueries: vi.fn(),
  })),
}));
vi.mock("@/lib/fetchers", () => ({
  deleteRemoveAllCartItems: vi.fn(),
}));

describe("Checkout Component", () => {
  beforeEach(() => {
    (useRouter as any).mockImplementation(() => ({
      push: vi.fn(),
    }));
    (useCartItems as any).mockImplementation(() => ({
      cartId: "123",
      data: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    }));
  });

  it("renders checkout form and handles submission", async () => {
    render(<Checkout />);

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("Zip Code"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Anytown" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByPlaceholderText("238521993"), {
      target: { value: "238521993" },
    });
    fireEvent.change(screen.getByPlaceholderText("6981"), {
      target: { value: "6981" },
    });

    // Simulate form submission
    // fireEvent.submit(screen.getByRole("form"));
    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
    });

    expect(screen.getByText("Thank you for your order")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId("back-to-home"));
    });

    expect(deleteRemoveAllCartItems).toHaveBeenCalled();
  });

  it("displays loading state correctly", () => {
    (useCartItems as any).mockImplementationOnce(() => ({
      cartId: "123",
      data: [],
      isLoading: true,
      isFetching: false,
      isRefetching: false,
    }));

    render(<Checkout />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("displays error state correctly", async () => {
    render(<Checkout />);

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "john@example" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("Zip Code"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Anytown" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByPlaceholderText("238521993"), {
      target: { value: "238521993" },
    });
    fireEvent.change(screen.getByPlaceholderText("6981"), {
      target: { value: "6981" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
    });

    expect(screen.getByText("Invalid Email")).toBeInTheDocument();

    screen.debug(document.body, 100000);
  });
});
