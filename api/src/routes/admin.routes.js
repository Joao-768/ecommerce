import express from "express";

import {
    getTotalUsers,
    getAdminTasks,
    getAdminTaskById,
    createAdminTask,
    updateAdminTask,
    deleteProduct,
    blockUser,
    isUserActive,
    deleteUser
} from "../controllers/admin.controller.js";

const router = express.Router();

// Users
router.get("/users", getTotalUsers);
router.get("/users/:id/isActive", isUserActive);
router.patch("/users/:id/block", blockUser);
router.delete("/users/:id", deleteUser);

// Products
router.delete("/products/:id", deleteProduct);

// Tasks
router.get("/tasks", getAdminTasks);
router.post("/tasks", createAdminTask);
router.get("/tasks/:id", getAdminTaskById);
router.put("/tasks/:id", updateAdminTask);

export { router as adminRoutes };
