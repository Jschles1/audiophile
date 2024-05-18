import { describe, it, expect } from "vitest";
import { cn, truncateProductName } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("combines class names correctly", () => {
      const result = cn("btn", "btn-primary", {
        "btn-disabled": false,
        "btn-large": true,
      });
      // Expected output depends on the implementation details of clsx and twMerge
      expect(result).toBe("btn btn-primary btn-large");
    });

    it("handles conditional classes correctly", () => {
      const result = cn("btn", { "btn-disabled": true, "btn-active": false });
      expect(result).toBe("btn btn-disabled");
    });
  });

  describe("truncateProductName", () => {
    it('removes "Headphones" from product names', () => {
      const productName = "SuperBass Headphones";
      const truncated = truncateProductName(productName);
      expect(truncated).toBe("SuperBass");
    });

    it('removes "Earphones" from product names', () => {
      const productName = "UltraSound Earphones";
      const truncated = truncateProductName(productName);
      expect(truncated).toBe("UltraSound");
    });

    it('removes "Speaker" from product names', () => {
      const productName = "Dolby Speaker";
      const truncated = truncateProductName(productName);
      expect(truncated).toBe("Dolby");
    });

    it("handles product names without removable parts", () => {
      const productName = "Gaming Mouse";
      const truncated = truncateProductName(productName);
      expect(truncated).toBe("Gaming Mouse");
    });
  });
});
