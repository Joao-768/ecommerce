import express from "express";
import { 
    setCartItem, 
    getCartItems, 
    removeCartItem, 
    clearCart,
    ajustCartItemQuantity,
    isInCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", setCartItem);
router.get("/:userId", getCartItems);
router.get("/:userId/:productId/:size", isInCart);
router.put("/:userId/:productId", ajustCartItemQuantity);
router.delete("/:userId/:productId/:size", removeCartItem);
router.delete("/:userId", clearCart);

export { router as cartRoutes };
