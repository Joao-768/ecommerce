import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/collections`;

export async function createCollection(collectionData) {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectionData),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create collection");
    }
    return res.json();
}

export async function getCollections() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Fail to fetch collections");
    return res.json();
}

export async function getCollectionsById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error("Fail to fetch collection");
    return res.json();
}

export async function getProductsByCollection(collectionId) {
    const res = await fetch(`${API_BASE}/${collectionId}/products`);
    if (!res.ok) throw new Error("Fail to fetch products by collection");
    return res.json();
}

export async function updateCollection(collectionId, name, description) {
    const res = await fetch(`${API_BASE}/${collectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update collection");
    }
    return res.json();
}

export async function deleteCollection(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to delete collection");
    }
    return res.json();
}

export async function getTotalCollections() {
    const res = await fetch(`${API_BASE}/total`);
    if (!res.ok) throw new Error("Fail to fetch total collections");
    return res.json();
}