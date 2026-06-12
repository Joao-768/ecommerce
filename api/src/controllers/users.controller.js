import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";

export async function createUser(req, res) {
    let connection;
    const { name, surname, email, password } = req.body;
    let { role } = req.body

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ error: "Name, surname, email, and password are required." });
    }

    if(!role) role = "user";

    try {
        connection = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const [result] = await connection.query(
            "INSERT INTO users (name, surname, email, password_hash, role) VALUES (?, ?, ?, ?, ?)",
            [name, surname, email, hashedPassword, role]
        );

        // Return the created user info
        res.status(201).json({ id: result.insertId, email });
    } catch (error) {
        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function loginUser(req, res) {
    let connection;
    const { email, password } = req.body;

    // If email or password is missing, return an error
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        connection = await pool.getConnection();

        // Search for a user with the provided email
        const [rows] = await connection.query(
            "SELECT id, email, password_hash, status FROM users WHERE email = ?",
            [email]
        );

        const user = rows[0];

        // If no user is found, return an error
        if (!rows.length) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (user.status === "blocked")
            return res.status(403).json({ error: "Your account has been temporarily deactivated." });

        const hash = user.password_hash || "";
        const isValid = await bcrypt.compare(password, hash);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // If user is found, return basic user info
        res.json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserById(req, res) {
    let connection;
    const userId = req.params.id;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function updateUser(req, res) {
    let connection;
    const userId = req.params.id;
    const { name, surname, email, password, date_of_birth, role } = req.body;

    try {
        connection = await pool.getConnection();

        const hashedPassword = password 
        ? await bcrypt.hash(password, 10) 
        : null;


        // Update the user information in the database
        await connection.query(
            "UPDATE users SET name = ?, surname = ?, email = ?, date_of_birth = ?, password_hash = COALESCE(?, password_hash), role = ? WHERE id = ?",
            [name, surname, email, date_of_birth || null, hashedPassword, role ,userId]
        );

        // Return a success message
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserRole(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT role FROM users WHERE id = ?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const userRole = rows[0].role;
        res.json({ userRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserCollection(req, res) {
    let connection;
    const userId = req.params.id;

    try {
        connection = await pool.getConnection();

        // Search for the user's collection in the database
        const [rows] = await connection.query(`
            SELECT *
            FROM user_collection uc
            JOIN products p ON p.id = uc.product_id
            WHERE uc.user_id = ?
            `,[userId]
        );

        // Return the user's collection
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function setNewPassword(req, res) {
    let connection;
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id || req.body.userId;

    try {
        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({ error: "User ID, current password, and new password are required" });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ error: "The new password must be different from the current password" });
        }

        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT password_hash FROM users WHERE id = ?",
            [userId]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const stored = rows[0].password_hash || "";
        const isValid = await bcrypt.compare(currentPassword, stored);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid current password" });
        }

        const newHash = await bcrypt.hash(newPassword, 10);

        await connection.query(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            [newHash, userId]
        );

        res.json({ ok: true });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function forgotPassword(req, res) {
    let connection;
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "Email and new password are required" });
    }

    try {
        connection = await pool.getConnection();

        const newHash = await bcrypt.hash(newPassword, 10);

        const [result] = await connection.query(
            "UPDATE users SET password_hash = ? WHERE email = ?",
            [newHash, email]
        );

        if (!result.affectedRows) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function setLastActivity(req, res) {
    let connection;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        connection = await pool.getConnection();

        // Update the user information in the database
        await connection.query(
            "UPDATE users SET last_activity = NOW() WHERE id = ?",
            [userId]
        );

        // Return a success message
        res.json({ message: "Last activity updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function createAddress(req, res) {
    let connection;

    const userId = req.params.id;
    const { street, city, postal_code, country, district } = req.body;

    if (!userId || !street || !city || !postal_code || !country) {
        return res.status(400).json({ error: "User ID, street, city, postal code, and country are required" });
    }

    try {
        connection = await pool.getConnection();

        await connection.query(
            `INSERT INTO Addresses 
            (user_id, street, city, postal_code, country, district)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, street, city, postal_code, country, district]
        );

        res.json({ message: "Address created successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getAddresses(req, res) {
    let connection;

    const userId = req.params.id;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM Addresses WHERE user_id = ?",
            [userId]
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function deleteAddress(req, res) {
    let connection;

    try {
        const { id } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(
            `DELETE FROM addresses WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Address not found" });
        }

        res.json({ message: "Address deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function updateAddress(req, res) {
    let connection;
    const addressId = req.params.id;
    const { street, city, postal_code, district, country } = req.body;

    try {
        connection = await pool.getConnection();

        // Update the user information in the database
        await connection.query(`
            UPDATE addresses 
            SET street = ?, city = ?, postal_code = ?, district = ?, country = ? 
            WHERE id = ?
            `,[street, city, postal_code, district, country ,addressId]
        );

        res.json({ message: "Address atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function setCollectionProduct(req, res) {
    let connection;

    const userId = req.params.id;
    const { productId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID em falta" });
    }

    try {
        connection = await pool.getConnection();

        await connection.query(`
            INSERT INTO user_collection 
            (user_id, product_id) 
            VALUES (?, ?)
            `, [userId, productId]
        );

        res.json({ message: "Produto adicionado a colecao do user" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function removeCollectionProduct(req, res) {
    let connection;

    try {
        const { id, productId } = req.params;

        connection = await pool.getConnection();

        const [result] = await connection.query(
            `DELETE FROM user_collection WHERE user_id = ? AND product_id = ?`,
            [id, productId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Collection Product deleted successfully" });

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

export async function setNif(req, res) {
    const { id } = req.params;
    const { nif } = req.body;
    let connection;

    if (!nif) return res.status(400).json({ error: "NIF is required" });
    if (!/^\d{9}$/.test(nif)) return res.status(400).json({ error: "NIF is invalid" });

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query("SELECT nif FROM users WHERE id = ?", [id]);
        if (!rows.length) return res.status(404).json({ error: "User not found" });
        if (rows[0].nif !== null) return res.status(400).json({ error: "NIF already defined" });

        await connection.query("UPDATE users SET nif = ? WHERE id = ?", [nif, id]);
        res.json({ message: "NIF saved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function verifyNif(req, res) {
    const { id } = req.params;
    const { nif } = req.body;
    let connection;

    if (!nif) return res.status(400).json({ error: "NIF is required" });

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query("SELECT nif FROM users WHERE id = ?", [id]);
        if (!rows.length) return res.status(404).json({ error: "User not found" });

        res.json({ match: rows[0].nif === nif });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getPaymentMethod(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT * FROM Payment_Methods WHERE user_id = ?"
            , [id]
        );

        if (!rows.length) return res.json(null);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function setPaymentMethod(req, res) {
    let connection;
    const { id } = req.params;
    const { card_number, expiry } = req.body;

    if (!card_number || !expiry) return res.status(400).json({ error: "Card number and expiry are required" });

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id FROM payment_methods WHERE user_id = ?",
            [id]
        );

        if (rows.length) {
            await connection.query(
                "UPDATE payment_methods SET card_number = ?, expiry = ? WHERE user_id = ?",
                [card_number, expiry, id]
            );
        } else {
            await connection.query(
                "INSERT INTO payment_methods (user_id, card_number, expiry) VALUES (?, ?, ?)",
                [id, card_number, expiry]
            );
        }

        res.json({ message: "Card saved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}