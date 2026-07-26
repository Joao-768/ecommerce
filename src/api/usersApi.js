import api from "./axios.js";

export async function createUser(userData) {
    try {
        const res = await api.post("/users", userData);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to create user");
    }
}

export async function createUserAsAdmin(userData) {
    try {
        const res = await api.post("/users/admin-create", userData);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to create user");
    }
}

export async function verifyEmail(email, code) {
    try {
        const res = await api.post("/users/verify-email", { email, code });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to verify email");
    }
}

export async function resendVerificationEmail(email) {
    try {
        const res = await api.post("/users/verify-email/resend", { email });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to resend verification email");
    }
}

export async function loginUser(email, password) {
    try {
        const res = await api.post("/users/login", { email, password });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to login");
    }
}

export async function getAllUsers() {
    try {
        const res = await api.get("/users");
        return res.data;
    } catch {
        throw new Error("Fail to fetch all users");
    }
}

export async function getCurrentUser() {
    try {
        const res = await api.get("/users/me");
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to fetch current user");
    }
}

export async function getUserById(userId) {
    try {
        const res = await api.get(`/users/${userId}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to fetch user details");
    }
}

export async function updateUser(userId, name, surname, email, password, date_of_birth, role) {
    try {
        const res = await api.put(`/users/${userId}`, { name, surname, email, password, date_of_birth, role });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update user information");
    }
}

export async function setNewPassword(userId, currentPassword, newPassword) {
    try {
        const res = await api.put(`/users/${userId}/password`, { userId, currentPassword, newPassword });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update password");
    }
}

export async function forgotPassword(email) {
    try {
        const res = await api.post("/users/password/forgot", { email });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to request password reset");
    }
}

export async function resetPassword(email, code, newPassword) {
    try {
        const res = await api.post("/users/password/reset", { email, code, newPassword });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to reset password");
    }
}

export async function setLastActivity(userId) {
    try {
        const res = await api.patch("/users/lastActivity", { userId });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update last activity");
    }
}

export async function getUserRole(userId) {
    try {
        const res = await api.get(`/users/${userId}/role`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to fetch user role");
    }
}

export async function createAddress(userId, form) {
    try {
        const res = await api.post(`/users/${userId}/addresses`, form);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to create address");
    }
}

export async function getAddresses(userId) {
    try {
        const res = await api.get(`/users/${userId}/addresses`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to fetch addresses");
    }
}

export async function deleteAddress(id) {
    try {
        const res = await api.delete(`/users/addresses/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to delete address");
    }
}

export async function updateAddress(addressId, street, city, postal_code, district, country) {
    try {
        const res = await api.put(`/users/addresses/${addressId}`, { street, city, postal_code, district, country });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update address");
    }
}

export async function getUserCollection(userId) {
    try {
        const res = await api.get(`/users/${userId}/collection`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to fetch user collection");
    }
}

export async function setCollectionProduct(userId, productId) {
    try {
        const res = await api.post(`/users/${userId}/collection`, { productId });
        return res.data;
    } catch {
        throw new Error("Fail to add product to collection");
    }
}

export async function removeCollectionProduct(userId, productId) {
    try {
        const res = await api.delete(`/users/${userId}/collection/${productId}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to remove product from collection");
    }
}

export async function setNif(userId, nif) {
    try {
        const res = await api.put(`/users/${userId}/nif`, { nif });
        return res.data;
    } catch {
        throw new Error("Fail to save NIF");
    }
}

export async function verifyNif(userId, nif) {
    try {
        const res = await api.post(`/users/${userId}/nif/verify`, { nif });
        return res.data;
    } catch {
        throw new Error("Fail to verify NIF");
    }
}

export async function getPaymentMethod(userId) {
    try {
        const res = await api.get(`/users/${userId}/payment-method`);
        return res.data;
    } catch {
        return null;
    }
}

export async function setPaymentMethod(userId, cardNumber, expiry) {
    try {
        const maskedCard = cardNumber.slice(-4);
        const res = await api.post(`/users/${userId}/payment-method`, { card_number: maskedCard, expiry });
        return res.data;
    } catch {
        throw new Error("Fail to save payment method");
    }
}
