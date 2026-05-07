import express from "express";
import { 
    getProducts,
    getProductById, 
    incrementSearchCount, 
    setWishslistItem, 
    getWishlistItems, 
    setCartItem, 
    getCartItems, 
    isInCart, 
    getPopularProducts, 
    createProduct, 
    getTotalProductByCollection, 
    getNewProducts, 
    removeCartItem, 
    clearCart,
    updateProduct,
    getCodes,
    decreaseStock,
    increaseStock,
    getLowStock,
    getProductsByPreference,
    getLastFiveProducts,
    getBestSellers
} from "../controllers/product.controller.js";

// Routes for products
const router = express.Router();

// Create New Product
router.post("/", createProduct);

// Get All Products
router.get("/products", getProducts);

// Add item to wishlist
router.post("/wishlist", setWishslistItem);

// Get wishlist items for a user
router.get("/wishlist/:userId", getWishlistItems);

// Add item to cart
router.post("/cart", setCartItem);

// Get Last Five Products
router.get("/lastFive", getLastFiveProducts);

// Get cart items for a user
router.get("/cart/:userId", getCartItems);

// Increment search count for a product
router.post("/:id/search", incrementSearchCount);

// Verify if the product is in the user cart
router.get("/cart/:userId/:productId", isInCart);

// Get Popular Products
router.get("/popularProducts", getPopularProducts);

// Get Total Products By Collection
router.get("/collections", getTotalProductByCollection);

// New Products
router.get("/new", getNewProducts);

// Remove Cart Item
router.delete("/cart/:userId/:productId", removeCartItem);

// Remove Cart Item
router.delete("/cart/:userId", clearCart);

// Get Product Codes
router.get("/codes", getCodes);

// Get Low Stock
router.get("/lowStock", getLowStock);

// Get Best Sellers Products
router.get("/:quantity/bestSellers", getBestSellers);

// Get Products By Preference
router.get("/:preferenceId/products", getProductsByPreference);

// Get product by ID
router.get("/:id", getProductById);

// Update Product Info
router.put("/:id/update", updateProduct);

// Increase Product Stock
router.put("/:id/increase", increaseStock);

// Decrease Product Stock
router.put("/:id/decrease", decreaseStock);

// Export the router
export { router as productRoutes };
