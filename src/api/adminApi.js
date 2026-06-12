import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/admin`;

export async function getUserStats() {
    const res = await fetch(`${API_BASE}/users?count=true`);
    if (!res.ok) throw new Error("Fail to fetch user stats");
    return res.json();
}

export async function getUsersByMonth() {
    const res = await fetch(`${API_BASE}/users?month=true`);
    if (!res.ok) throw new Error("Fail to fetch users by month");
    return res.json();
}

export async function getLastFiveUsers() {
    const res = await fetch(`${API_BASE}/users?limit=5`);
    if (!res.ok) throw new Error("Fail to fetch last five users");
    return res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to delete user");
    }
    return res.json();
}

export async function deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to delete product");
    }
    return res.json();
}

export async function blockUser(id) {
    const res = await fetch(`${API_BASE}/users/${id}/block`, {
        method: "PATCH",
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to block user");
    }
    return res.json();
}

export async function isUserActive(id) {
    const res = await fetch(`${API_BASE}/users/${id}/isActive`);
    if (!res.ok) throw new Error("Fail to fetch user status");
    return res.json();
}

export async function getAdminTasks() {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error("Fail to fetch admin tasks");
    return res.json();
}

export async function getAdminTaskById(taskId) {
    const res = await fetch(`${API_BASE}/tasks/${taskId}`);
    if (!res.ok) throw new Error("Fail to fetch admin task");
    return res.json();
}

export async function createAdminTask(form) {
    const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create task");
    }
    return res.json();
}

export async function updateAdminTask(taskId, task, description, status) {
    const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, description, status }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update task");
    }
    return res.json();
}