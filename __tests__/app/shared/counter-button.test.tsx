import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CounterButton from "@/app/shared/counter-button";

describe("CounterButton Component", () => {
  it("renders correctly with initial value and calls increment and decrement", () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const props = {
      variant: "pdp" as "pdp",
      className: "test-class",
      onIncrement,
      onDecrement,
      value: 3,
    };

    render(<CounterButton {...props} />);

    // Check if the value is displayed correctly
    expect(screen.getByText("3")).toBeInTheDocument();

    // Simulate clicks and test if the handlers are called
    fireEvent.click(screen.getByText("+"));
    expect(onIncrement).toHaveBeenCalled();

    fireEvent.click(screen.getByText("-"));
    expect(onDecrement).toHaveBeenCalled();

    // Check if decrement button is not disabled
    expect(screen.getByText("-").closest("button")).not.toBeDisabled();

    // Check if the class names are applied correctly
    expect(screen.getByText("3").parentNode).toHaveClass("test-class");
  });

  it("disables decrement button when value is 0", () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const props = {
      variant: "cart" as "cart",
      onIncrement,
      onDecrement,
      value: 0,
    };

    render(<CounterButton {...props} />);

    // Check if decrement button is disabled when value is 0
    expect(screen.getByText("-").closest("button")).toBeDisabled();
  });
});
