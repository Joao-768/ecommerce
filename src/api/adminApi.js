const API_BASE = "http://localhost:3001/api/admin";

export async function getTotalUsers() {
    const res = await fetch(`${API_BASE}/totalUsers`);
    if (!res.ok) {
        throw new Error("Falha ao obter total de utilizadores");
    }
    return res.json();
}

export async function getTotalAdmins() {
    const res = await fetch(`${API_BASE}/totalAdmins`);
    if (!res.ok) {
        throw new Error("Falha ao obter total de administradores");
    }
    return res.json();
}

export async function getNewUsers() {
    const res = await fetch(`${API_BASE}/newUsers`);
    if (!res.ok) {
        throw new Error("Falha ao obter novos utilizadores");
    }
    return res.json();
}

export async function getTotalProducts() {
    const res = await fetch(`${API_BASE}/totalProducts`);
    if (!res.ok) {
        throw new Error("Falha ao obter total de produtos");
    }
    return res.json();
}

export async function getInStockProducts() {
    const res = await fetch(`${API_BASE}/inStock`);
    if (!res.ok) {
        throw new Error("Falha ao obter produtos em stock");
    }
    return res.json();
}

export async function getOutOfStock() {
    const res = await fetch(`${API_BASE}/outOfStock`);
    if (!res.ok) {
        throw new Error("Falha ao obter produtos sem stock");
    }
    return res.json();
}

export async function getTotalCategories() {
    const res = await fetch(`${API_BASE}/totalCategories`);
    if (!res.ok) {
        throw new Error("Falha ao obter total de categorias");
    }
    return res.json();
}

export async function getTotalCollections() {
    const res = await fetch(`${API_BASE}/totalCollections`);
    if (!res.ok) {
        throw new Error("Falha ao obter total de colecoes");
    }
    return res.json();
}

export async function getUsersByMonth() {
    const res = await fetch(`${API_BASE}/usersByMonth`);
    if (!res.ok) {
        throw new Error("Falha ao obter utilizadores por mês");
    }
    return res.json();
}

export async function getTotalOrders() {
    const res = await fetch(`${API_BASE}/totalOrders`);
    if (!res.ok) {
        throw new Error("Falha ao obter total de encomendas");
    }
    return res.json();
}

export async function getLastFiveUsers() {
    const res = await fetch(`${API_BASE}/lastFiveUsers`);
    if (!res.ok)throw new Error("Falha ao obter novos utilizadores")
    return res.json();
}

// Get Last Active Users
export async function getLastActiveUsers() {
    const res = await fetch(`${API_BASE}/lastActiveUsers`);
    if (!res.ok) {
        let message = "Falha ao obter ultimos utilizadores ativos";
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

export async function getAllUsers() {
    const res = await fetch(`${API_BASE}/allUsers`);
    if (!res.ok) {
        throw new Error("Falha ao obter todos os utilizadores");
    }
    return res.json();
}

export async function getBlockedUsers() {
    const res = await fetch(`${API_BASE}/blockedUsers`);
    if (!res.ok) {
        throw new Error("Falha ao obter todos os utilizadores bloqueados");
    }
    return res.json();
}

export async function deleteUser(id) {
    try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao apagar user");
        }

        return data;

    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function getAllProducts() {
    const res = await fetch(`${API_BASE}/allProducts`);
    if (!res.ok) {
        throw new Error("Falha ao obter todos os produtos");
    }
    return res.json();
}

export async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao apagar product");
        }

        return data;

    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function blockUser(id) {
    try {
        const response = await fetch(`${API_BASE}/users/${id}/block`, {
            method: "POST"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao atualizar status do user");
        }

        return data;

    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

export async function isUserActive(id) {
    const res = await fetch(`${API_BASE}/users/${id}/isActive`);
    if (!res.ok) {
        throw new Error("Falha ao receber status do user");
    }
    return res.json();
}

export async function getAdminTasks() {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) {
        throw new Error("Falha ao receber tasks do admin");
    }
    return res.json();
}

export async function getAdminTaskById(taskId) {
    const res = await fetch(`${API_BASE}/${taskId}/task`);
    if (!res.ok) {
        throw new Error("Falha ao receber info da task");
    }
    return res.json();
}

export async function createAdminTask(form) {
    const res = await fetch(`${API_BASE}/createTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    if (!res.ok) {
        let message = "Falha ao criar Admin Task";
        const data = await res.json().catch(() => ({}));
        if (data.error) message = data.error;
        throw new Error(message);
    }

    return res.json();
}

export async function updateAdminTask(form) {
    const res = await fetch(`${API_BASE}/${form.id}/updateTask`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar informações da task";
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