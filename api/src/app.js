import express from "express";
import cors from "cors";

import { categoriesRoutes } from "./routes/categories.routes.js";
import { collectionsRoutes } from "./routes/collections.routes.js";
import { gendersRoutes } from "./routes/gender.routes.js";
import { productRoutes } from "./routes/products.routes.js";
import { userRoutes } from "./routes/users.routes.js";
import { searchRoutes } from "./routes/search.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { ordersRoutes } from "./routes/orders.routes.js";
import { preferencesRoutes } from "./routes/preferences.routes.js";

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
app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/genders", gendersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/preferences", preferencesRoutes);

export default app;
