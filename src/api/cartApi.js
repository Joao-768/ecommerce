import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/cart`;

export async function setCartItem(userId, productId, size) {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, size }),
    });
    if (!res.ok) throw new Error("Fail to add item to cart");
    return res.json();
}

export async function ajustCartItemQuantity(userId, productId, quantity, type, size) {
    const res = await fetch(`${API_BASE}/${userId}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, type, size }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update cart item");
    }
    return res.json();
}

export async function getCartItems(userId) {
    const res = await fetch(`${API_BASE}/${userId}`);
    if (!res.ok) throw new Error("Fail to fetch cart");
    return res.json();
}

export async function isInCart(userId, productId, size) {
    const res = await fetch(`${API_BASE}/${userId}/${productId}/${size}`);
    if (!res.ok) throw new Error("Fail to check cart item");
    return res.json();
}

export async function removeCartItem(userId, productId, size) {
    const res = await fetch(`${API_BASE}/${userId}/${productId}/${size}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Fail to remove cart item");
    return res.json();
}

export async function clearCart(userId) {
    const res = await fetch(`${API_BASE}/${userId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Fail to remove cart items");
    return res.json();
}