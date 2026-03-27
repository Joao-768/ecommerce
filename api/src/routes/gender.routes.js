import express from "express";
import { getGenders, getProductsByGender } from "../controllers/gender.controller.js";

const router = express.Router();

router.get("/", getGenders);
router.get("/:genderId/products", getProductsByGender);

export { router as gendersRoutes };
