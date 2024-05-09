import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutAudiofile from "@/app/(shopping)/about-audiofile";

describe("AboutAudiofile Component", () => {
  it("renders the component with image and text content", () => {
    render(<AboutAudiofile />);

    // Check if the image is rendered
    expect(screen.getByAltText("Best Gear Image")).toBeInTheDocument();

    // Check if the title text is rendered
    expect(
      screen.getAllByText(
        (content, element) =>
          !!element?.textContent?.includes("Bringing You The Best Audio Gear")
      )
    ).toBeTruthy();

    // Check if the description text is rendered
    expect(
      screen.getByText(/Located at the heart of New York City/i)
    ).toBeInTheDocument();
  });
});
