import { pool } from "../config/database.js";

export async function setWishlistItem(req, res) {
    let connection;
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: "userId and productId are required" });
    }

    try {
        connection = await pool.getConnection();

        await connection.query(
            "INSERT INTO wishlist_items (user_id, product_id) VALUES (?, ?)",
            [userId, productId]
        );

        res.status(201).json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

export async function getWishlistItems(req, res) {
    let connection;
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT p.*
            FROM wishlist_items w
            JOIN products p ON p.id = w.product_id
            WHERE w.user_id = ?`
        ,[userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function isInWishlist(req, res) {
    let connection;
    const { userId, productId } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
        "SELECT 1 FROM wishlist_items WHERE user_id = ? AND product_id = ? LIMIT 1",
        [userId, productId]
        );

        res.json(rows.length > 0);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function removeWishlistItem(req, res) {
    try {
        const { userId, productId } = req.params;

        await pool.query(
            "DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove wishlist item" });
    }
}