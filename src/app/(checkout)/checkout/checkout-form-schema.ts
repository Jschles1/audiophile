import * as z from "zod";

const baseSchema = z.object({
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
});

const emoneySchema = baseSchema.extend({
  paymentMethod: z.literal("emoney"),
  emoneyNumber: z.string().min(1, { message: "Required for e-money payment" }),
  pin: z.string().min(1, { message: "Required for e-money payment" }),
});

const cashSchema = baseSchema.extend({
  paymentMethod: z.literal("cash"),
  emoneyNumber: z.string().optional(),
  pin: z.string().optional(),
});

const formSchema = z.union([emoneySchema, cashSchema]);

export default formSchema;
