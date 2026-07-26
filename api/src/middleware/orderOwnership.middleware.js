import { pool } from "../config/database.js";

export async function requireOrderOwnerOrAdmin(req, res, next) {
    if (req.user?.role === "admin") return next();

    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT user_id FROM orders WHERE id = ?",
            [req.params.id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (String(rows[0].user_id) !== String(req.user?.id)) {
            return res.status(403).json({ error: "You can only access your own orders" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}
