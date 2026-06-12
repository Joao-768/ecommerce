import express from "express";
import {
    getCategories,
    getProductsByCategory,
    getTotalCategories,
} from "../controllers/categories.controller.js";

const router = express.Router();

// CRUD
router.get("/", getCategories);
router.get("/total", getTotalCategories);
router.get("/:categoryId/products", getProductsByCategory);

export { router as categoriesRoutes };
