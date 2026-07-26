import api from "./axios.js";

export async function setCartItem(userId, productId, size) {
    try {
        const res = await api.post("/cart", { userId, productId, size });
        return res.data;
    } catch {
        throw new Error("Fail to add item to cart");
    }
}

export async function ajustCartItemQuantity(userId, productId, quantity, type, size) {
    try {
        const res = await api.put(`/cart/${userId}/${productId}`, { quantity, type, size });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update cart item");
    }
}

export async function getCartItems(userId) {
    try {
        const res = await api.get(`/cart/${userId}`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch cart");
    }
}

export async function isInCart(userId, productId, size) {
    try {
        const res = await api.get(`/cart/${userId}/${productId}/${size}`);
        return res.data;
    } catch {
        throw new Error("Fail to check cart item");
    }
}

export async function removeCartItem(userId, productId, size) {
    try {
        const res = await api.delete(`/cart/${userId}/${productId}/${size}`);
        return res.data;
    } catch {
        throw new Error("Fail to remove cart item");
    }
}

export async function clearCart(userId) {
    try {
        const res = await api.delete(`/cart/${userId}`);
        return res.data;
    } catch {
        throw new Error("Fail to remove cart items");
    }
}
