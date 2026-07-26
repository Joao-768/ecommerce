import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1).max(255),
        description: z.string().trim().min(1),
        price: z.coerce.number().positive(),
        stock: z.coerce.number().int().nonnegative(),
        max_stock: z.coerce.number().int().nonnegative().optional(),
        category_id: z.coerce.number().int().positive(),
        collection_id: z.coerce.number().int().positive(),
        gender_id: z.coerce.number().int().positive(),
        image: z.string().optional(),
        movement: z.string().optional(),
        case_material: z.string().optional(),
        crystal: z.string().optional(),
        water_resistance: z.string().optional(),
        strap: z.string().optional(),
        warranty: z.string().optional(),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1).max(255),
        description: z.string().trim().min(1),
        price: z.coerce.number().positive(),
        stock: z.coerce.number().int().nonnegative(),
        max_stock: z.coerce.number().int().nonnegative().optional(),
        category_id: z.coerce.number().int().positive(),
        collection_id: z.coerce.number().int().positive(),
        gender_id: z.coerce.number().int().positive(),
        image: z.string().optional(),
        movement: z.string().optional(),
        case_material: z.string().optional(),
        crystal: z.string().optional(),
        water_resistance: z.string().optional(),
        strap: z.string().optional(),
        warranty: z.string().optional(),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const adjustStockSchema = z.object({
    body: z.object({
        amount: z.coerce.number().int().positive(),
        type: z.enum(["increase", "decrease"]),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const setCodeSchema = z.object({
    body: z.object({
        code: z.string().trim().min(1).max(50),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const setProductSizeSchema = z.object({
    body: z.object({
        size: z.union([z.string(), z.number()]),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const idParamSchema = z.object({
    body: z.object({}).optional(),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});
