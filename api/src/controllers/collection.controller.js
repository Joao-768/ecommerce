import { pool } from "../config/database.js";

export async function getCollections(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT id, name, slug FROM collections"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCollectionsById(req, res) {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            "SELECT id, name, slug FROM collections WHERE id = ?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "Coleção não encontrada" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getProductsByCollection(req, res) {
    const { collectionId } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM products WHERE collection_id = ?",
            [collectionId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
