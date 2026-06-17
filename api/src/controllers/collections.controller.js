import { pool } from "../config/database.js";

export async function createCollection(req, res) {
    let connection;
    const { name, description } = req.body;

    if ( !name || !description ) {
        return res.status(400).json({ error: "Name and description are required" });
    }

    try {
        connection = await pool.getConnection();

        // Insert the new user into the database
        const [result] = await connection.query(
            `INSERT INTO collections 
            (name, description) 
            VALUES (?, ?)`,
        [name, description]
);

        // Return the created user info
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if(connection) connection.release();
    }
}

export async function getCollections(req, res) {
    let connection;
    
    try {
        connection = await pool.getConnection();

        // Get the collections
        const [rows] = await connection.query(
            "SELECT * FROM collections"
        );

        // Return the collections
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getCollectionsById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        // Get the collection by ID
        const [rows] = await connection.query(
            "SELECT * FROM collections WHERE id = ?",
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

export async function getProductsByCollection(req, res) {
    let connection;
    const { collectionId } = req.params;

    try {
        connection = await pool.getConnection();

        // Get the products for the collection
        const [rows] = await connection.query(
            "SELECT * FROM products WHERE collection_id = ?"
            ,[collectionId]
        );

        // Return the products
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function updateCollection(req, res) {
    let connection;
    const collectionId = req.params.id;
    const { name, description } = req.body;

    try {
        connection = await pool.getConnection();

        // Update the product information in the database
        await connection.query(
            "UPDATE collections SET name = ?, description = ? WHERE id = ?",
            [name, description ,collectionId]
        );

        // Return a success message
        res.json({ message: "Collection updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

// Delete Collection
export async function deleteCollection(req, res) {
    let connection;

    try {
        const { id } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(
            `DELETE FROM collections WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Collection not found" });
        }

        res.json({ message: "Collection deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getTotalCollections(req, res) {
    let connection;
    
    try {
        connection = await pool.getConnection();

        // Get the total number of collections
        const [rows] = await connection.query(
            "SELECT COUNT(*) AS totalCollections FROM collections"
        );

        // Return the total number of collections
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}
