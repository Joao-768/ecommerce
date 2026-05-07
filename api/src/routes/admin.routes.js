import express from "express";
import { 
    getTotalUsers, 
    getTotalAdmins,
    getNewUsers, 
    getTotalProducts, 
    getInStock,
    getOutOfStock, 
    getTotalCategories, 
    getTotalCollections, 
    getUsersByMonth, 
    getTotalOrders, 
    getLastFiveUsers,
    getLastActiveUsers,
    getAllUsers,
    getBlockedUsers,
    deleteUser,
    getAllProducts,
    deleteProduct,
    blockUser,
    isUserActive,
    getAdminTasks,
    createAdminTask,
    updateAdminTask,
    getAdminTaskById
} from "../controllers/admin.controller.js";

// Routes for admin
const router = express.Router();

// Total Users
router.get("/totalUsers", getTotalUsers);

// Total Admins
router.get("/totalAdmins", getTotalAdmins);

// Total Users
router.get("/newUsers", getNewUsers);

// Total Products
router.get("/totalProducts", getTotalProducts);

// In Stock Products
router.get("/inStock", getInStock);

// Out Of Stock Products
router.get("/outOfStock", getOutOfStock);

// Total Categories
router.get("/totalCategories", getTotalCategories);

// Total Collections
router.get("/totalCollections", getTotalCollections);

// Users by Month
router.get("/usersByMonth", getUsersByMonth);

// Total Orders
router.get("/totalOrders", getTotalOrders);

// Get Last 5 Users
router.get("/lastFiveUsers", getLastFiveUsers);

// Get Last Active Users
router.get("/lastActiveUsers", getLastActiveUsers);

// Get All Users
router.get("/allUsers", getAllUsers);

// Get Blocked Users
router.get("/blockedUsers", getBlockedUsers);

// Delete User
router.delete('/users/:id', deleteUser);

// Get All Products
router.get("/allProducts", getAllProducts);

// Delete Product
router.delete('/products/:id', deleteProduct);

// Block User
router.post("/users/:id/block", blockUser);

// Is This User Active
router.get("/users/:id/isActive", isUserActive);

// Get Admin Tasks
router.get("/tasks", getAdminTasks);

// Set Admin Task 
router.post("/createTask", createAdminTask);

// Get Tasks By Id
router.get("/:id/task", getAdminTaskById);

// Update Admin Task 
router.put("/:id/updateTask", updateAdminTask);


// Export the router
export { router as adminRoutes };
