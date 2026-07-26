import { z } from "zod";

export const setWishlistItemSchema = z.object({
    body: z.object({
        userId: z.coerce.number().int().positive(),
        productId: z.coerce.number().int().positive(),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});
