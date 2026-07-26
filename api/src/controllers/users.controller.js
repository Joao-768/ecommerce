import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateVerificationCode, sendVerificationEmail, sendPasswordResetEmail } from "../utils/email.js";

export async function createUser(req, res, next) {
    let connection;
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ error: "Name, surname, email, and password are required." });
    }

    try {
        connection = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);
        const code = generateVerificationCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        const [result] = await connection.query(
            `INSERT INTO users
            (name, surname, email, password_hash, role, email_verified, email_verification_code, email_verification_expires)
            VALUES (?, ?, ?, ?, 'user', 0, ?, ?)`,
            [name, surname, email, hashedPassword, code, expires]
        );

        await sendVerificationEmail(email, code);

        res.status(201).json({ id: result.insertId, email, requiresVerification: true });
    } catch (error) {
        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Email already exists" });
        }
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function createUserAsAdmin(req, res, next) {
    let connection;
    const { name, surname, email, password, role } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ error: "Name, surname, email, and password are required." });
    }

    const finalRole = role === "admin" ? "admin" : "user";

    try {
        connection = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await connection.query(
            `INSERT INTO users (name, surname, email, password_hash, role, email_verified)
            VALUES (?, ?, ?, ?, ?, 1)`,
            [name, surname, email, hashedPassword, finalRole]
        );

        res.status(201).json({ id: result.insertId, email });
    } catch (error) {
        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Email already exists" });
        }
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function verifyEmail(req, res, next) {
    let connection;
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ error: "Email and code are required" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, email_verification_code, email_verification_expires FROM users WHERE email = ?",
            [email]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];

        if (!user.email_verification_code || user.email_verification_code !== code) {
            return res.status(400).json({ error: "Invalid verification code" });
        }

        if (new Date(user.email_verification_expires) < new Date()) {
            return res.status(400).json({ error: "Verification code expired" });
        }

        await connection.query(
            "UPDATE users SET email_verified = 1, email_verification_code = NULL, email_verification_expires = NULL WHERE id = ?",
            [user.id]
        );

        res.json({ message: "Email verified successfully" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function resendVerificationEmail(req, res, next) {
    let connection;
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, email_verified FROM users WHERE email = ?",
            [email]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        if (rows[0].email_verified) {
            return res.status(400).json({ error: "Email already verified" });
        }

        const code = generateVerificationCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        await connection.query(
            "UPDATE users SET email_verification_code = ?, email_verification_expires = ? WHERE id = ?",
            [code, expires, rows[0].id]
        );

        await sendVerificationEmail(email, code);

        res.json({ message: "Verification email sent" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function loginUser(req, res, next) {
    let connection;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, name, surname, email, password_hash, status, role, email_verified FROM users WHERE email = ?",
            [email]
        );

        const user = rows[0];

        if (!rows.length) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (user.status === "blocked")
            return res.status(403).json({ error: "Your account has been temporarily deactivated." });

        if (!user.email_verified)
            return res.status(403).json({ error: "Please verify your email before logging in.", requiresVerification: true });

        const hash = user.password_hash || "";
        const isValid = await bcrypt.compare(password, hash);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getCurrentUser(req, res, next) {
    let connection;
    const userId = req.user.id;

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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserById(req, res, next) {
    let connection;
    const userId = req.params.id;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, name, surname, email, role, status, date_of_birth, nif FROM users WHERE id = ?",
            [userId]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(rows[0]);

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function updateUser(req, res, next) {
    let connection;
    const userId = req.params.id;
    const { name, surname, email, password, date_of_birth, role } = req.body;

    try {
        connection = await pool.getConnection();

        const hashedPassword = password 
        ? await bcrypt.hash(password, 10) 
        : null;

        await connection.query(
            "UPDATE users SET name = ?, surname = ?, email = ?, date_of_birth = ?, password_hash = COALESCE(?, password_hash), role = ? WHERE id = ?",
            [name, surname, email, date_of_birth || null, hashedPassword, role ,userId]
        );

        res.json({ message: "User updated successfully" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserRole(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserCollection(req, res, next) {
    let connection;
    const userId = req.params.id;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT *
            FROM user_collection uc
            JOIN products p ON p.id = uc.product_id
            WHERE uc.user_id = ?
            `,[userId]
        );

        res.json(rows);
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setNewPassword(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function forgotPassword(req, res, next) {
    let connection;
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (rows.length) {
            const code = generateVerificationCode();
            const expires = new Date(Date.now() + 15 * 60 * 1000);

            await connection.query(
                "UPDATE users SET password_reset_code = ?, password_reset_expires = ? WHERE id = ?",
                [code, expires, rows[0].id]
            );

            await sendPasswordResetEmail(email, code);
        }

        res.json({ message: "If that email exists, a reset code has been sent." });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function resetPassword(req, res, next) {
    let connection;
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
        return res.status(400).json({ error: "Email, code, and new password are required" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, password_reset_code, password_reset_expires FROM users WHERE email = ?",
            [email]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];

        if (!user.password_reset_code || user.password_reset_code !== code) {
            return res.status(400).json({ error: "Invalid reset code" });
        }

        if (new Date(user.password_reset_expires) < new Date()) {
            return res.status(400).json({ error: "Reset code expired" });
        }

        const newHash = await bcrypt.hash(newPassword, 10);

        await connection.query(
            "UPDATE users SET password_hash = ?, password_reset_code = NULL, password_reset_expires = NULL WHERE id = ?",
            [newHash, user.id]
        );

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setLastActivity(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function createAddress(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getAddresses(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function deleteAddress(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function updateAddress(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setCollectionProduct(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function removeCollectionProduct(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

// Get All Users
export async function getAllUsers(req, res, next) {
    let connection;

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id, name, surname, email, role, status FROM users"
        );

        res.json({ users: rows });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setNif(req, res, next) {
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
        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "This NIF is already associated with another account" });
        }
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function verifyNif(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function getPaymentMethod(req, res, next) {
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
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

export async function setPaymentMethod(req, res, next) {
    let connection;
    const { id } = req.params;
    const { card_number, expiry } = req.body;

    if (!card_number || !expiry) return res.status(400).json({ error: "Card number and expiry are required" });

    const last4 = String(card_number).replace(/\D/g, "").slice(-4);

    if (last4.length !== 4) {
        return res.status(400).json({ error: "Invalid card number" });
    }

    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(
            "SELECT id FROM payment_methods WHERE user_id = ?",
            [id]
        );

        if (rows.length) {
            await connection.query(
                "UPDATE payment_methods SET card_number = ?, expiry = ? WHERE user_id = ?",
                [last4, expiry, id]
            );
        } else {
            await connection.query(
                "INSERT INTO payment_methods (user_id, card_number, expiry) VALUES (?, ?, ?)",
                [id, last4, expiry]
            );
        }

        res.json({ message: "Card saved successfully" });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}