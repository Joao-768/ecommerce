import express from "express";
import { getProductsByGender,getGenderById, getGenders } from "../controllers/gender.controller.js";

// Routes for genders
const router = express.Router();

// Get all genders
router.get("/", getGenders);

// Get Products
router.get("/:genderId/products", getProductsByGender);

// Get Genders By ID
router.get("/:id", getGenderById);

// Export the router
export { router as gendersRoutes };
