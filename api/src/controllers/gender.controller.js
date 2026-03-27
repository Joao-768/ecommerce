import { pool } from "../config/database.js";

export async function getGenders(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT id, name FROM genders"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getGendersById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).json({ error: "Gênero não encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getProductsByGender(req, res) {
    const { genderId } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM products WHERE gender_id = ?",
            [genderId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
