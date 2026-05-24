import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  branch: z.string(),
  service: z.string().optional(),
  preferredDate: z.string().optional(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  nameAr: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.number(),
  category: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  inStock: z.boolean(),
});

export type Booking = z.infer<typeof BookingSchema>;
export type Product = z.infer<typeof ProductSchema>;
