import { pool } from "../config/database.js";

export async function getCategories(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT id, name FROM categories"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCategoriesById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}
