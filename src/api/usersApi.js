import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/users`;

export async function createUser(userData) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create user");
    }
    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to login");
    }
    return res.json();
}

export async function getAllUsers() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Fail to fetch all users");
    return res.json();
}

export async function getUserById(userId) {
    const res = await fetch(`${API_BASE}/${userId}`);
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to fetch user details");
    }
    return res.json();
}

export async function updateUser(userId, name, surname, email, password, date_of_birth, role) {
    const res = await fetch(`${API_BASE}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password, date_of_birth, role }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update user information");
    }
    return res.json();
}

export async function setNewPassword(userId, currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update password");
    }
    return res.json();
}

export async function forgotPassword(email, newPassword) {
    const res = await fetch(`${API_BASE}/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update password");
    }
    return res.json();
}

export async function setLastActivity(userId) {
    const res = await fetch(`${API_BASE}/lastActivity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update last activity");
    }
    return res.json();
}

export async function getUserRole(userId) {
    const res = await fetch(`${API_BASE}/${userId}/role`);
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to fetch user role");
    }
    return res.json();
}

export async function createAddress(userId, form) {
    const res = await fetch(`${API_BASE}/${userId}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create address");
    }
    return res.json();
}

export async function getAddresses(userId) {
    const res = await fetch(`${API_BASE}/${userId}/addresses`);
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to fetch addresses");
    }
    return res.json();
}

export async function deleteAddress(id) {
    const res = await fetch(`${API_BASE}/addresses/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to delete address");
    }
    return res.json();
}

export async function updateAddress(addressId, street, city, postal_code, district, country) {
    const res = await fetch(`${API_BASE}/addresses/${addressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street, city, postal_code, district, country }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update address");
    }
    return res.json();
}

export async function getUserCollection(userId) {
    const res = await fetch(`${API_BASE}/${userId}/collection`);
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to fetch user collection");
    }
    return res.json();
}

export async function setCollectionProduct(userId, productId) {
    const res = await fetch(`${API_BASE}/${userId}/collection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
    });
    if (!res.ok) throw new Error("Fail to add product to collection");
    return res.json();
}

export async function removeCollectionProduct(userId, productId) {
    const res = await fetch(`${API_BASE}/${userId}/collection/${productId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to remove product from collection");
    }
    return res.json();
}

export async function setNif(userId, nif) {
    const res = await fetch(`${API_BASE}/${userId}/nif`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nif }),
    });
    if (!res.ok) throw new Error("Fail to save NIF");
    return res.json();
}

export async function verifyNif(userId, nif) {
    const res = await fetch(`${API_BASE}/${userId}/nif/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nif }),
    });
    if (!res.ok) throw new Error("Fail to verify NIF");
    return res.json();
}

export async function getPaymentMethod(userId) {
    const res = await fetch(`${API_BASE}/${userId}/payment-method`);
    if (!res.ok) return null;
    return res.json();
}

export async function setPaymentMethod(userId, cardNumber, expiry) {
    const maskedCard = cardNumber.slice(-4);
    const res = await fetch(`${API_BASE}/${userId}/payment-method`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ card_number: maskedCard, expiry }),
    });
    if (!res.ok) throw new Error("Fail to save payment method");
    return res.json();
}
