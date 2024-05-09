import { describe, it, expect } from "vitest";
import formSchema from "@/app/(checkout)/checkout/checkout-form-schema";

describe("Checkout Form Schema", () => {
  it("validates base fields correctly", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      zip: "12345",
      city: "Anytown",
      country: "USA",
      paymentMethod: "cash",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email and phone number", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john",
      phone: "123",
      address: "123 Main St",
      zip: "12345",
      city: "Anytown",
      country: "USA",
      paymentMethod: "cash",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain(
        "Invalid Email"
      );
      expect(result.error.flatten().fieldErrors.phone).toContain(
        "Invalid Phone Number"
      );
    }
  });

  it("validates e-money payment method with required fields", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      zip: "12345",
      city: "Anytown",
      country: "USA",
      paymentMethod: "emoney",
      emoneyNumber: "123456",
      pin: "1234",
    });

    expect(result.success).toBe(true);
  });

  it("rejects e-money payment without emoneyNumber and pin", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      zip: "12345",
      city: "Anytown",
      country: "USA",
      paymentMethod: "emoney",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().formErrors).toContain("Invalid input");
    }
  });
});
