import { z } from "zod";

export const adminTaskSchema = z.object({
    body: z.object({
        task: z.string().trim().min(1).max(255),
        description: z.string().trim().min(1),
        status: z.enum(["pending", "in_progress", "done", "cancelled"]),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const updateAdminTaskSchema = z.object({
    body: z.object({
        task: z.string().trim().min(1).max(255),
        description: z.string().trim().min(1),
        status: z.enum(["pending", "in_progress", "done", "cancelled"]),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const idParamSchema = z.object({
    body: z.object({}).optional(),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});
