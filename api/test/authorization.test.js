import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/config/database.js";
import { createTestUser, deleteTestUser, authHeader } from "./helpers.js";

describe("Authorization: self vs admin", () => {
    let userA, userB, admin;

    beforeAll(async () => {
        userA = await createTestUser();
        userB = await createTestUser();
        admin = await createTestUser({ role: "admin" });
    });

    afterAll(async () => {
        await deleteTestUser(userA.id);
        await deleteTestUser(userB.id);
        await deleteTestUser(admin.id);
        await pool.end();
    });

    it("rejects requests with no token", async () => {
        const res = await request(app).get(`/api/cart/${userA.id}`);
        expect(res.status).toBe(401);
    });

    it("rejects a user reading another user's cart", async () => {
        const res = await request(app)
            .get(`/api/cart/${userB.id}`)
            .set(authHeader(userA.token));
        expect(res.status).toBe(403);
    });

    it("allows a user to read their own cart", async () => {
        const res = await request(app)
            .get(`/api/cart/${userA.id}`)
            .set(authHeader(userA.token));
        expect(res.status).toBe(200);
    });

    it("allows an admin to read any user's cart", async () => {
        const res = await request(app)
            .get(`/api/cart/${userB.id}`)
            .set(authHeader(admin.token));
        expect(res.status).toBe(200);
    });

    it("rejects a non-admin from listing all users", async () => {
        const res = await request(app)
            .get("/api/users")
            .set(authHeader(userA.token));
        expect(res.status).toBe(403);
    });

    it("allows an admin to list all users", async () => {
        const res = await request(app)
            .get("/api/users")
            .set(authHeader(admin.token));
        expect(res.status).toBe(200);
    });

    it("rejects a user fetching another user's role", async () => {
        const res = await request(app)
            .get(`/api/users/${userB.id}/role`)
            .set(authHeader(userA.token));
        expect(res.status).toBe(403);
    });

    it("allows a user to fetch their own role", async () => {
        const res = await request(app)
            .get(`/api/users/${userA.id}/role`)
            .set(authHeader(userA.token));
        expect(res.status).toBe(200);
        expect(res.body.userRole).toBe("user");
    });
});
