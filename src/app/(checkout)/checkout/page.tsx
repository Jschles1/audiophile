"use client";

import * as React from "react";
import Image from "next/image";
import GoBack from "@/app/go-back";
import CartItem from "@/app/cart-item";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CashDeliveryIcon from "/public/assets/checkout/icon-cash-on-delivery.svg";
import { Button } from "@/components/ui/button";

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

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = React.useState<"emoney" | "cash">(
    "emoney"
  );
  return (
    <div className="w-full bg-alabaster">
      <GoBack />
      <div>
        <div className="bg-white p-6 mx-6 rounded-lg mb-8">
          <h1 className="uppercase text-[1.75rem] tracking-[0.0625em] font-bold pb-8">
            Checkout
          </h1>
          <div className="pb-8">
            <SectionHeader>Billing Details</SectionHeader>
            <div className="flex flex-col gap-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Name" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input type="text" id="email" placeholder="Email Address" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="text" id="phone" placeholder="Phone Number" />
              </div>
            </div>
          </div>
          <div className="pb-8">
            <SectionHeader>Shipping Info</SectionHeader>
            <div className="flex flex-col gap-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="address">Your Address</Label>
                <Input type="text" id="address" placeholder="Your Address" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="zip">Zip Code</Label>
                <Input type="text" id="zip" placeholder="Zip Code" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" placeholder="City" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input type="text" id="country" placeholder="Country" />
              </div>
            </div>
          </div>
          <div className="pb-8">
            <SectionHeader>Payment Details</SectionHeader>
            <div>
              <p className="font-bold tracking-[-0.013375em] text-[0.75rem] pb-4">
                Payment Method
              </p>
              <RadioGroup
                defaultValue={paymentMethod}
                value={paymentMethod}
                className="pb-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="emoney"
                    id="emoney"
                    onClick={() => setPaymentMethod("emoney")}
                  />
                  <Label htmlFor="emoney">e-Money</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="cash"
                    id="cash"
                    onClick={() => setPaymentMethod("cash")}
                  />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
              {paymentMethod === "emoney" && (
                <div className="flex flex-col gap-y-6">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="emoney-number">e-Money Number</Label>
                    <Input
                      type="text"
                      id="emoney-number"
                      placeholder="238521993"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pin">e-Money PIN</Label>
                    <Input type="text" id="pin" placeholder="6891" />
                  </div>
                </div>
              )}
              {paymentMethod === "cash" && (
                <div className="flex flex-col gap-y-6">
                  <Image src={CashDeliveryIcon} className="mx-auto" alt="" />
                  <p className="text-[0.938rem] leading-[1.563rem] text-black text-opacity-50 text-center">
                    The &apos;Cash on Delivery&apos; option enables you to pay
                    in cash when our delivery courier arrives at your residence.
                    Just make sure your address is correct so that your order
                    will not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>
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

          <Button variant="default" className="w-full">
            Continue & Pay
          </Button>
        </div>
      </div>
    </div>
  );
}
