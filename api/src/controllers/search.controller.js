import { pool } from "../config/database.js";

export async function searchProducts(req, res) {
    let connection;
    const { q } = req.query;

    if (!q) return res.json([]);

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM products WHERE products.name LIKE ?",
            [`%${q}%`]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function incrementSearchCount(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();
        await connection.query(
            "UPDATE products SET search_count = COALESCE(search_count, 0) + 1 WHERE id = ?",
            [id]
        );
        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}