import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    getTotalProductByCollection,
    getCodes,
    adjustStock,
    setCode,
    getProductSizes,
    setProductSize
} from "../controllers/products.controller.js";
import fs from "fs";
import { upload } from "../utils/upload.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// CRUD
router.post("/", createProduct);
router.get("/", getProducts);

// Other endpoints
router.get("/codes", getCodes);
router.get("/collections", getTotalProductByCollection);

// /:id
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.patch("/:id/code", setCode);
router.get("/:id/sizes", getProductSizes);
router.post("/:id/sizes", setProductSize);
router.patch("/:id/stock", adjustStock);
router.post("/:id/image", upload.single("image"), (req, res) => {
    const { collectionname, filename } = req.headers;
    const dir = path.join(__dirname, "../../../public/images", collectionname);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, filename), req.file.buffer);
    res.json({ path: `/images/${collectionname}/${filename}` });
});

export { router as productsRoutes };