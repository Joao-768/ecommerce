import { pool } from "../config/database.js";

// Dashboard
export async function getTotalUsers(req, res, next) {
    let connection;
    const { count, limit, month } = req.query;

    try {
        connection = await pool.getConnection();

        if (count === 'true') {
            const [[total]] = await connection.query(
                "SELECT COUNT(*) AS total FROM users WHERE role = 'user'"
            );
            const [[admins]] = await connection.query(
                "SELECT COUNT(*) AS total FROM users WHERE role = 'admin'"
            );
            const [[newUsers]] = await connection.query(
                "SELECT COUNT(*) AS total FROM users WHERE role = 'user' AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"
            );
            const [[blockedUsers]] = await connection.query(
                "SELECT COUNT(*) AS total FROM users WHERE status = 'blocked'"
            );
            const [[activeUsers]] = await connection.query(
                "SELECT COUNT(*) AS total FROM users WHERE last_activity >= NOW() - INTERVAL 7 DAY AND role = 'user'"
            );
            return res.json({
                totalUsers: total.total,
                totalAdmins: admins.total,
                newUsers: newUsers.total,
                blockedUsers: blockedUsers.total,
                activeUsers: activeUsers.total
            });
        }

        if (month === 'true') {
            const [rows] = await connection.query(`
                SELECT MONTH(created_at) AS month, COUNT(*) AS users
                FROM users
                WHERE YEAR(created_at) = YEAR(CURDATE()) AND role != 'admin'
                GROUP BY MONTH(created_at)
            `);
            const data = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]
                .map((name) => ({ name, users: 0 }));
            rows.forEach(row => { data[row.month - 1].users = row.users; });
            return res.json(data);
        }

        if (limit) {
            const [rows] = await connection.query(`
                SELECT * FROM users
                WHERE role != 'admin'
                ORDER BY created_at DESC
                LIMIT ?
            `, [parseInt(limit)]);
            return res.json({ users: rows });
        }

        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'user'"
        );
        res.json({ totalUsers: rows[0].totalUsers });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function deleteProduct(req, res, next) {
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

        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

// Admin Tasks

export async function getAdminTasks(req, res, next) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT * FROM admin_tasks
        `);

        res.json({ tasks: rows });
    } catch(error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getAdminTaskById(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function createAdminTask(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function updateAdminTask(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function isUserActive(req, res, next) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT status FROM users WHERE id = ?",
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: "User not found" });
        res.json({ isUserActive: rows[0].status === "active" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function blockUser(req, res, next) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT status FROM users WHERE id = ?",
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: "User not found" });

        const newStatus = rows[0].status === "active" ? "blocked" : "active";
        await connection.query(
            "UPDATE users SET status = ? WHERE id = ?",
            [newStatus, req.params.id]
        );
        res.json({ message: `User ${newStatus}` });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function deleteUser(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}
