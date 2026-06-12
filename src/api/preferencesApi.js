import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/preferences`;

export async function getPreferences() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Fail to fetch all preferences");
    return res.json();
}

export async function getUserPreferences(userId) {
    if (!userId) throw new Error("UserId em falta");
    const res = await fetch(`${API_BASE}/user/${userId}`);
    if (!res.ok) throw new Error("Fail to fetch user preferences");
    return res.json();
}

export async function setUserPreference(userId, preferenceId) {
    const res = await fetch(`${API_BASE}/user/${userId}/preferences/${preferenceId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Fail to add preference");
    return res.json();
}

export async function removeUserPreference(userId, preferenceId) {
    const res = await fetch(`${API_BASE}/user/${userId}/preferences/${preferenceId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to remove preference");
    }
    return res.json();
}

export async function getProductsByPreferences(userId) {
    const res = await fetch(`${API_BASE}/user/${userId}/products`);
    if (!res.ok) throw new Error("Fail to fetch products by preferences");
    return res.json();
}