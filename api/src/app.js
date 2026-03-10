import express from "express";
import cors from "cors";

import { categoriesRoutes } from "./routes/categories.routes.js";
import { collectionsRoutes } from "./routes/collections.routes.js";
import { productRoutes } from "./routes/products.routes.js";
import { pool } from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/api/test-db', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const [dbRow] = await connection.query('SELECT DATABASE() AS database_name');
    const [tables] = await connection.query('SHOW TABLES');

    res.json({
      ok: true,
      database: dbRow?.[0]?.database_name || null,
      tablesCount: tables.length,
      sample: tables.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  } finally {
    if (connection) connection.release();
  }
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/collections", collectionsRoutes);

export default app;
