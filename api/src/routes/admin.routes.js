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
import authenticate, { requireAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { adminTaskSchema, updateAdminTaskSchema, idParamSchema } from "../schemas/admin.schema.js";

const router = express.Router();

router.use(authenticate, requireAdmin);

// Users
router.get("/users", getTotalUsers);
router.get("/users/:id/isActive", validate(idParamSchema), isUserActive);
router.patch("/users/:id/block", validate(idParamSchema), blockUser);
router.delete("/users/:id", validate(idParamSchema), deleteUser);

// Products
router.delete("/products/:id", validate(idParamSchema), deleteProduct);

// Tasks
router.get("/tasks", getAdminTasks);
router.post("/tasks", validate(adminTaskSchema), createAdminTask);
router.get("/tasks/:id", validate(idParamSchema), getAdminTaskById);
router.put("/tasks/:id", validate(updateAdminTaskSchema), updateAdminTask);

export { router as adminRoutes };
