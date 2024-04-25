import { vi } from "vitest";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: vi.fn((props) => <img {...props} />),
}));

function render(ui: React.ReactElement, { ...options } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Typically you want to disable retries in tests
      },
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Optional: Setup to use jest-dom for improved assertions
import "@testing-library/jest-dom";
export * from "@testing-library/react";
export { render };
