import { pool } from "../config/database.js";

export async function checkout(req, res, next) {
    let connection;
    const { userId, nif, address, cartItems, card } = req.body;

    if (!userId || !address || !Array.isArray(cartItems) || !cartItems.length) {
        return res.status(400).json({ error: "User ID, address, and cart items are required" });
    }

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const verifiedItems = [];
        let total = 0;

        for (const item of cartItems) {
            const quantity = item.quantity || 1;
            const [rows] = await connection.query(
                "SELECT name, price, stock FROM products WHERE id = ? FOR UPDATE",
                [item.id]
            );

            if (!rows.length || rows[0].stock < quantity) {
                await connection.rollback();
                return res.status(409).json({ error: `Insufficient stock for product ${item.id}` });
            }

            const product = rows[0];
            verifiedItems.push({ id: item.id, name: product.name, price: product.price, quantity, size_mm: item.size_mm });
            total += Number(product.price) * quantity;
        }

        const [orderResult] = await connection.query(
            "INSERT INTO orders (user_id, total_price, status, nif) VALUES (?, ?, ?, ?)",
            [userId, total, "paid", nif || null]
        );
        const orderId = orderResult.insertId;

        await connection.query(
            "INSERT INTO order_status_history (order_id, status) VALUES (?, ?)",
            [orderId, "paid"]
        );

        await connection.query(
            "INSERT INTO order_addresses (order_id, street, city, postal_code, district, country) VALUES (?, ?, ?, ?, ?, ?)",
            [orderId, address.street, address.city, address.postal_code, address.district, address.country]
        );

        for (const item of verifiedItems) {
            await connection.query(
                "INSERT INTO order_items (order_id, product_id, product_name, price_at_purchase, quantity, size) VALUES (?, ?, ?, ?, ?, ?)",
                [orderId, item.id, item.name, item.price, item.quantity, item.size_mm]
            );

            await connection.query(
                "UPDATE products SET stock = stock - ? WHERE id = ?",
                [item.quantity, item.id]
            );
        }

        if (nif) {
            await connection.query(
                "UPDATE users SET nif = ? WHERE id = ? AND nif IS NULL",
                [nif, userId]
            );
        }

        if (card?.cardNumber && card?.expiry) {
            const last4 = String(card.cardNumber).replace(/\D/g, "").slice(-4);
            const [existingCard] = await connection.query(
                "SELECT id FROM payment_methods WHERE user_id = ?",
                [userId]
            );

            if (existingCard.length) {
                await connection.query(
                    "UPDATE payment_methods SET card_number = ?, expiry = ? WHERE user_id = ?",
                    [last4, card.expiry, userId]
                );
            } else {
                await connection.query(
                    "INSERT INTO payment_methods (user_id, card_number, expiry) VALUES (?, ?, ?)",
                    [userId, last4, card.expiry]
                );
            }
        }

        await connection.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);

        await connection.commit();
        res.status(201).json({ id: orderId });
    } catch (error) {
        if (connection) await connection.rollback();
        if (error?.code === "ER_DUP_ENTRY" && error.message.includes("unique_nif")) {
            return res.status(409).json({ error: "This NIF is already associated with another account" });
        }
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function createOrder(req, res, next) {
    let connection;
    const { userId, total, nif } = req.body;

    if (!userId || !total) {
        return res.status(400).json({ error: "User ID and total price are required" });
    }

    try {
        connection = await pool.getConnection();

        const [result] = await connection.query(
            "INSERT INTO orders (user_id, total_price, status, nif) VALUES (?, ?, ?, ?)",
            [userId, total, "paid", nif]
        );

        const orderId = result.insertId;

        await connection.query(
            "INSERT INTO order_status_history (order_id, status) VALUES (?, ?)",
            [orderId, "paid"]
        );

        res.status(201).json({ id: orderId });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setOrderItems(req, res, next) {
    let connection;

    const { orderId, cartItems } = req.body;

    if (!orderId || !cartItems) {
        return res.status(400).json({ error: "Order ID and cart items are required" });
    }

    try {
        connection = await pool.getConnection();

        for (const p of cartItems) {
            await connection.query(
                "INSERT INTO order_items (order_id, product_id, product_name, price_at_purchase, quantity, size) VALUES (?, ?, ?, ?, ?, ?)",
                [orderId, p.id, p.name, p.price, p.quantity, p.size_mm]
            );
        }

        res.status(201).json({ success: true });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserOrders(req, res, next) {
    let connection;
    const { userId } = req.params;
    const { last } = req.query;

    try {
        connection = await pool.getConnection();

        if (last === 'true') {
            const [rows] = await connection.query(`
                SELECT orders.*, users.name, users.surname
                FROM orders
                JOIN users ON users.id = orders.user_id
                WHERE user_id = ?
                ORDER BY orders.created_at DESC
                LIMIT 1
            `, [userId]);
            return res.json(rows[0] || null);
        }

        const [rows] = await connection.query(`
            SELECT orders.*, users.name, users.surname
            FROM orders
            JOIN users ON users.id = orders.user_id
            WHERE user_id = ?
            ORDER BY orders.created_at
        `, [userId]);

        res.json(rows);

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserOrdersItems(req, res, next) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT *
            FROM order_items oi
            JOIN products p ON p.id = oi.product_id
            WHERE oi.order_id = ?
        `,[id] );

        res.json(rows);

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getTotalItems(req, res, next) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalItems FROM order_items WHERE order_id = ?",
            [id]
        );

        const totalItems = rows[0].totalItems;
        res.json({ totalItems });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getAllOrders(req, res, next) {
    let connection;
    const { count, limit } = req.query;

    try {
        connection = await pool.getConnection();

        if (count === 'true') {
            const [[total]] = await connection.query(
                "SELECT COUNT(*) AS totalOrders FROM orders"
            );
            return res.json({ totalOrders: total.totalOrders });
        }

        if (limit) {
            const [rows] = await connection.query(`
                SELECT orders.*, users.name, users.surname
                FROM orders
                JOIN users ON users.id = orders.user_id
                ORDER BY orders.created_at DESC
                LIMIT ?
            `, [parseInt(limit)]);
            return res.json({ orders: rows });
        }

        const [rows] = await connection.query(`
            SELECT orders.*, users.name, users.surname
            FROM orders
            JOIN users ON users.id = orders.user_id
            ORDER BY orders.created_at
        `);

        res.json(rows);

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function updateOrder(req, res, next) {
    let connection;
    const orderId = req.params.id;
    const { total_price, status } = req.body;

    try {
        connection = await pool.getConnection();

        await connection.query(
            "UPDATE orders SET total_price = ?, status = ? WHERE id = ?",
            [total_price, status, orderId]
        );

        if (status === "delivered") {

            const [products] = await connection.query(
                "SELECT product_id, quantity FROM order_items WHERE order_id = ?",
                [orderId]
            );
            for (const p of products) {
                await connection.query(
                    "UPDATE products SET sales = sales + ? WHERE id = ?",
                    [p.quantity, p.product_id]
                );
            }

        }

        res.json({ message: "Order updated successfully" });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getOrderById(req, res, next) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT orders.*, users.name, users.surname
            FROM orders
            JOIN users ON users.id = orders.user_id
            WHERE orders.id = ?
        `, [id]);

        res.json(rows[0] || null);

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getOrderAddress(req, res, next) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM order_addresses WHERE order_id = ?",
            [id]
        );

        res.json(rows[0] || null);

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function updateOrderAddress(req, res, next) {
    let connection;
    const addressId = req.params.id;
    const { street, city, postal_code, district, country } = req.body;

    try {
        connection = await pool.getConnection();

        await connection.query(
            "UPDATE order_addresses SET street = ?, city = ?, postal_code = ?, district = ?, country = ? WHERE id = ?",
            [street, city, postal_code, district, country, addressId]
        );

        res.json({ message: "Order address updated successfully" });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function createOrderAddress(req, res, next) {
    let connection;
    const orderId = req.params.id;
    const { address } = req.body;

    try {
        connection = await pool.getConnection();

        await connection.query(
            "INSERT INTO order_addresses (order_id, street, city, postal_code, district, country) VALUES (?, ?, ?, ?, ?, ?)",
            [orderId, address.street, address.city, address.postal_code, address.district, address.country]
        );

        res.status(201).json({ message: "Address saved successfully" });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

