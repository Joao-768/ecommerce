import express from "express";
import { 
    getProductsByGender,
    getGenderById, 
    getGenders 
} from "../controllers/genders.controller.js";

const router = express.Router();

// CRUD
router.get("/", getGenders);
router.get("/:genderId/products", getProductsByGender);
router.get("/:id", getGenderById);

export { router as gendersRoutes };
