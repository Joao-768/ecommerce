import api from "./axios.js";

export async function checkout({ userId, nif, address, cartItems, card }) {
    try {
        const res = await api.post("/orders/checkout", { userId, nif, address, cartItems, card });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to checkout");
    }
}

export async function createOrder(userId, total, nif) {
    try {
        const res = await api.post("/orders", { userId, total, nif });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to create order");
    }
}

export async function setOrderItems(orderId, cartItems) {
    try {
        const res = await api.post(`/orders/${orderId}/items`, { orderId, cartItems });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to create order items");
    }
}

export async function createOrderAddress(orderId, address) {
    try {
        const res = await api.post(`/orders/${orderId}/address`, { address });
        return res.data;
    } catch {
        throw new Error("Fail to create order address");
    }
}

export async function getAllOrders() {
    try {
        const res = await api.get("/orders");
        return res.data;
    } catch {
        throw new Error("Fail to fetch all orders");
    }
}

export async function getTotalOrders() {
    try {
        const res = await api.get("/orders", { params: { count: true } });
        return res.data;
    } catch {
        throw new Error("Fail to fetch total orders");
    }
}

export async function getLastFiveOrders() {
    try {
        const res = await api.get("/orders", { params: { limit: 5 } });
        return res.data;
    } catch {
        throw new Error("Fail to fetch last five orders");
    }
}

export async function getUserOrders(userId) {
    try {
        const res = await api.get(`/orders/user/${userId}`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch user orders");
    }
}

export async function getLastOrder(userId) {
    try {
        const res = await api.get(`/orders/user/${userId}`, { params: { last: true } });
        return res.data;
    } catch {
        throw new Error("Fail to fetch last order");
    }
}

export async function getOrderById(orderId) {
    try {
        const res = await api.get(`/orders/${orderId}`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch order by ID");
    }
}

export async function getOrderAddress(orderId) {
    try {
        const res = await api.get(`/orders/${orderId}/address`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch order address");
    }
}

export async function getUserOrdersItems(orderId) {
    try {
        const res = await api.get(`/orders/${orderId}/items`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch user orders items");
    }
}

export async function getTotalItems(orderId) {
    try {
        const res = await api.get(`/orders/${orderId}/items/total`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch total items in order");
    }
}

export async function updateOrder(orderId, total_price, status) {
    try {
        const res = await api.put(`/orders/${orderId}`, { total_price, status });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update order");
    }
}

export async function updateOrderAddress(addressId, street, city, postal_code, district, country) {
    try {
        const res = await api.put(`/orders/${addressId}/address`, { street, city, postal_code, district, country });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update order address");
    }
}
