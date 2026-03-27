import express from "express";
import { getCategories, getProductsByCategory } from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:categoryId/products", getProductsByCategory);

export { router as categoriesRoutes };
