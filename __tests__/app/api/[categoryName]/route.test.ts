import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/[categoryName]/route";

const mockCategoryProducts = [
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
  },
];

vi.mock("@/api/products", () => ({
  getCategoryProducts: vi.fn(() => Promise.resolve(mockCategoryProducts)),
}));

describe("/api/[categoryName]", () => {
  it("GET /api/[categoryName] should return products", async () => {
    const req = new NextRequest("http://localhost/api/headphones");
    const response = await GET(req, { params: { categoryName: "headphones" } });
    expect(await response.json()).toEqual(mockCategoryProducts);
  });
});
