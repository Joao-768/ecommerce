import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../src/config/database.js";

export async function createTestUser({ role = "user", nif = null } = {}) {
    const email = `test-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
    const password = "TestPass123!";
    const hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        `INSERT INTO users (name, surname, email, password_hash, role, email_verified, nif)
         VALUES (?, ?, ?, ?, ?, 1, ?)`,
        ["Test", "User", email, hash, role, nif]
    );

    const id = result.insertId;
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { id, email, password, role, token };
}

export async function deleteTestUser(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
}

export async function getSampleProduct() {
    const [rows] = await pool.query(
        "SELECT id, name, price, stock FROM products WHERE stock > 0 LIMIT 1"
    );
    return rows[0];
}

export async function resetProductStock(productId, stock) {
    await pool.query("UPDATE products SET stock = ? WHERE id = ?", [stock, productId]);
}

export async function deleteOrder(orderId) {
    await pool.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);
    await pool.query("DELETE FROM order_addresses WHERE order_id = ?", [orderId]);
    await pool.query("DELETE FROM order_status_history WHERE order_id = ?", [orderId]);
    await pool.query("DELETE FROM orders WHERE id = ?", [orderId]);
}

export function authHeader(token) {
    return { Authorization: `Bearer ${token}` };
}
