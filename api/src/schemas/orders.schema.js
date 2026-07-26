import { z } from "zod";

const addressSchema = z.object({
    street: z.string().trim().min(1).max(255),
    city: z.string().trim().min(1).max(255),
    postal_code: z.string().trim().min(4).max(50),
    district: z.string().trim().min(1).max(255),
    country: z.string().trim().min(1).max(255),
});

const cartItemSchema = z.object({
    id: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().positive().optional(),
    size_mm: z.union([z.string(), z.number()]).optional(),
});

export const checkoutSchema = z.object({
    body: z.object({
        userId: z.coerce.number().int().positive(),
        nif: z.string().regex(/^\d{9}$/).optional().or(z.literal("")),
        address: addressSchema,
        cartItems: z.array(cartItemSchema).min(1),
        card: z.object({
            cardNumber: z.string().min(13).max(19),
            expiry: z.string().regex(/^\d{2}\/\d{2}$/),
        }).optional(),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const updateOrderSchema = z.object({
    body: z.object({
        total_price: z.coerce.number().positive(),
        status: z.enum(["paid", "processing", "shipped", "delivered", "cancelled"]),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const updateOrderAddressSchema = z.object({
    body: addressSchema,
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const idParamSchema = z.object({
    body: z.object({}).optional(),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});
