import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/wishlist`;

export async function setWishlistItem(userId, productId) {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
    });

    if (!res.ok) throw new Error("Fail to add item to wishlist");
    return res.json();
}

export async function isInWishlist(userId, productId) {
    const res = await fetch(`${API_BASE}/${userId}/${productId}`);
    if (!res.ok) throw new Error("Fail to check wishlist item");
    return res.json();
}

export async function removeWishlistItem(userId, productId) {
    const res = await fetch(
        `${API_BASE}/${userId}/${productId}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) throw new Error("Failed to remove wishlist item");

    return res.json();
}

export async function getWishlistItems(userId) {
    const res = await fetch(`${API_BASE}/${userId}`);
    if (!res.ok) throw new Error("Fail to fetch wishlist items");
    return res.json();
}