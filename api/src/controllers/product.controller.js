import { pool } from "../config/database.js";

export async function getAllProducts(req, res) {
  let connection;

  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) connection.release();
  }
}

export async function getProductById(req, res) {
  let connection;
  const { id } = req.params;

  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);

    if (!rows.length) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) connection.release();
  }
}
