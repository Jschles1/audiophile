import { vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: vi.fn((props) => <img {...props} />),
}));

// Optional: Setup to use jest-dom for improved assertions
import "@testing-library/jest-dom";
