import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/config/database.js";
import {
    createTestUser,
    deleteTestUser,
    getSampleProduct,
    resetProductStock,
    deleteOrder,
    authHeader,
} from "./helpers.js";

const sampleAddress = {
    street: "Rua de Teste",
    city: "Porto",
    postal_code: "4000-000",
    district: "Porto",
    country: "Portugal",
};

describe("POST /api/orders/checkout", () => {
    let userA, userB, product;
    const createdOrderIds = [];

    beforeAll(async () => {
        userA = await createTestUser();
        userB = await createTestUser();
        product = await getSampleProduct();
    });

    afterAll(async () => {
        for (const id of createdOrderIds) await deleteOrder(id);
        if (product) await resetProductStock(product.id, product.stock);
        await deleteTestUser(userA.id);
        await deleteTestUser(userB.id);
        await pool.end();
    });

    it("rejects checkout for another user's id", async () => {
        const res = await request(app)
            .post("/api/orders/checkout")
            .set(authHeader(userA.token))
            .send({
                userId: userB.id,
                address: sampleAddress,
                cartItems: [{ id: product.id, quantity: 1 }],
            });

        expect(res.status).toBe(403);
    });

    it("rejects checkout with empty cart", async () => {
        const res = await request(app)
            .post("/api/orders/checkout")
            .set(authHeader(userA.token))
            .send({ userId: userA.id, address: sampleAddress, cartItems: [] });

        expect(res.status).toBe(400);
    });

    it("rejects checkout when requested quantity exceeds stock", async () => {
        const res = await request(app)
            .post("/api/orders/checkout")
            .set(authHeader(userA.token))
            .send({
                userId: userA.id,
                address: sampleAddress,
                cartItems: [{ id: product.id, quantity: product.stock + 1000 }],
            });

        expect(res.status).toBe(409);
    });

    it("ignores a client-supplied price and uses the real product price, decrementing stock", async () => {
        const stockBefore = product.stock;

        const res = await request(app)
            .post("/api/orders/checkout")
            .set(authHeader(userA.token))
            .send({
                userId: userA.id,
                address: sampleAddress,
                cartItems: [{ id: product.id, price: 0.01, quantity: 1 }],
            });

        expect(res.status).toBe(201);
        expect(res.body.id).toBeTruthy();
        createdOrderIds.push(res.body.id);

        const [[order]] = await pool.query(
            "SELECT total_price FROM orders WHERE id = ?",
            [res.body.id]
        );
        expect(Number(order.total_price)).toBeCloseTo(Number(product.price), 2);

        const [[item]] = await pool.query(
            "SELECT price_at_purchase FROM order_items WHERE order_id = ?",
            [res.body.id]
        );
        expect(Number(item.price_at_purchase)).toBeCloseTo(Number(product.price), 2);

        const [[updatedProduct]] = await pool.query(
            "SELECT stock FROM products WHERE id = ?",
            [product.id]
        );
        expect(updatedProduct.stock).toBe(stockBefore - 1);

        const [statusHistory] = await pool.query(
            "SELECT status FROM order_status_history WHERE order_id = ?",
            [res.body.id]
        );
        expect(statusHistory.length).toBeGreaterThan(0);
        expect(statusHistory[0].status).toBe("paid");

        const [[savedAddress]] = await pool.query(
            "SELECT street FROM order_addresses WHERE order_id = ?",
            [res.body.id]
        );
        expect(savedAddress.street).toBe(sampleAddress.street);
    });
});
