import express from "express";
import { getCategories, getProductsByCategory } from "../controllers/categories.controller.js";

// Routes for categories
const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Get products by category ID
router.get("/:categoryId/products", getProductsByCategory);

// Export the router
export { router as categoriesRoutes };