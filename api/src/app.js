import express from "express";
import cors from "cors";

// Import route modules
import { categoriesRoutes } from "./routes/categories.routes.js";
import { collectionsRoutes } from "./routes/collections.routes.js";
import { gendersRoutes } from "./routes/genders.routes.js";
import { productsRoutes } from "./routes/products.routes.js";
import { userRoutes } from "./routes/users.routes.js";
import { searchRoutes } from "./routes/search.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { ordersRoutes } from "./routes/orders.routes.js";
import { preferencesRoutes } from "./routes/preferences.routes.js";
import { wishlistRoutes } from "./routes/wishlist.routes.js";
import { cartRoutes } from "./routes/cart.routes.js";

// Create the Express app instance
const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

// Register routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/genders", gendersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);

export default app;
