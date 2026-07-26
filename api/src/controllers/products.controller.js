import { pool } from "../config/database.js";

export async function createProduct(req, res, next) {
    let connection;
    const { 
        name, description, price, stock, max_stock,
        category_id, collection_id, gender_id, image,
        movement, case_material, crystal, 
        water_resistance, strap, warranty 
    } = req.body;

    if (!name || !description || price === "" || stock === "" || !category_id || !collection_id || !gender_id) {
        return res.status(400).json({ error: "Name, description, price, stock, category ID, collection ID, and gender ID are required." });
    }

    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(
            `INSERT INTO products
            (name, description, price, stock, max_stock, 
            category_id, collection_id, gender_id, image, 
            movement, case_material, crystal, 
            water_resistance, strap, warranty)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, price, stock, max_stock,
            category_id, collection_id, gender_id, image,
            movement, case_material, crystal,
            water_resistance, strap, warranty]
        );
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getProducts(req, res, next) {
    let connection;
    const { sort, limit, stock, count } = req.query;

    try {
        connection = await pool.getConnection();

        if (count === 'true') {
            const [[total]] = await connection.query(
                "SELECT COUNT(*) AS total FROM products"
            );
            const [[inStock]] = await connection.query(
                "SELECT COUNT(*) AS inStock FROM products WHERE stock != 0"
            );
            const [[outOfStock]] = await connection.query(
                "SELECT COUNT(*) AS outOfStock FROM products WHERE stock = 0"
            );
            const [[lowStock]] = await connection.query(
                "SELECT COUNT(*) AS lowStock FROM products WHERE stock < max_stock / 10"
            );
            return res.json({ 
                total: total.total, 
                inStock: inStock.inStock, 
                outOfStock: outOfStock.outOfStock, 
                lowStock: lowStock.lowStock 
            });
        }

        if (stock === 'low') {
            const [rows] = await connection.query(
                "SELECT * FROM products WHERE stock < max_stock / 10"
            );
            return res.json({ products: rows });
        }

        let query = "SELECT * FROM products";
        const params = [];

        if (sort === 'popular') {
            query += " ORDER BY search_count DESC";
        } else if (sort === 'new') {
            query += " ORDER BY created_at DESC";
        } else if (sort === 'bestsellers') {
            query += " ORDER BY sales DESC";
        }

        if (limit) {
            query += " LIMIT ?";
            params.push(parseInt(limit));
        }

        const [rows] = await connection.query(query, params);
        res.json({ products: rows });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getProductById(req, res, next) {
    let connection;
    const { id } = req.params;
    const lang = req.query.lang || 'en';

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT p.*, pt.description
            FROM Products p
            LEFT JOIN Product_Translations pt ON p.id = pt.product_id AND pt.language_code = ?
            WHERE p.id = ?
        `, [lang, id]);
        res.json(rows[0]);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function updateProduct(req, res, next) {
    let connection;
    const productId = req.params.id;
    const {
        name, description, price, stock, max_stock,
        category_id, collection_id, gender_id, image,
        movement, case_material, crystal,
        water_resistance, strap, warranty
    } = req.body;

    try {
        connection = await pool.getConnection();
        await connection.query(
            `UPDATE products SET
            name = ?, description = ?, price = ?, stock = ?, max_stock = ?,
            category_id = ?, collection_id = ?, gender_id = ?, image = ?,
            movement = ?, case_material = ?, crystal = ?,
            water_resistance = ?, strap = ?, warranty = ?
            WHERE id = ?`,
            [name, description, price, stock, max_stock,
            category_id, collection_id, gender_id, image,
            movement, case_material, crystal,
            water_resistance, strap, warranty, productId]
        );
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setCode(req, res, next) {
    const { id } = req.params;
    const { code } = req.body;
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.query(
            "UPDATE products SET code = ? WHERE id = ?",
            [code, id]
        );
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function adjustStock(req, res, next) {
    let connection;
    const productId = req.params.id;
    const { amount, type } = req.body;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT stock FROM products WHERE id = ?",
            [productId]
        );
        const currentStock = rows[0].stock;
        const newStock = type === 'increase' ? currentStock + amount : currentStock - amount;
        await connection.query(
            "UPDATE products SET stock = ? WHERE id = ?",
            [newStock, productId]
        );
        res.json({ message: "Stock updated successfully" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getCodes(req, res, next) {
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT id, code FROM products");
        res.json(rows);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getTotalProductByCollection(req, res, next) {
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT collection_id, COUNT(*) AS total
            FROM products
            GROUP BY collection_id
        `);
        res.json(rows);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getProductSizes(req, res, next) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT size_mm FROM product_sizes WHERE product_id = ?",
            [id]
        );
        res.json(rows);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setProductSize(req, res, next) {
    let connection;
    const { id } = req.params;
    const { size } = req.body;

    try {
        connection = await pool.getConnection();
        await connection.query(
            "INSERT INTO product_sizes (product_id, size_mm) VALUES (?, ?)",
            [id, size]
        );
        res.status(201).json({ ok: true });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}