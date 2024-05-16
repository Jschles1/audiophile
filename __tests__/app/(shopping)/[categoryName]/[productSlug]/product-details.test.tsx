// src/app/(shopping)/[categoryName]/[productSlug]/__tests__/product-details.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor, screen, fireEvent } from "@testing-library/react";
import { render } from "../../../../../vitest.setup"; // Adjust the import path as necessary
import ProductDetails from "@/app/(shopping)/[categoryName]/[productSlug]/product-details";
import {
  fetchProductDetail,
  postAddCartItem,
  postUpdateCartItemQuantity,
} from "@/lib/fetchers";
import useCartItems from "@/lib/useCartItems";
import { useQuery } from "@tanstack/react-query";

const initialData = {
  id: 1,
  name: "Test Product",
  slug: "test-product",
  description: "Test Description",
  price: 100,
  imageGallery: JSON.stringify({
    first: {
      mobile: "first-mobile.jpg",
      tablet: "first-tablet.jpg",
      desktop: "first-desktop.jpg",
    },
    second: {
      mobile: "second-mobile.jpg",
      tablet: "second-tablet.jpg",
      desktop: "second-desktop.jpg",
    },
    third: {
      mobile: "third-mobile.jpg",
      tablet: "third-tablet.jpg",
      desktop: "third-desktop.jpg",
    },
  }),
  mobileImage: "first-mobile.jpg",
  tabletImage: "first-tablet.jpg",
  desktopImage: "first-desktop.jpg",
  new: true,
  quantityInStock: 10,
  features: "Test Features",
  ProductAddOn: [{ id: 1, item: "Test AddOn", quantity: 2 }],
  RelatedProduct: [
    {
      id: 2,
      name: "Related Product",
      slug: "related-product",
      mobileImage: "related-mobile.jpg",
      desktopImage: "related-desktop.jpg",
      tabletImage: "related-tablet.jpg",
    },
  ],
};

// Mock the API and other dependencies
vi.mock("@/lib/fetchers", () => ({
  fetchProductDetail: vi.fn(),
  postAddCartItem: vi.fn(),
  postUpdateCartItemQuantity: vi.fn(),
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
  useQuery: vi.fn(() => ({
    data: initialData,
    queryFn: (categoryName: string, productSlug: string) =>
      fetchProductDetail(categoryName, productSlug),
    initialData: initialData,
    isLoading: false,
    isError: false,
  })),
}));
vi.mock("next-client-cookies", () => ({
  useCookies: () => ({
    get: vi.fn().mockImplementation((key) => {
      if (key === "cartId") return "123";
      return null;
    }),
    set: vi.fn(),
  }),
}));

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.resetModules(); // Reset all modules
    vi.mock("@/lib/useCartItems", () => ({
      default: vi.fn(() => ({
        cartData: [],
        cartId: "123",
      })),
    }));

    (useQuery as any).mockImplementation(() => ({
      data: initialData,
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
      queryFn: () => fetchProductDetail("electronics", "test-product"),
    }));
  });
  it("renders product details correctly", async () => {
    (useCartItems as any).mockReturnValue({ data: [], cartId: "123" });
    (fetchProductDetail as any).mockResolvedValue(initialData);
    render(
      <ProductDetails
        initialData={initialData}
        categoryName="electronics"
        productSlug="test-product"
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByText("Test Features")).toBeInTheDocument();
      expect(screen.getByText("Related Product")).toBeInTheDocument();
    });
  });

  it("handles add to cart functionality", async () => {
    (fetchProductDetail as any).mockResolvedValue(initialData);
    (postAddCartItem as any).mockResolvedValue({ cartId: "123" });
    render(
      <ProductDetails
        initialData={initialData}
        categoryName="electronics"
        productSlug="test-product"
      />
    );

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(postAddCartItem).toHaveBeenCalled();
    });
  });

  it("handles update cart functionality", async () => {
    const updateCartItem = {
      id: 1,
      name: "Test Product",
      quantity: 1,
      price: 100,
      image: "first-mobile.jpg",
      quantityInStock: 10,
      cartId: 123,
    };

    (useCartItems as any).mockReturnValue({
      data: [updateCartItem],
      cartId: "123",
    });

    (fetchProductDetail as any).mockResolvedValue(initialData);
    (postUpdateCartItemQuantity as any).mockResolvedValue({ cartId: "123" });
    render(
      <ProductDetails
        initialData={initialData}
        categoryName="electronics"
        productSlug="test-product"
      />
    );

    const updateCartButton = screen.getByText("Add to Cart");
    fireEvent.click(updateCartButton);

    await waitFor(() => {
      expect(postUpdateCartItemQuantity).toHaveBeenCalledWith(
        "123",
        updateCartItem
      );
    });
  });

  it("displays loading state initially", () => {
    (useQuery as any).mockImplementationOnce(() => ({
      data: initialData,
      isLoading: true,
      isError: false,
      isSuccess: true,
      error: null,
    }));
    (fetchProductDetail as any).mockResolvedValue(initialData);
    render(
      <ProductDetails
        initialData={initialData}
        categoryName="electronics"
        productSlug="test-product"
      />
    );

    expect(screen.getByTestId("product-detail-skeletons")).toBeInTheDocument();
  });
});
