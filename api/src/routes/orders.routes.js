import express from "express";
import {
    checkout,
    createOrder,
    setOrderItems,
    getAllOrders,
    getOrderById,
    getOrderAddress,
    getUserOrders,
    getUserOrdersItems,
    getTotalItems,
    updateOrder,
    updateOrderAddress,
    createOrderAddress
} from "../controllers/orders.controller.js";
import authenticate, { requireAdmin, requireSelfOrAdmin, requireSelfOrAdminInBody } from "../middleware/auth.middleware.js";
import { requireOrderOwnerOrAdmin } from "../middleware/orderOwnership.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { checkoutSchema, updateOrderSchema, updateOrderAddressSchema, idParamSchema } from "../schemas/orders.schema.js";

const router = express.Router();

router.use(authenticate);

// Create
router.post("/checkout", validate(checkoutSchema), requireSelfOrAdminInBody(), checkout);
router.post("/", createOrder);
router.post("/:id/items", setOrderItems);
router.post("/:id/address", createOrderAddress);

// Stats
router.get("/", requireAdmin, getAllOrders);

// By User ID
router.get("/user/:userId", requireSelfOrAdmin("userId"), getUserOrders);

// By Order ID
router.get("/:id", validate(idParamSchema), requireOrderOwnerOrAdmin, getOrderById);
router.get("/:id/address", validate(idParamSchema), requireOrderOwnerOrAdmin, getOrderAddress);
router.get("/:id/items", validate(idParamSchema), requireOrderOwnerOrAdmin, getUserOrdersItems);
router.get("/:id/items/total", validate(idParamSchema), requireOrderOwnerOrAdmin, getTotalItems);
router.put("/:id", requireAdmin, validate(updateOrderSchema), updateOrder);
router.put("/:id/address", requireAdmin, validate(updateOrderAddressSchema), updateOrderAddress);

export { router as ordersRoutes };

