"use client";

import * as React from "react";
import * as z from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GoBack from "@/app/go-back";
import CartItem from "@/app/cart-item";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CashDeliveryIcon from "/public/assets/checkout/icon-cash-on-delivery.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const xx99_placeholder =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/da22de76-9f3e-4b4f-fb6c-873ae4bad600/public";
const xx59_placeholder =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/ff2d3b3a-b435-4f46-9764-2ffb3d1e2600/public";
const yx1_placeholder =
  "https://imagedelivery.net/6KDd5cVQw9hKTW2jhIVucw/18a6e5ad-f8d3-46c1-f7d9-44500c50e200/public";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="uppercase text-[0.813rem] tracking-[0.0580625em] font-bold text-raw-sienna leading-[1.563rem] pb-4">
      {children}
    </p>
  );
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Required Field" }),
  email: z.string().email({ message: "Invalid Email" }),
  phone: z
    .string()
    .min(10, { message: "Invalid Phone Number" })
    .max(15, { message: "Invalid Phone Number" }),
  address: z.string().min(1, { message: "Required Field" }),
  zip: z
    .string()
    .min(5, { message: "Invalid ZIP" })
    .max(10, { message: "Invalid ZIP" }),
  city: z.string().min(1, { message: "Required Field" }),
  country: z.string().min(1, { message: "Required Field" }),
  paymentMethod: z.enum(["emoney", "cash"]),
  emoneyNumber: z.string().optional(),
  pin: z.string().optional(),
});

export default function Checkout() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      paymentMethod: "emoney",
      emoneyNumber: "",
      pin: "",
    },
  });

  const currentPaymentMethod = form.watch("paymentMethod");
  const errors = form.formState.errors;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function handlePaymentMethodChange(value: string) {
    form.setValue("paymentMethod", value as "emoney" | "cash");
  }

  // Set errors manually for e-money fields, only if emoney is selected.
  React.useEffect(() => {
    if (currentPaymentMethod === "emoney" && form.formState.isSubmitted) {
      if (!form.getValues("emoneyNumber")) {
        form.setError("emoneyNumber", {
          type: "manual",
          message: "Required Field",
        });
      }

      if (!form.getValues("pin")) {
        form.setError("pin", {
          type: "manual",
          message: "Required Field",
        });
      }
    }
  }, [form.formState.isSubmitted, currentPaymentMethod, form]);

  return (
    <div className="w-full bg-alabaster">
      <GoBack />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white p-6 mx-6 rounded-lg mb-8">
            <h1 className="uppercase text-[1.75rem] tracking-[0.0625em] font-bold pb-8">
              Checkout
            </h1>

            <div className="pb-8">
              <SectionHeader>Billing Details</SectionHeader>
              <div className="flex flex-col gap-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>Name</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <Input
                          placeholder="Name"
                          error={errors?.name?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>Email Address</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          error={errors?.email?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>Phone Number</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          error={errors?.phone?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pb-8">
              <SectionHeader>Shipping Info</SectionHeader>
              <div className="flex flex-col gap-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>Shipping Address</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Shipping Address"
                          error={errors?.address?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>ZIP Code</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          maxLength={10}
                          placeholder="Zip Code"
                          error={errors?.zip?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>City</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="City"
                          error={errors?.city?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex items-center justify-between">
                        <FormLabel>Country</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          error={errors?.country?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pb-8">
              <SectionHeader>Payment Details</SectionHeader>
              <div>
                <p className="font-bold tracking-[-0.013375em] text-[0.75rem] pb-4">
                  Payment Method
                </p>
                <RadioGroup
                  defaultValue={"emoney"}
                  value={form.getValues("paymentMethod")}
                  className="pb-8"
                >
                  <div
                    className={cn(
                      "flex items-center gap-x-4 px-4 py-[1.125rem] rounded-lg",
                      currentPaymentMethod === "emoney" &&
                        "border border-raw-sienna"
                    )}
                  >
                    <RadioGroupItem
                      value="emoney"
                      id="emoney"
                      onClick={() => handlePaymentMethodChange("emoney")}
                    />
                    <Label
                      htmlFor="emoney"
                      className="text-sm font-bold leading-[normal]"
                    >
                      e-Money
                    </Label>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-x-4 px-4 py-[1.125rem] rounded-lg",
                      currentPaymentMethod === "cash" &&
                        "border border-raw-sienna"
                    )}
                  >
                    <RadioGroupItem
                      value="cash"
                      id="cash"
                      onClick={() => handlePaymentMethodChange("cash")}
                    />
                    <Label
                      htmlFor="cash"
                      className="text-sm font-bold leading-[normal]"
                    >
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {currentPaymentMethod === "emoney" && (
                  <div className="flex flex-col gap-y-6">
                    <FormField
                      control={form.control}
                      name="emoneyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-full flex items-center justify-between">
                            <FormLabel>e-Money Number</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="238521993"
                              error={errors?.emoneyNumber?.message}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-full flex items-center justify-between">
                            <FormLabel>e-Money PIN</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              maxLength={4}
                              placeholder="6981"
                              error={errors?.pin?.message}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentPaymentMethod === "cash" && (
                  <div className="flex flex-col gap-y-6">
                    <Image src={CashDeliveryIcon} className="mx-auto" alt="" />
                    <p className="text-[0.938rem] leading-[1.563rem] text-black text-opacity-50 text-center">
                      The &apos;Cash on Delivery&apos; option enables you to pay
                      in cash when our delivery courier arrives at your
                      residence. Just make sure your address is correct so that
                      your order will not be cancelled.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* </form>
          </Form> */}
          </div>

          <div className="bg-white p-6 mx-6 rounded-lg mb-[6.125rem]">
            <p className="text-black font-bold text-lg tracking-[0.080375em] leading-[normal] uppercase">
              Summary
            </p>
            <div className="flex flex-col py-8 gap-y-6">
              <CartItem
                variant="checkout"
                name="XX99 Mark II"
                quantity={1}
                price={2999}
                image={xx99_placeholder}
              />

              <CartItem
                variant="checkout"
                name="XX59"
                quantity={1}
                price={899}
                image={xx59_placeholder}
              />

              <CartItem
                name="YX1"
                quantity={1}
                price={599}
                image={yx1_placeholder}
                variant="checkout"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row item-center justify-between">
                <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                  Total
                </p>
                <p className="text-black font-bold text-lg leading-[normal]">
                  ${(5396).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-row item-center justify-between">
                <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                  Shipping
                </p>
                <p className="text-black font-bold text-lg leading-[normal]">
                  ${(50).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-row item-center justify-between">
                <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                  VAT (Included)
                </p>
                <p className="text-black font-bold text-lg leading-[normal]">
                  ${(1079).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-row item-center justify-between pt-4 pb-8">
              <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                Grand Total
              </p>
              <p className="font-bold text-lg leading-[normal] text-raw-sienna">
                ${(5446).toLocaleString()}
              </p>
            </div>

            <Button variant="default" type="submit" className="w-full">
              Continue & Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
