import express from "express";
import {
    createUser,
    createUserAsAdmin,
    verifyEmail,
    resendVerificationEmail,
    loginUser,
    getCurrentUser,
    getUserById,
    updateUser,
    getUserRole,
    setNewPassword,
    forgotPassword,
    resetPassword,
    setLastActivity,
    getUserCollection,
    setCollectionProduct,
    createAddress,
    getAddresses,
    deleteAddress,
    updateAddress,
    getAllUsers,
    removeCollectionProduct,
    setNif,
    verifyNif,
    getPaymentMethod,
    setPaymentMethod
} from "../controllers/users.controller.js";
import authenticate, { requireAdmin, requireSelfOrAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    createUserSchema,
    createUserAsAdminSchema,
    loginSchema,
    verifyEmailSchema,
    resendVerificationSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    setNewPasswordSchema,
    setNifSchema,
    setPaymentMethodSchema,
    idParamSchema,
} from "../schemas/users.schema.js";

const router = express.Router();

// Auth
router.post("/", validate(createUserSchema), createUser);
router.post("/admin-create", authenticate, requireAdmin, validate(createUserAsAdminSchema), createUserAsAdmin);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post("/verify-email/resend", validate(resendVerificationSchema), resendVerificationEmail);
router.get("/", authenticate, requireAdmin, getAllUsers);
router.post("/login", validate(loginSchema), loginUser);
router.post("/password/forgot", validate(forgotPasswordSchema), forgotPassword);
router.post("/password/reset", validate(resetPasswordSchema), resetPassword);
router.patch("/lastActivity", authenticate, setLastActivity);

// Addresses
router.delete("/addresses/:id", authenticate, deleteAddress);
router.put("/addresses/:id", authenticate, updateAddress);

// /:id
router.get("/me", authenticate, getCurrentUser);
router.get("/:id", authenticate, requireAdmin, validate(idParamSchema), getUserById);
router.put("/:id", authenticate, requireSelfOrAdmin(), updateUser);
router.get("/:id/role", authenticate, requireSelfOrAdmin(), validate(idParamSchema), getUserRole);
router.put("/:id/password", authenticate, requireSelfOrAdmin(), validate(setNewPasswordSchema), setNewPassword);
router.post("/:id/addresses", authenticate, requireSelfOrAdmin(), createAddress);
router.get("/:id/addresses", authenticate, requireSelfOrAdmin(), getAddresses);
router.get("/:id/collection", authenticate, requireSelfOrAdmin(), getUserCollection);
router.post("/:id/collection", authenticate, requireSelfOrAdmin(), setCollectionProduct);
router.delete("/:id/collection/:productId", authenticate, requireSelfOrAdmin(), removeCollectionProduct);
router.put("/:id/nif", authenticate, requireSelfOrAdmin(), validate(setNifSchema), setNif);
router.post("/:id/nif/verify", authenticate, requireSelfOrAdmin(), verifyNif);
router.get("/:id/payment-method", authenticate, requireSelfOrAdmin(), validate(idParamSchema), getPaymentMethod);
router.post("/:id/payment-method", authenticate, requireSelfOrAdmin(), validate(setPaymentMethodSchema), setPaymentMethod);

export { router as userRoutes };