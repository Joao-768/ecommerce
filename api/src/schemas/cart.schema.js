import { z } from "zod";

export const setCartItemSchema = z.object({
    body: z.object({
        userId: z.coerce.number().int().positive(),
        productId: z.coerce.number().int().positive(),
        size: z.union([z.string(), z.number()]),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const adjustCartItemQuantitySchema = z.object({
    body: z.object({
        quantity: z.coerce.number().int().positive(),
        type: z.enum(["increase", "decrease"]),
        size: z.union([z.string(), z.number()]).optional(),
    }),
    params: z.object({
        userId: z.coerce.number().int().positive(),
        productId: z.coerce.number().int().positive(),
    }),
    query: z.object({}).optional(),
});
