import express from "express";
import {
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

const router = express.Router();

// Create
router.post("/", createOrder);
router.post("/:id/items", setOrderItems);
router.post("/:id/address", createOrderAddress);

// Stats
router.get("/", getAllOrders);

// By User ID
router.get("/user/:userId", getUserOrders);

// By Order ID
router.get("/:id", getOrderById);
router.get("/:id/address", getOrderAddress);
router.get("/:id/items", getUserOrdersItems);
router.get("/:id/items/total", getTotalItems);
router.put("/:id", updateOrder);
router.put("/:id/address", updateOrderAddress);

export { router as ordersRoutes };

