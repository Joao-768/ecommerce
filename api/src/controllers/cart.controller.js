import { pool } from "../config/database.js";

export async function setCartItem(req, res) {
    let connection;
    const { userId, productId, size } = req.body;

    if (!userId || !productId || !size) {
        return res.status(400).json({ error: "userId, productId e size são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();

        await connection.query(`
            INSERT INTO cart_items
            (user_id, product_id, quantity, size_mm) 
            VALUES (?, ?, ?, ?)
        `, [userId, productId, 1, size] );

        res.status(201).json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

export async function ajustCartItemQuantity(req, res) {
    let connection;
    const { userId, productId } = req.params;
    const { quantity, type, size } = req.body;

    if (!userId || !productId || !quantity || !type) {
        return res.status(400).json({ error: "userId, productId, quantity e type são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();

        const adjustment = type === "increase" ? quantity : -quantity;

        const [rows] = await connection.query(`
            SELECT quantity 
            FROM cart_items 
            WHERE user_id = ? 
            AND product_id = ? 
            AND size_mm = ?
            `, [userId, productId, size]
        );

        const currentQuantity = rows[0]?.quantity ?? 0;

        if (currentQuantity + adjustment < 1) {
            return res.status(400).json({ error: "Quantity cannot be less than 1" });
        }

        await connection.query(`
            UPDATE cart_items 
            SET quantity = quantity + ? 
            WHERE user_id = ? 
            AND product_id = ? 
            AND size_mm = ?`
            , [adjustment, userId, productId, size]
        );

        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

export async function getCartItems(req, res) {
    let connection;
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        connection = await pool.getConnection();

        // Receive all the cart items from a user
        const [rows] = await connection.query(`
            SELECT p.*, ci.*
            FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.user_id = ?
        `, [userId]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function removeCartItem(req, res) {
    try {
        const { userId, productId, size } = req.params;

        await pool.query(
            "DELETE FROM cart_items WHERE user_id = ? AND product_id = ? AND size_mm = ?",
            [userId, productId, size]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove cart item" });
    }
}

export async function isInCart(req, res) {
    let connection;
    const { userId, productId, size } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
        "SELECT 1 FROM cart_items WHERE user_id = ? AND product_id = ? AND size_mm = ? LIMIT 1",
        [userId, productId, size]
        );

        res.json(rows.length > 0);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function clearCart(req, res) {
    try {
        const { userId } = req.params;

        await pool.query(
            "DELETE FROM cart_items WHERE user_id = ?",
            [userId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove cart items" });
    }
}
