import express from "express";
import { getPreferences, setUserPreference, getUserPreferences, removeUserPreference } from "../controllers/preferences.controller.js";

// Routes For Preferences
const router = express.Router();

// Get All Preferences
router.get("/", getPreferences);

// Get User Preferences
router.get("/user/:userId", getUserPreferences);

// Set User Preference
router.post("/user/:userId/:preferenceId", setUserPreference);

// Remove User Preference
router.delete("/user/:userId/:preferenceId", removeUserPreference);

// Export the router
export { router as preferencesRoutes };