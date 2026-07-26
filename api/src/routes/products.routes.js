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
import authenticate, { requireAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    createProductSchema,
    updateProductSchema,
    adjustStockSchema,
    setCodeSchema,
    setProductSizeSchema,
    idParamSchema,
} from "../schemas/products.schema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

function sanitizeSegment(value) {
    return String(value || "").replace(/[^a-zA-Z0-9_-]/g, "");
}

// CRUD
router.post("/", authenticate, requireAdmin, validate(createProductSchema), createProduct);
router.get("/", getProducts);

// Other endpoints
router.get("/codes", getCodes);
router.get("/collections", getTotalProductByCollection);
router.post("/upload", authenticate, requireAdmin, upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Image file is required" });

    const collectionname = sanitizeSegment(req.headers.collectionname);
    const baseName = sanitizeSegment(path.parse(String(req.headers.filename || "")).name);

    if (!collectionname || !baseName) {
        return res.status(400).json({ error: "Invalid collection name or filename" });
    }

    const ext = req.file.mimetype === "image/png" ? ".png"
        : req.file.mimetype === "image/webp" ? ".webp"
        : ".jpg";
    const filename = `${baseName}${ext}`;

    const publicRoot = path.join(__dirname, "../../../public/images");
    const dir = path.join(publicRoot, collectionname);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, filename), req.file.buffer);
    res.json({ path: `/images/${collectionname}/${filename}` });
});

// /:id
router.get("/:id", validate(idParamSchema), getProductById);
router.put("/:id", authenticate, requireAdmin, validate(updateProductSchema), updateProduct);
router.patch("/:id/code", authenticate, requireAdmin, validate(setCodeSchema), setCode);
router.get("/:id/sizes", validate(idParamSchema), getProductSizes);
router.post("/:id/sizes", authenticate, requireAdmin, validate(setProductSizeSchema), setProductSize);
router.patch("/:id/stock", authenticate, requireAdmin, validate(adjustStockSchema), adjustStock);

export { router as productsRoutes };