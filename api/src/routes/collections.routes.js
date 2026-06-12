import express from "express";
import {
    createCollection,
    getCollections,
    getCollectionsById,
    getProductsByCollection,
    updateCollection,
    deleteCollection,
} from "../controllers/collections.controller.js";

const router = express.Router();

// CRUD
router.post("/", createCollection);
router.get("/", getCollections);
router.get("/:id", getCollectionsById);
router.get("/:collectionId/products", getProductsByCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);

export { router as collectionsRoutes };
