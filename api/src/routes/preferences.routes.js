import express from "express";
import { 
    getPreferences, 
    setUserPreference, 
    getUserPreferences, 
    removeUserPreference, 
    getProductsByPreferences,
} from "../controllers/preferences.controller.js";

const router = express.Router();

router.get("/", getPreferences);
router.get("/user/:userId", getUserPreferences);
router.get("/user/:userId/products", getProductsByPreferences);
router.post("/user/:userId/preferences/:preferenceId", setUserPreference);
router.delete("/user/:userId/preferences/:preferenceId", removeUserPreference);

export { router as preferencesRoutes };