import { pool } from "../config/database.js";
import { generateImage } from "../utils/productsUtils.js";

export async function createProduct(req, res) {
    let connection;
    const { name, description, price, stock, category_id, collection_id, gender_id } = req.body;

    if ( !name || !description || price === "" || stock === "" || !category_id || !collection_id || !gender_id) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();

        const [collectionRows] = await connection.query(
            "SELECT name FROM collections WHERE id = ?",
            [collection_id]
        );

        const collectionName = collectionRows[0].name;
        const image = generateImage(collectionName, name);

        // Insert the new user into the database
        const [result] = await connection.query(
            `INSERT INTO products 
            (name, description, price, stock, category_id, collection_id, gender_id, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, description, price, stock, category_id, collection_id, gender_id, image]
);

        // Return the created user info
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if(connection) connection.release();
    }
}

// Get All Products
export async function getProducts(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM products"
        );

        res.json({ products: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getProductById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        // Get the product by ID
        const [rows] = await connection.query(
            "SELECT * FROM products WHERE id = ?", 
        [id]
        );

        // Return the product
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

export async function incrementSearchCount(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        // Increase the search count for this product
        await connection.query(
            "UPDATE products SET search_count = COALESCE(search_count, 0) + 1 WHERE id = ?",
            [id]
        );

        // Return success
        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

export async function setWishslistItem(req, res) {
    let connection;
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: "userId e productId são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();

        // Insert the user and the product into the wishlist database
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
        return res.status(400).json({ error: "userId é obrigatório" });
    }

    try {
        connection = await pool.getConnection();

        // Receive all the wishlist items from a user
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

export async function setCartItem(req, res) {
    let connection;
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: "userId e productId são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();

        // Insert the user and the product into the cart database
        await connection.query(
        "INSERT INTO cart_items (user_id, product_id) VALUES (?, ?)",
        [userId, productId]
        );

        res.status(201).json({ ok: true });
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
        return res.status(400).json({ error: "userId é obrigatório" });
    }

    try {
        connection = await pool.getConnection();

        // Receive all the cart items from a user
        const [rows] = await connection.query(`
            SELECT p.*
            FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.user_id = ?`
        ,[userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function isInCart(req, res) {
    let connection;
    const { userId, productId } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
        "SELECT 1 FROM cart_items WHERE user_id = ? AND product_id = ? LIMIT 1",
        [userId, productId]
        );

        res.json(rows.length > 0);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getPopularProducts(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        // Get the product by ID
        const [rows] = await connection.query(`
            SELECT p.*
            FROM products p
            ORDER BY p.search_count DESC
            LIMIT 10`
        );

        // Return the product
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
}

export async function getTotalProductByCollection(req, res) {
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
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get New Products
export async function getNewProducts(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT * FROM products  
            ORDER BY created_at DESC
            LIMIT 10
        `);

        res.json({ newProducts: rows });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function removeCartItem(req, res) {
    try {
        const { userId, productId } = req.params;

        await pool.query(
            "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove cart item" });
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

export async function updateProduct(req, res) {
    let connection;
    const productId = req.params.id;
    const { name, price, stock, category, collection, gender } = req.body;

    try {
        connection = await pool.getConnection();

        // Update the product information in the database
        await connection.query(
            "UPDATE products SET name = ?, price = ?, stock = ?, category_id = ?, collection_id = ?, gender_id = ? WHERE id = ?",
            [name, price, stock, category, collection, gender ,productId]
        );

        // Return a success message
        res.json({ message: "Product atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getCodes(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM Product_Codes"
        );

        res.json(rows);
    } catch(error) {
        res.status(500).json({ error: error.message})
    } finally {
        if(connection) connection.release();
    }
}

export async function increaseStock(req, res) {
    let connection;
    const productId = req.params.id;
    const { amount } = req.body;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT stock FROM products WHERE id = ?",
            [productId]
        );

        const currentStock = rows[0].stock;

        const newStock = currentStock + amount;

        await connection.query(
            "UPDATE products SET stock = ? WHERE id = ?",
            [newStock, productId]
        );

        res.json({ message: "Stock atualizado com sucesso" });
    } catch(error) {
        res.status(500).json({ error: error.message });
    } finally {
        if(connection) connection.release();
    }
}

export async function decreaseStock(req, res) {
    let connection;
    const productId = req.params.id;
    const { amount } = req.body;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT stock FROM products WHERE id = ?",
            [productId]
        );

        const currentStock = rows[0].stock;

        const newStock = currentStock - amount;

        await connection.query(
            "UPDATE products SET stock = ? WHERE id = ?",
            [newStock, productId]
        );

        res.json({ message: "Stock atualizado com sucesso" });
    } catch(error) {
        res.status(500).json({ error: error.message });
    } finally {
        if(connection) connection.release();
    }
}

export async function getLowStock(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT COUNT(*) AS lowStock 
            FROM products 
            WHERE stock < max_stock / 10
        `);

        res.json({ lowStock: rows[0].lowStock });
    } catch(error) {
        res.status(500).json({ error: error.message})
    } finally {
        if(connection) connection.release();
    }
}

export async function getProductsByPreference(req, res) {
    let connection;
    const preferenceId = req.params.preferenceId;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM products WHERE preference_id = ?",
            [preferenceId]
        );

        res.json({ products: rows });

    } catch (error) {
        res.status(500).json({ error: error.message });

    } finally {
        if (connection) connection.release();
    }
}

export async function getLastFiveProducts(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM products ORDER BY created_at DESC LIMIT 5",
        );

        res.json({ products: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getBestSellers(req, res) {
    let connection;

    const quantity = parseInt(req.params.quantity);

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT *
            FROM products
            ORDER BY sales DESC
            LIMIT ${quantity}
        `);

        res.json({ products: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}