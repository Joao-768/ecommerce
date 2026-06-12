import express from 'express';
import { 
    searchProducts, 
    incrementSearchCount 
} from '../controllers/search.controller.js';

const router = express.Router();

router.get('/', searchProducts);
router.patch('/:id/count', incrementSearchCount);

export { router as searchRoutes };
