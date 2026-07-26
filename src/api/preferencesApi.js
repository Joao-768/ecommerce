import api from "./axios.js";

export async function getPreferences() {
    try {
        const res = await api.get("/preferences");
        return res.data;
    } catch {
        throw new Error("Fail to fetch all preferences");
    }
}

export async function getUserPreferences(userId) {
    if (!userId) throw new Error("UserId em falta");
    try {
        const res = await api.get(`/preferences/user/${userId}`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch user preferences");
    }
}

export async function setUserPreference(userId, preferenceId) {
    try {
        const res = await api.post(`/preferences/user/${userId}/preferences/${preferenceId}`);
        return res.data;
    } catch {
        throw new Error("Fail to add preference");
    }
}

export async function removeUserPreference(userId, preferenceId) {
    try {
        const res = await api.delete(`/preferences/user/${userId}/preferences/${preferenceId}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to remove preference");
    }
}

export async function getProductsByPreferences(userId) {
    try {
        const res = await api.get(`/preferences/user/${userId}/products`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch products by preferences");
    }
}
