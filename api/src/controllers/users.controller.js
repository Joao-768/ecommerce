import crypto from "node:crypto";
import { pool } from "../config/database.js";
import { sendEmail } from "../config/email.js";

function buildVerificationEmail(token) {
    const verifyUrl = `http://localhost:3001/api/users/verify-email?token=${token}`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Verify your email</h2>
            <p>Click the button below to verify your email and activate your account.</p>
            <a href="${verifyUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;">
                Verify email
            </a>
            <p style="margin-top:16px;font-size:12px;color:#666;">If you did not request this, ignore this email.</p>
        </div>
    `;

    return {
        verifyUrl,
        html,
        text: `Open this link to verify your email: ${verifyUrl}`,
    };
}

export async function getAllUsers(req, res) {
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserById(req, res) {
    let connection;
    const { id } = req.params;

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);

        if (!rows.length) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }    
}

export async function createUser(req, res) {
    let connection;
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();
        const verificationToken = crypto.randomBytes(24).toString("hex");
        const tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24);

        const [result] = await connection.query(
            "INSERT INTO users (name, surname, email, password, verification_token, token_expiration) VALUES (?, ?, ?, ?, ?, ?)",
            [name, surname, email, password, verificationToken, tokenExpiration]
        );

        const { html, text } = buildVerificationEmail(verificationToken);
        let verificationSent = true;

        try {
            await sendEmail({
                to: email,
                subject: "Verify your email",
                text,
                html,
            });
        } catch {
            verificationSent = false;
        }

        res.status(201).json({ id: result.insertId, email, verificationSent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function loginUser(req, res) {
    let connection;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [email, password]
        );

        if (!rows.length) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        res.json({ message: "Login bem-sucedido", user: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function getUserProfile(req, res) {
    let connection;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token de autenticação ausente ou inválido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM users WHERE id = ?",
            [token]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "Utilizador não encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export async function verifyEmail(req, res) {
    let connection;
    const token = String(req.query.token || "");

    if (!token) {
        return res.status(400).send("Invalid verification token.");
    }

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT id, token_expiration FROM users WHERE verification_token = ? LIMIT 1",
            [token]
        );

        if (!rows.length) {
            return res.status(400).send("Verification token not found.");
        }

        const expiresAt = rows[0].token_expiration ? new Date(rows[0].token_expiration) : null;
        if (expiresAt && Date.now() > expiresAt.getTime()) {
            return res.status(400).send("Verification token expired.");
        }

        try {
            await connection.query(
                "UPDATE users SET verification_token = NULL, token_expiration = NULL, email_verified = 1 WHERE id = ?",
                [rows[0].id]
            );
        } catch {
            await connection.query(
                "UPDATE users SET verification_token = NULL, token_expiration = NULL WHERE id = ?",
                [rows[0].id]
            );
        }

        res.send("Email verified. You can now log in.");
    } catch (error) {
        res.status(500).send("Failed to verify email.");
    } finally {
        if (connection) connection.release();
    }
}

export async function resendVerification(req, res) {
    let connection;
    const { email } = req.body || {};

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT id FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "User not found." });
        }

        const verificationToken = crypto.randomBytes(24).toString("hex");
        const tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24);

        await connection.query(
            "UPDATE users SET verification_token = ?, token_expiration = ? WHERE id = ?",
            [verificationToken, tokenExpiration, rows[0].id]
        );

        const { html, text } = buildVerificationEmail(verificationToken);
        await sendEmail({
            to: email,
            subject: "Verify your email",
            text,
            html,
        });

        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) connection.release();
    }
}
