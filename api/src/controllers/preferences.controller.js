import { pool } from "../config/database.js";

export async function getPreferences(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();
        
        // Get Preferences
        const [rows] = await connection.query(
            "SELECT * FROM preferences"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function setUserPreference(req, res) {
    let connection;
    const { userId, preferenceId } = req.params;

    if (!userId || !preferenceId) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();

        const [existing] = await connection.query(`
                SELECT * FROM user_preferences 
                WHERE user_id = ? AND preference_id = ?
            `, [userId, preferenceId]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: "Preference já existe" });
        }

        // Insert New User Preference
        const [result] = await connection.query(
            `INSERT INTO user_preferences 
            (user_id, preference_id) 
            VALUES (?, ?)`
        , [userId, preferenceId]);

        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if(connection) connection.release();
    }
}

export async function removeUserPreference(req, res) {
    let connection;

    try {
        const { userId, preferenceId } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(
            `DELETE FROM user_preferences WHERE user_id = ? AND preference_id = ?`,
            [userId, preferenceId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User Preference Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserPreferences(req, res) {
    let connection;
    const { userId } = req.params;

    try {
        connection = await pool.getConnection();
        
        // Get Preferences
        const [rows] = await connection.query(
            "SELECT * FROM user_preferences WHERE user_id = ?"
        , [userId]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}