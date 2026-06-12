import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/search`;

export async function searchProducts(q) {
    const res = await fetch(`${API_BASE}?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error("Fail to search products");
    return res.json();
}

export async function incrementSearchCount(id) {
    const res = await fetch(`${API_BASE}/${id}/count`, {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("Fail to increment search count");
    return res.json();
}