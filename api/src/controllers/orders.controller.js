import { pool } from "../config/database.js";

export async function createOrder(req, res) {
    let connection;
    const { userId, userName, userSurname, total } = req.body;

    if (!userId || !total || !userName || !userSurname) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        connection = await pool.getConnection();

        const [result] = await connection.query(
            "INSERT INTO orders (user_id, name, surname, total_price, status) VALUES (?, ?, ?, ?, ?)"
            ,[userId, userName, userSurname, total, "paid"]
        );

        const orderId = result.insertId;

        await connection.query(
            "INSERT INTO order_status_history (order_id, status) VALUES (?, ?)"
            ,[orderId, "paid"]
        );

        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if(connection) connection.release();
    }
}

export async function setOrderItems(req, res) {
    let connection;

    const { orderId, cartItems } = req.body;

    if (!orderId || !cartItems) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        connection = await pool.getConnection();

        for (const p of cartItems) {
            await connection.query(
                "INSERT INTO order_items (order_id, product_id, product_name, price_at_purchase) VALUES (?, ?, ?, ?)",
                [orderId, p.id, p.name, p.price]
            );
        }

        res.status(201).json({ success: true });

    } catch (error) {
        res.status(500).json({ error: error.message });

    } finally {
        if (connection) connection.release();
    }
}

export async function getUserOrders(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE user_id = ?",
            [id]
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserOrdersItems(req, res) {
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
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getLastOrder(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
            [id]
        );

        res.json(rows[0] || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getTotalItems(req, res) {
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
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getAllOrders(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM orders ORDER BY created_at",
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getLastFiveOrders(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT * 
            FROM orders 
            ORDER BY created_at 
            DESC LIMIT 5
        `,);

        res.json({ orders: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function updateOrder(req, res) {
    let connection;
    const orderId = req.params.id;
    const { name, surname, total_price, status } = req.body;

    try {
        connection = await pool.getConnection();

        await connection.query(
            "UPDATE orders SET name = ?, surname = ?, total_price = ?, status = ? WHERE id = ?",
            [name, surname, total_price, status, orderId]
        );

        if (status === "delivered") {

            const [products] = await connection.query(
                "SELECT product_id FROM order_items WHERE order_id = ?",
                [orderId]
            );

            for (const p of products) {
                await connection.query(
                    "UPDATE products SET sales = sales + 1 WHERE id = ?",
                    [p.product_id]
                );
            }
        }

        res.json({ message: "Order atualizado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getOrderById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM orders WHERE id = ?",
            [id]
        );

        res.json(rows[0] || null);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getOrderAddress(req, res) {
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
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function updateOrderAddress(req, res) {
    let connection;
    const addressId = req.params.id;
    const { street, city, postal_code, district, country } = req.body;

    try {
        connection = await pool.getConnection();

        await connection.query(
            "UPDATE order_addresses SET street = ?, city = ?, postal_code = ?, district = ?, country = ? WHERE id = ?",
            [street, city, postal_code, district, country, addressId]
        );

        res.json({ message: "Order adress atualizado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}