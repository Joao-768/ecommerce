import express from "express";
import { 
    setWishlistItem, 
    getWishlistItems, 
    isInWishlist, 
    removeWishlistItem 
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/", setWishlistItem);
router.get("/:userId", getWishlistItems);
router.get("/:userId/:productId", isInWishlist);
router.delete("/:userId/:productId", removeWishlistItem);

export { router as wishlistRoutes };
