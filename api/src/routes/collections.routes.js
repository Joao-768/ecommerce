import express from "express";
import { getCollections, getCollectionsById, getProductsByCollection } from "../controllers/collection.controller.js";

const router = express.Router();

router.get("/", getCollections);
router.get("/:id", getCollectionsById);
router.get("/:collectionId/products", getProductsByCollection);

export { router as collectionsRoutes };
