import express from "express";
import { 
    setCartItem, 
    getCartItems, 
    removeCartItem, 
    clearCart,
    ajustCartItemQuantity,
    isInCart
} from "../controllers/cart.controller.js";
import authenticate, { requireSelfOrAdmin, requireSelfOrAdminInBody } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { setCartItemSchema, adjustCartItemQuantitySchema } from "../schemas/cart.schema.js";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(setCartItemSchema), requireSelfOrAdminInBody(), setCartItem);
router.get("/:userId", requireSelfOrAdmin("userId"), getCartItems);
router.get("/:userId/:productId/:size", requireSelfOrAdmin("userId"), isInCart);
router.put("/:userId/:productId", requireSelfOrAdmin("userId"), validate(adjustCartItemQuantitySchema), ajustCartItemQuantity);
router.delete("/:userId/:productId/:size", requireSelfOrAdmin("userId"), removeCartItem);
router.delete("/:userId", requireSelfOrAdmin("userId"), clearCart);

export { router as cartRoutes };
