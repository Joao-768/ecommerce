import { pool } from "../config/database.js";

// Get Total Users
export async function getTotalUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'user'"
        );

        const totalUsers = rows[0].totalUsers;
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Total Admins
export async function getTotalAdmins(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalAdmins FROM users WHERE role = 'admin'"
        );

        const totalAdmins = rows[0].totalAdmins;
        res.json({ totalAdmins });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get New Users
export async function getNewUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS newUsers FROM users WHERE role = 'user' AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"
        );

        const newUsers = rows[0].newUsers;
        res.json({ newUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Total Products
export async function getTotalProducts(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalProducts FROM products"
        );

        const totalProducts = rows[0].totalProducts;
        res.json({ totalProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get In Stock Products
export async function getInStock(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS inStock FROM products WHERE stock != 0"
        );

        const inStock = rows[0].inStock;
        res.json({ inStock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Out Of Stock Products
export async function getOutOfStock(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS outOfStock FROM products WHERE stock = 0"
        );

        const outOfStock = rows[0].outOfStock;
        res.json({ outOfStock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Total Categories
export async function getTotalCategories(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalCategories FROM categories"
        );

        const totalCategories = rows[0].totalCategories;
        res.json({ totalCategories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Total Collections
export async function getTotalCollections(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalCollections FROM collections"
        );

        const totalCollections = rows[0].totalCollections;
        res.json({ totalCollections });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Users By Month
export async function getUsersByMonth(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT 
                MONTH(created_at) AS month,
                COUNT(*) AS users
            FROM users
            WHERE YEAR(created_at) = YEAR(CURDATE())
            AND role != 'admin'
            GROUP BY MONTH(created_at)
        `);

        // Inicializa todos os meses com 0
        const data = [
            { name: "Jan", users: 0 },
            { name: "Fev", users: 0 },
            { name: "Mar", users: 0 },
            { name: "Abr", users: 0 },
            { name: "Mai", users: 0 },
            { name: "Jun", users: 0 },
            { name: "Jul", users: 0 },
            { name: "Ago", users: 0 },
            { name: "Set", users: 0 },
            { name: "Out", users: 0 },
            { name: "Nov", users: 0 },
            { name: "Dez", users: 0 },
        ];

        // Preenche os valores retornados pela query
        rows.forEach(row => {
            const index = row.month - 1;
            data[index].users = row.users;
        });

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Total Orders
export async function getTotalOrders(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalOrders FROM orders"
        );

        const totalOrders = rows[0].totalOrders;
        res.json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Last Five Users
export async function getLastFiveUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT *
            FROM users
            WHERE role != 'admin'
            ORDER BY created_at DESC
            LIMIT 5;
        `);

        res.json({ users: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Last Active Users
export async function getLastActiveUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT COUNT(*) AS activeUsers
            FROM users
            WHERE last_activity >= NOW() - INTERVAL 7 DAY AND role = 'user'
        `);

        const activeUsers = rows[0].activeUsers;
        res.json({ activeUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get All Users
export async function getAllUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, name, surname, email, role, status FROM users"
        );

        res.json({ users: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Blocked Users
export async function getBlockedUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT COUNT(*) AS blockedUsers
            FROM users
            WHERE status = 'blocked'
        `);

        const blockedUsers = rows[0].blockedUsers;
        res.json({ blockedUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Delete User
export async function deleteUser(req, res) {
    let connection;

    try {
        const { id } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(
            `DELETE FROM users WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get All Products
export async function getAllProducts(req, res) {
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

// Delete Product
export async function deleteProduct(req, res) {
    let connection;

    try {
        const { id } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(
            `DELETE FROM products WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product blocked successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Block User
export async function blockUser(req, res) {
    let connection;

    try {
        const { id } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(`
            UPDATE users
            SET status = IF(status = 'active', 'blocked', 'active')
            WHERE id = ?;
            `, [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User blocked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Get Users Status
export async function isUserActive(req, res) {
    let connection;

    try {
        const { id } = req.params;

        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT status AS isUserActive
            FROM users
            WHERE id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isUserActive = rows[0].isUserActive === 'active';
        res.json({ isUserActive });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getAdminTasks(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT * FROM admin_tasks
        `);

        res.json({ tasks: rows });
    } catch(error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getAdminTaskById(req, res) {
    const { id } = req.params;
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT * 
            FROM admin_tasks
            WHERE id = ?
        `, [id]);

        res.json({ task: rows[0] });
    } catch(error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function createAdminTask(req, res) {
    let connection;
    const { task, description, status } = req.body;

    try {
        connection = await pool.getConnection();

        const [result] = await connection.query(`
            INSERT INTO admin_tasks (task, description, status)
            VALUES (?, ?, ?)
            `,[task, description, status]
        );

        res.json({
            message: "Task created successfully",
            insertId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function updateAdminTask(req, res) {
    let connection;
    const { id } = req.params;
    const { task, description, status } = req.body;

    try {
        connection = await pool.getConnection();

        await connection.query(
            `
            UPDATE admin_tasks
            SET task = ?, description = ?, status = ?
            WHERE id = ?
            `,
            [task, description, status, id]
        );

        res.json({ message: "Task updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}
