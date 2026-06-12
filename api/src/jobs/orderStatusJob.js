import cron from "node-cron";
import { pool } from "../config/database.js";

cron.schedule("0 0 * * *", async () => {
    let connection;
    try {
        connection = await pool.getConnection();

        await connection.query(`
            UPDATE orders 
            SET status = 'processing'
            WHERE status = 'paid'
            AND created_at <= NOW() - INTERVAL 1 DAY
        `);

        await connection.query(`
            UPDATE orders 
            SET status = 'shipped'
            WHERE status = 'processing'
            AND created_at <= NOW() - INTERVAL 3 DAY
        `);

        await connection.query(`
            UPDATE orders 
            SET status = 'delivered'
            WHERE status = 'shipped'
            AND created_at <= NOW() - INTERVAL 6 DAY
        `);

        console.log("Order statuses updated");
    } catch (error) {
        console.error("Cron job error:", error);
    } finally {
        if (connection) connection.release();
    }
});