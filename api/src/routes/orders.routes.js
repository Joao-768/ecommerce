import express from "express";
import { createOrder, getUserOrders, setOrderItems, getUserOrdersItems, getLastOrder, getTotalItems, getAllOrders, getLastFiveOrders, updateOrder, getOrderById, getOrderAddress, updateOrderAddress } from "../controllers/orders.controller.js";

// Routes for Orders
const router = express.Router();

// Create Order
router.post("/", createOrder);

// Set Order Items
router.post("/orderItems", setOrderItems);

// Get All Orders
router.get("/allOrders", getAllOrders);

// Get Last Five Users
router.get("/lastFive", getLastFiveOrders);

// Get Order By Id
router.get("/:id", getOrderById);

// Get Order Address
router.get("/:id/address", getOrderAddress);

// Get Orders
router.get("/:id/orders", getUserOrders);

// Get User Order Items
router.get("/:id/items", getUserOrdersItems);

// Get Last Order
router.get("/:id/lastOrder", getLastOrder);

// Get Total Items
router.get("/:id/totalItems", getTotalItems);

// Update Order
router.put("/:id/update", updateOrder);

// Update Order Address
router.put("/:id/updateAddress", updateOrderAddress);

// Export the router
export { router as ordersRoutes };