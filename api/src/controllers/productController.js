import { pool } from '../config/database.js';

export async function getAllProducts(req, res) {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products');
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
