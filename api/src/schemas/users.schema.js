import { z } from "zod";

const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/\d/, "Password must contain a number")
    .regex(/[!@#$%^&*_-]/, "Password must contain a special character");

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1).max(255),
        surname: z.string().trim().min(1).max(255),
        email: z.string().trim().toLowerCase().email(),
        password: passwordSchema,
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const createUserAsAdminSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1).max(255),
        surname: z.string().trim().min(1).max(255),
        email: z.string().trim().toLowerCase().email(),
        password: passwordSchema,
        role: z.enum(["user", "admin"]).optional(),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
        password: z.string().min(1),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const verifyEmailSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
        code: z.string().length(6),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const resendVerificationSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const resetPasswordSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email(),
        code: z.string().length(6),
        newPassword: passwordSchema,
    }),
    params: z.object({}).optional(),
    query: z.object({}).optional(),
});

export const setNewPasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(1),
        newPassword: passwordSchema,
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const setNifSchema = z.object({
    body: z.object({
        nif: z.string().regex(/^\d{9}$/, "NIF must be 9 digits"),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const setPaymentMethodSchema = z.object({
    body: z.object({
        card_number: z.string().min(4).max(19),
        expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry must be MM/YY"),
    }),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});

export const idParamSchema = z.object({
    body: z.object({}).optional(),
    params: z.object({ id: z.coerce.number().int().positive() }),
    query: z.object({}).optional(),
});
