import express from "express";
import { 
    getPreferences, 
    setUserPreference, 
    getUserPreferences, 
    removeUserPreference, 
    getProductsByPreferences,
} from "../controllers/preferences.controller.js";
import authenticate, { requireSelfOrAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPreferences);
router.use(authenticate);
router.get("/user/:userId", requireSelfOrAdmin("userId"), getUserPreferences);
router.get("/user/:userId/products", requireSelfOrAdmin("userId"), getProductsByPreferences);
router.post("/user/:userId/preferences/:preferenceId", requireSelfOrAdmin("userId"), setUserPreference);
router.delete("/user/:userId/preferences/:preferenceId", requireSelfOrAdmin("userId"), removeUserPreference);

export { router as preferencesRoutes };