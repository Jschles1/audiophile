"use client";

import * as React from "react";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GoBack from "@/app/shared/go-back";
import CartItem from "@/app/shared/header/cart-item";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ConfirmationIcon from "/public/assets/checkout/icon-order-confirmation.svg";
import CashDeliveryIcon from "/public/assets/checkout/icon-cash-on-delivery.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import formSchema from "./checkout-form-schema";
import { Loader2 } from "lucide-react";
import useCartItems from "@/lib/useCartItems";
import { CartItem as CartItemModel } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRemoveAllCartItems } from "@/lib/fetchers";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="uppercase text-[0.813rem] tracking-[0.0580625em] font-bold text-raw-sienna leading-[1.563rem] pb-4">
      {children}
    </p>
  );
}

const SHIPPING_FEE = 50;
const VAT = 0.2;

export default function Checkout() {
  const queryClient = useQueryClient();
  const { cartId, data, isLoading, isFetching, isRefetching } = useCartItems();
  const router = useRouter();
  const cartItems: CartItemModel[] = data || [];
  const [isOrderPending, setIsOrderPending] = React.useState(false);
  const [accordion, setAccordion] = React.useState("one");
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    React.useState(false);

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

  const removeProductsMutation = useMutation({
    mutationFn: () => deleteRemoveAllCartItems(cartId),
    onMutate: () => setIsOrderPending(true),
    onSuccess: async (_) => {
      console.log("Success");
      await queryClient.refetchQueries({
        queryKey: ["cart", cartId],
      });
      setIsConfirmationDialogOpen(true);
      setIsOrderPending(false);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data;
      console.log({ errorMessage });
      setIsOrderPending(false);
      // toast({
      //   title: "Something went wrong!",
      //   description: `Error: ${errorMessage}`,
      // });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsOrderPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsConfirmationDialogOpen(true);
    setIsOrderPending(false);
  }

  function handlePaymentMethodChange(value: string) {
    form.setValue("paymentMethod", value as "emoney" | "cash");
  }

  function closeConfirmationDialog() {
    if (isConfirmationDialogOpen) {
      setIsConfirmationDialogOpen(false);
      removeProductsMutation.mutateAsync();
      router.push("/");
    }
  }

  React.useEffect(() => {
    if (currentPaymentMethod === "cash") {
      form.clearErrors(["emoneyNumber", "pin"]);
    }
  }, [form.formState.isSubmitted, currentPaymentMethod, form]);

  if (!cartItems?.length) {
    console.log("No cart items");
    if (typeof window !== "undefined") {
      router.push("/");
    }
  }

  // Clear errors when switching payment methods

  if (isLoading || isFetching || isRefetching) {
    return (
      <div>
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const vatTax = cartTotal * VAT;
  const grandTotal = cartTotal + SHIPPING_FEE + vatTax;

  return (
    <div className="w-full bg-alabaster">
      <GoBack />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-[1110px]"
        >
          <div className="lg:flex lg:flex-row lg:items-start lg:gap-x-[1.875rem]">
            <div className="bg-white p-6 mx-6 rounded-lg mb-8 lg:mr-0 lg:flex-1">
              <h1 className="uppercase text-[1.75rem] tracking-[0.0625em] font-bold pb-8">
                Checkout
              </h1>

              <div className="pb-8">
                <SectionHeader>Billing Details</SectionHeader>
                <div className="flex flex-col gap-y-6 md:flex-row md:flex-wrap md:gap-x-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="md:basis-[48%]">
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
                      <FormItem className="md:basis-[48%]">
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
                      <FormItem className="md:basis-[48%]">
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
                <div className="flex flex-col gap-y-6 md:flex-row md:flex-wrap md:gap-x-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="w-full flex items-center justify-between">
                          <FormLabel>Your Address</FormLabel>
                          <FormMessage />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Your Address"
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
                      <FormItem className="md:basis-[48%]">
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
                      <FormItem className="md:basis-[48%]">
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
                      <FormItem className="md:basis-[48%]">
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
                  <div className="md:flex md:flex-row md:items-start mg:gap-x-6">
                    <p className="font-bold tracking-[-0.013375em] text-[0.75rem] pb-4 md:basis-[48%]">
                      Payment Method
                    </p>
                    <RadioGroup
                      defaultValue={"emoney"}
                      value={form.getValues("paymentMethod")}
                      className="pb-8 md:flex-1 md:pl-4"
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
                  </div>

                  {currentPaymentMethod === "emoney" && (
                    <div>
                      <p className="text-[0.75rem] text-red font-bold pb-4 italic">
                        Disclaimer: Do NOT enter any real payment information on
                        this form. This is a mock application for demonstration
                        and testing purposes only.{" "}
                      </p>
                      <div className="flex flex-col gap-y-6 md:flex-row md:flex-wrap md:gap-x-4">
                        <FormField
                          control={form.control}
                          name="emoneyNumber"
                          render={({ field }) => (
                            <FormItem className="md:basis-[48%]">
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
                            <FormItem className="md:basis-[48%]">
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
                    </div>
                  )}

                  {currentPaymentMethod === "cash" && (
                    <div className="flex flex-col gap-y-6">
                      <Image
                        src={CashDeliveryIcon}
                        className="mx-auto"
                        alt=""
                      />
                      <p className="text-[0.938rem] leading-[1.563rem] text-black text-opacity-50 text-center">
                        The &apos;Cash on Delivery&apos; option enables you to
                        pay in cash when our delivery courier arrives at your
                        residence. Just make sure your address is correct so
                        that your order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 mx-6 rounded-lg mb-[6.125rem] lg:m-0 lg:w-[350px]">
              <p className="text-black font-bold text-lg tracking-[0.080375em] leading-[normal] uppercase">
                Summary
              </p>
              <div className="flex flex-col py-8 gap-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    variant="checkout"
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    image={item.image}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row item-center justify-between">
                  <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                    Total
                  </p>
                  <p className="text-black font-bold text-lg leading-[normal]">
                    ${cartTotal.toFixed(2).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-row item-center justify-between">
                  <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                    Shipping
                  </p>
                  <p className="text-black font-bold text-lg leading-[normal]">
                    ${SHIPPING_FEE.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-row item-center justify-between">
                  <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                    VAT (Included)
                  </p>
                  <p className="text-black font-bold text-lg leading-[normal]">
                    ${vatTax.toFixed(2).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-row item-center justify-between pt-4 pb-8">
                <p className="text-black text-opacity-50 uppercase text-[0.938rem] leading-[1.563rem]">
                  Grand Total
                </p>
                <p className="font-bold text-lg leading-[normal] text-raw-sienna">
                  ${grandTotal.toFixed(2).toLocaleString()}
                </p>
              </div>

              <Dialog
                open={isConfirmationDialogOpen}
                onOpenChange={closeConfirmationDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="default" type="submit" className="w-full">
                    {isOrderPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Continue & Pay"
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <Image src={ConfirmationIcon} alt="" />
                    <DialogTitle>Thank you for your order</DialogTitle>
                    <DialogDescription>
                      <p className="text-black text-opacity-50 text-[0.938rem] leading-[1.563rem] pb-6">
                        You will receive an email confirmation shortly.
                      </p>
                      <div className="md:flex md:flex-row md:w-full">
                        <div className="rounded-t-lg md:rounded-tr-none md:rounded-br-none md:rounded-bl-lg md:flex-1 bg-seashell p-6">
                          {cartItems.length === 1 ? (
                            <CartItem
                              id={cartItems[0].id}
                              name={cartItems[0].name}
                              quantity={cartItems[0].quantity}
                              price={cartItems[0].price}
                              image={cartItems[0].image}
                              variant="checkout"
                            />
                          ) : (
                            <div>
                              <Accordion
                                type="single"
                                collapsible
                                value={accordion}
                                onValueChange={(value) => setAccordion(value)}
                              >
                                <AccordionItem value={"one"}>
                                  <AccordionTrigger asChild>
                                    <div className="w-full">
                                      <CartItem
                                        id={cartItems[0].id}
                                        name={cartItems[0].name}
                                        quantity={cartItems[0].quantity}
                                        price={cartItems[0].price}
                                        image={cartItems[0].image}
                                        variant="checkout"
                                      />
                                      {accordion !== "one" && (
                                        <div className="w-full">
                                          <div className="text-center hover:cursor-pointer hover:underline pt-[0.75rem] data-[state=open]:hidden border-t border-black border-opacity-[0.08]">
                                            and {cartItems.length - 1} other
                                            items(s)
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    {cartItems.slice(1).map((item) => (
                                      <CartItem
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        price={item.price}
                                        image={item.image}
                                        variant="checkout"
                                      />
                                    ))}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          )}
                        </div>
                        <div className="rounded-b-lg md:rounded-bl-none md:rounded-tr-lg bg-black p-6 flex flex-col gap-y-2 md:basis-1/3 md:justify-center">
                          <p className="text-white text-opacity-50 text-[0.938rem] leading-[1.563rem] uppercase">
                            Grand Total
                          </p>
                          <p className="text-white leading-[normal] text-lg font-bold">
                            ${grandTotal.toFixed(2).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col">
                    <DialogClose asChild>
                      <Link href="/">
                        <Button variant="default" className="w-full">
                          Back To Home
                        </Button>
                      </Link>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
