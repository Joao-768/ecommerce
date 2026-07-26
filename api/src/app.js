import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim()).filter(Boolean);
const localhostOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;

// Global middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
    origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (!isProduction && localhostOriginPattern.test(origin)) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error("Not allowed by CORS"));
    },
}));
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts, please try again later." },
});

app.use("/api", apiLimiter);
app.use(["/api/users/login", "/api/users/password/forgot", "/api/users/password/reset", "/api/users/verify-email"], authLimiter);

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

// 404 for unmatched API routes
app.use("/api", (req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Central error handler
app.use((err, req, res, next) => {
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({ error: "Not allowed by CORS" });
    }

    console.error(err);
    res.status(err.status || 500).json({ error: "Internal server error" });
});

export default app;
