import express from "express";
import { 
    createUser, 
    loginUser, 
    getUserById,
    updateUser, 
    getUserCollection, 
    setNewPassword, 
    forgotPassword, 
    getUserRole, 
    setLastActivity, 
    createAddress, 
    getAddresses,
    setCollectionProduct,
    deleteAddress,
    updateAddress
} from "../controllers/users.controller.js";


// Create a router for user-related routes
const router = express.Router();

// Create a new user
router.post("/", createUser);

// Login user
router.post("/login", loginUser);

// User Info
router.get("/:id", getUserById);

// Update User Info
router.put("/:id/update", updateUser);

// Get User Collection
router.get("/:id/collection", getUserCollection);

// Get User Role
router.get("/:id/role", getUserRole);

// Set New Password
router.put("/:id/password", setNewPassword);

// Set New Password Whitout Email
router.put("/password/forgot", forgotPassword);

// Set Last Activity
router.put("/lastActivity", setLastActivity);

// Set User Adresses
router.post("/:id/addresses", createAddress);

// Get User Adresses
router.get("/:id/addresses", getAddresses);

// Set Product In User Collection
router.post("/:id/setCollectionProduct", setCollectionProduct);

// Delete Adress
router.delete('/addresses/:id', deleteAddress);

// Update Adress
router.put('/addresses/:id/update', updateAddress);

// Export the router
export { router as userRoutes };
