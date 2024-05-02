import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GoBack from "@/app/shared/go-back";

describe("<GoBack />", () => {
  it("calls window.history.back when the button is clicked", () => {
    // Mock window.history.back
    window.history.back = vi.fn();

    render(<GoBack />);

    // Get the button and simulate a click
    const goBackButton = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(goBackButton);

    // Expect window.history.back to have been called
    expect(window.history.back).toHaveBeenCalled();
  });
});
