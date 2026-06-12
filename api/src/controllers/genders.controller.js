import { pool } from "../config/database.js";

export async function getGenders(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();
        
        // Get the categories
        const [rows] = await connection.query(
            "SELECT id, name FROM genders"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getProductsByGender(req, res) {
    let connection;
    const { genderId } = req.params;
    
    const parsedId = parseInt(genderId, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
        return res.status(400).json({ error: "Invalid gender ID" });
    }

    try {
        connection = await pool.getConnection();
        let genderIds;

        if (genderId == 1) {
            genderIds = [1, 3];
        } else if (genderId == 2) {
            genderIds = [2, 3];
        } else {
            genderIds = [genderId];
        }

        // Get the products for the gender
        const [rows] = await connection.query(
            "SELECT * FROM products WHERE products.gender_id IN (?)"
        , [genderIds]);

        // Return the products
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getGenderById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        // Get the collection by ID
        const [rows] = await connection.query(
            "SELECT id, name FROM genders WHERE id = ?",
            [id]
        );

        // Return the collection
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}