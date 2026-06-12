import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/orders`;

export async function createOrder(userId, total, nif) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, total, nif }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create order");
    }
    return res.json();
}

export async function setOrderItems(orderId, cartItems) {
    const res = await fetch(`${API_BASE}/${orderId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, cartItems }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create order items");
    }
    return res.json();
}

export async function createOrderAddress(orderId, address) {
    const res = await fetch(`${API_BASE}/${orderId}/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
    });
    if (!res.ok) throw new Error("Fail to create order address");
    return res.json();
}

export async function getAllOrders() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Fail to fetch all orders");
    return res.json();
}

export async function getTotalOrders() {
    const res = await fetch(`${API_BASE}?count=true`);
    if (!res.ok) throw new Error("Fail to fetch total orders");
    return res.json();
}

export async function getLastFiveOrders() {
    const res = await fetch(`${API_BASE}?limit=5`);
    if (!res.ok) throw new Error("Fail to fetch last five orders");
    return res.json();
}

export async function getUserOrders(userId) {
    const res = await fetch(`${API_BASE}/user/${userId}`);
    if (!res.ok) throw new Error("Fail to fetch user orders");
    return res.json();
}

export async function getLastOrder(userId) {
    const res = await fetch(`${API_BASE}/user/${userId}?last=true`);
    if (!res.ok) throw new Error("Fail to fetch last order");
    return res.json();
}

export async function getOrderById(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}`);
    if (!res.ok) throw new Error("Fail to fetch order by ID");
    return res.json();
}

export async function getOrderAddress(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}/address`);
    if (!res.ok) throw new Error("Fail to fetch order address");
    return res.json();
}

export async function getUserOrdersItems(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}/items`);
    if (!res.ok) throw new Error("Fail to fetch user orders items");
    return res.json();
}

export async function getTotalItems(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}/items/total`);
    if (!res.ok) throw new Error("Fail to fetch total items in order");
    return res.json();
}

export async function updateOrder(orderId, total_price, status) {
    const res = await fetch(`${API_BASE}/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total_price, status }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update order");
    }
    return res.json();
}

export async function updateOrderAddress(addressId, street, city, postal_code, district, country) {
    const res = await fetch(`${API_BASE}/${addressId}/address`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street, city, postal_code, district, country }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update order address");
    }
    return res.json();
}