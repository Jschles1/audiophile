import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/[categoryName]/[productSlug]/route";

const mockProductDetail = [
  {
    id: 1,
    slug: "premium-headphones",
    name: "Premium Headphones",
    mobileImage: "/images/products/headphones/mobile/premium.jpg",
    tabletImage: "/images/products/headphones/tablet/premium.jpg",
    desktopImage: "/images/products/headphones/desktop/premium.jpg",
    new: true,
    price: 350,
    description: "High-quality sound with noise cancellation features.",
    features: "Wireless, Noise cancellation, Over-ear",
    imageGallery: {
      mobile: [
        "/images/gallery/headphones/mobile/premium-1.jpg",
        "/images/gallery/headphones/mobile/premium-2.jpg",
      ],
      tablet: [
        "/images/gallery/headphones/tablet/premium-1.jpg",
        "/images/gallery/headphones/tablet/premium-2.jpg",
      ],
      desktop: [
        "/images/gallery/headphones/desktop/premium-1.jpg",
        "/images/gallery/headphones/desktop/premium-2.jpg",
      ],
    },
    quantityInStock: 15,
    RelatedProduct: [
      {
        id: 2,
        name: "Compact Headphones",
        productId: 1,
        slug: "compact-headphones",
        desktopImage: "/images/products/headphones/desktop/compact.jpg",
        mobileImage: "/images/products/headphones/mobile/compact.jpg",
        tabletImage: "/images/products/headphones/tablet/compact.jpg",
      },
    ],
    ProductAddOn: [
      {
        id: 101,
        quantity: 2,
        productId: 1,
        item: "Carrying Case",
      },
      {
        id: 102,
        quantity: 1,
        productId: 1,
        item: "Extra Ear Pads",
      },
    ],
  },
];

vi.mock("@/api/products", () => ({
  getProductDetail: vi.fn(() => Promise.resolve(mockProductDetail[0])),
}));

describe("/api/[categoryName]/[productSlug]", () => {
  it("GET /api/[categoryName]/[productSlug] should return product detail", async () => {
    const req = new NextRequest(
      "http://localhost/api/headphones/premium-headphones"
    );
    const response = await GET(req, {
      params: { categoryName: "headphones", productSlug: "premium-headphones" },
    });
    expect(await response.json()).toEqual(mockProductDetail[0]);
  });
});
