const API_BASE = "http://localhost:3001/api/orders";

export async function createOrder(userId, userName, userSurname, total) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId, userName, userSurname, total}),
    });

    if (!res.ok) {
        let message = "Falha ao criar Order";
        const data = await res.json().catch(() => ({}));
        if (data.error) message = data.error;
        throw new Error(message);
    }

    return res.json();
}

export async function setOrderItems(orderId, cartItems) {
    const res = await fetch(`${API_BASE}/orderItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, cartItems }),
    });

    if (!res.ok) {
        let message = "Falha ao criar Order Items";
        const data = await res.json().catch(() => ({}));
        if (data.error) message = data.error;
        throw new Error(message);
    }

    return res.json();
}

export async function getUserOrders(userId) {
    const res = await fetch(`${API_BASE}/${userId}/orders`);

    if (!res.ok) throw new Error("Falha ao receber as orders do utilizador");
    return res.json();
}

export async function getUserOrdersItems(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}/items`);

    if (!res.ok) throw new Error("Falha ao receber os itens da order");
    return res.json();
}

export async function getLastOrder(userId) {
    const res = await fetch(`${API_BASE}/${userId}/lastOrder`);

    if (!res.ok) throw new Error("Falha ao receber a ultima order do utilizador");
    return res.json();
}

export async function getTotalItems(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}/totalItems`);

    if (!res.ok) throw new Error("Falha ao receber o total de items");
    return res.json();
}

export async function getAllOrders() {
    const res = await fetch(`${API_BASE}/allOrders`);
    if (!res.ok) throw new Error("Falha ao receber todas as orders");
    return res.json();
}

export async function getLastFiveOrders() {
    const res = await fetch(`${API_BASE}/lastFive`);
    if (!res.ok) throw new Error("Falha ao receber as ultimas 5 orders");
    return res.json();
}

// Update Order
export async function updateOrder(orderId, name, surname, total_price, status, collection) {
    const res = await fetch(`${API_BASE}/${orderId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, total_price, status, collection }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar informações da order";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // Ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}

export async function getOrderById(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}`);
    if (!res.ok) throw new Error("Falha ao a order");
    return res.json();
}

export async function getOrderAddress(orderId) {
    const res = await fetch(`${API_BASE}/${orderId}/address`);
    if (!res.ok) throw new Error("Falha ao receber o address da order");
    return res.json();
}

// Update Order
export async function updateOrderAddress(addressId, street, city, postal_code, district, country) {
    const res = await fetch(`${API_BASE}/${addressId}/updateAddress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street, city, postal_code, district, country }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar order address";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // Ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}