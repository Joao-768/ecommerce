import { pool } from "../config/database.js";

export async function searchProducts(req, res) {
    let connection;
    const { search } = req.query;

    // If no query is provided, return an empty array
    if (!search) return res.json([]);

    try {
        connection = await pool.getConnection();

        // Search for products matching the query
        const [rows] = await connection.query(
            `SELECT * FROM products WHERE products.name LIKE ?`,
            [`%${search}%`]
        );

        // Return the search results
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}
