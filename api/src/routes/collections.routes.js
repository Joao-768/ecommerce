import express from "express";
import { createCollection, deleteCollection, getCollections, getCollectionsById, getProductsByCollection, updateCollection } from "../controllers/collection.controller.js";

// Routes for collections
const router = express.Router();

// Create New Collection
router.post("/", createCollection);

// Get All Collections
router.get("/", getCollections);

// Get Collection By Id
router.get("/:id", getCollectionsById);

// Get Products By Collection
router.get("/:collectionId/products", getProductsByCollection);

// Delete Collection
router.delete('/:id', deleteCollection);

// Update Collection Info
router.put("/:id/update", updateCollection);

// Export the router
export { router as collectionsRoutes };