// src/app/(shopping)/[categoryName]/__tests__/loading.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render } from "../../../../vitest.setup";
import { screen } from "@testing-library/react";
import Loading from "@/app/(shopping)/[categoryName]/loading";

describe("Loading Component", () => {
  it("renders loading message and skeleton components", () => {
    render(<Loading />);

    // Check for the presence of the loading message
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
