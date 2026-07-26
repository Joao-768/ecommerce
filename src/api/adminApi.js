import api from "./axios.js";

export async function getUserStats() {
    try {
        const res = await api.get("/admin/users", { params: { count: true } });
        return res.data;
    } catch {
        throw new Error("Fail to fetch user stats");
    }
}

export async function getUsersByMonth() {
    try {
        const res = await api.get("/admin/users", { params: { month: true } });
        return res.data;
    } catch {
        throw new Error("Fail to fetch users by month");
    }
}

export async function getLastFiveUsers() {
    try {
        const res = await api.get("/admin/users", { params: { limit: 5 } });
        return res.data;
    } catch {
        throw new Error("Fail to fetch last five users");
    }
}

export async function deleteUser(id) {
    try {
        const res = await api.delete(`/admin/users/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to delete user");
    }
}

export async function deleteProduct(id) {
    try {
        const res = await api.delete(`/admin/products/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to delete product");
    }
}

export async function blockUser(id) {
    try {
        const res = await api.patch(`/admin/users/${id}/block`);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to block user");
    }
}

export async function isUserActive(id) {
    try {
        const res = await api.get(`/admin/users/${id}/isActive`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch user status");
    }
}

export async function getAdminTasks() {
    try {
        const res = await api.get("/admin/tasks");
        return res.data;
    } catch {
        throw new Error("Fail to fetch admin tasks");
    }
}

export async function getAdminTaskById(taskId) {
    try {
        const res = await api.get(`/admin/tasks/${taskId}`);
        return res.data;
    } catch {
        throw new Error("Fail to fetch admin task");
    }
}

export async function createAdminTask(form) {
    try {
        const res = await api.post("/admin/tasks", form);
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to create task");
    }
}

export async function updateAdminTask(taskId, task, description, status) {
    try {
        const res = await api.put(`/admin/tasks/${taskId}`, { task, description, status });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.error || "Fail to update task");
    }
}
