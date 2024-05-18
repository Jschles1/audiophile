import { renderHook } from "@testing-library/react";
import useCartItems from "@/lib/useCartItems";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { vi, describe, expect, it } from "vitest";

vi.mock("next-client-cookies", () => ({
  useCookies: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("@/lib/fetchers", () => ({
  fetchCartItems: vi.fn(),
}));

describe("useCartItems", () => {
  it("handles undefined cartId correctly", () => {
    const cookies = { get: vi.fn().mockReturnValue("undefined") };
    (useCookies as any).mockImplementation(() => cookies);
    (useQuery as any).mockImplementation(({ queryFn }: any) => ({
      data: queryFn(),
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    }));
    const { result } = renderHook(() => useCartItems());
    expect(result.current.cartId).toBe("new");
  });

  it("fetches cart items correctly", () => {
    const cookies = { get: vi.fn().mockReturnValue("123") };
    (useCookies as any).mockImplementation(() => cookies);
    const mockData = [{ id: 1, name: "Product" }];
    (useQuery as any).mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    }));
    const { result } = renderHook(() => useCartItems());
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isRefetching).toBe(false);
    expect(result.current.cartId).toBe("123");
  });
});
