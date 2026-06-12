import express from "express";
import {
    createUser,
    loginUser,
    getUserById,
    updateUser,
    getUserRole,
    setNewPassword,
    forgotPassword,
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

const router = express.Router();

// Auth
router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.patch("/lastActivity", setLastActivity);

// Addresses
router.delete("/addresses/:id", deleteAddress);
router.put("/addresses/:id", updateAddress);

// /:id
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.get("/:id/role", getUserRole);
router.put("/:id/password", setNewPassword);
router.post("/:id/addresses", createAddress);
router.get("/:id/addresses", getAddresses);
router.get("/:id/collection", getUserCollection);
router.post("/:id/collection", setCollectionProduct);
router.delete("/:id/collection/:productId", removeCollectionProduct);
router.put("/:id/nif", setNif);
router.post("/:id/nif/verify", verifyNif);
router.get("/:id/payment-method", getPaymentMethod);
router.post("/:id/payment-method", setPaymentMethod);

export { router as userRoutes };