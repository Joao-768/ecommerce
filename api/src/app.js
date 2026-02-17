import express from "express";
import cors from "cors";

import { productRoutes } from "./routes/products.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use("/api/products", productRoutes);

export default app;
