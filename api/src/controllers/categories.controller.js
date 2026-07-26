import { pool } from "../config/database.js";

export async function getCategories(req, res, next) {
    let connection;

    try {
        connection = await pool.getConnection();
        
        // Get the categories
        const [rows] = await connection.query(
            "SELECT * FROM categories"
        );

        // Return the categories
        res.json(rows);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getProductsByCategory(req, res, next) {
    let connection;
    const { categoryId } = req.params;

    try {
        connection = await pool.getConnection();

        // Get products by category id
        const [rows] = await connection.query(
            "SELECT p.* FROM products p WHERE p.category_id = ?",
            [categoryId]
        );

        // Return the products
        res.json(rows);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

// Get Total Categories
export async function getTotalCategories(req, res, next) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalCategories FROM categories"
        );

        const totalCategories = rows[0].totalCategories;
        res.json({ totalCategories });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}
