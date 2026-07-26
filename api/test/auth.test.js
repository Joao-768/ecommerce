import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/config/database.js";
import { createTestUser, deleteTestUser } from "./helpers.js";

describe("POST /api/users/login", () => {
    let user;

    beforeAll(async () => {
        user = await createTestUser();
    });

    afterAll(async () => {
        await deleteTestUser(user.id);
        await pool.end();
    });

    it("rejects missing fields", async () => {
        const res = await request(app).post("/api/users/login").send({ email: user.email });
        expect(res.status).toBe(400);
    });

    it("rejects wrong password", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: user.email, password: "WrongPass123!" });
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Invalid credentials");
    });

    it("rejects unknown email", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: "nobody-here@example.com", password: "TestPass123!" });
        expect(res.status).toBe(401);
    });

    it("logs in with correct credentials and returns a token with role", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: user.email, password: user.password });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeTruthy();
        expect(res.body.user.role).toBe("user");
    });

    it("rejects login for unverified email", async () => {
        const unverified = await createTestUser();
        await pool.query("UPDATE users SET email_verified = 0 WHERE id = ?", [unverified.id]);

        const res = await request(app)
            .post("/api/users/login")
            .send({ email: unverified.email, password: unverified.password });

        expect(res.status).toBe(403);
        expect(res.body.requiresVerification).toBe(true);

        await deleteTestUser(unverified.id);
    });

    it("rejects login for blocked account", async () => {
        const blocked = await createTestUser();
        await pool.query("UPDATE users SET status = 'blocked' WHERE id = ?", [blocked.id]);

        const res = await request(app)
            .post("/api/users/login")
            .send({ email: blocked.email, password: blocked.password });

        expect(res.status).toBe(403);

        await deleteTestUser(blocked.id);
    });
});
