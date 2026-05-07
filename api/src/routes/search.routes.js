import express from 'express';
import { searchProducts } from '../controllers/search.controller.js';

// Routes for search
const router = express.Router();

// Search products
router.get('/products', searchProducts);

// Export the router
export { router as searchRoutes };