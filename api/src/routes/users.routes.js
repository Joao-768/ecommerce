import express from "express";
import { createUser, getAllUsers, getUserById, resendVerification, verifyEmail } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/resend-verification", resendVerification);
router.get("/verify-email", verifyEmail);
router.get("/:id", getUserById);

export { router as userRoutes };
