import api from "./axios.js";

export async function setWishlistItem(userId, productId) {
    try {
        const res = await api.post("/wishlist", { userId, productId });
        return res.data;
    } catch {
        throw new Error("Fail to add item to wishlist");
    }
}

export async function isInWishlist(userId, productId) {
    try {
        const res = await api.get(`/wishlist/${userId}/${productId}`);
        return res.data;
    } catch {
        throw new Error("Fail to check wishlist item");
    }
}

export async function removeWishlistItem(userId, productId) {
    try {
        const res = await api.delete(`/wishlist/${userId}/${productId}`);
        return res.data;
    } catch {
        throw new Error("Failed to remove wishlist item");
    }
}

export async function getWishlistItems(userId) {
    try {
        const res = await api.get(`/wishlist/${userId}`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch wishlist items");
    }
}
