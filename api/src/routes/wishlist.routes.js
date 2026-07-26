import express from "express";
import { 
    setWishlistItem, 
    getWishlistItems, 
    isInWishlist, 
    removeWishlistItem 
} from "../controllers/wishlist.controller.js";
import authenticate, { requireSelfOrAdmin, requireSelfOrAdminInBody } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { setWishlistItemSchema } from "../schemas/wishlist.schema.js";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(setWishlistItemSchema), requireSelfOrAdminInBody(), setWishlistItem);
router.get("/:userId", requireSelfOrAdmin("userId"), getWishlistItems);
router.get("/:userId/:productId", requireSelfOrAdmin("userId"), isInWishlist);
router.delete("/:userId/:productId", requireSelfOrAdmin("userId"), removeWishlistItem);

export { router as wishlistRoutes };
