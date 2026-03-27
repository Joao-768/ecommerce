const API_BASE = "http://localhost:3001";

export async function getCategories() {
    const res = await fetch(`${API_BASE}/api/users`);
    if (!res.ok) throw new Error("Falha ao buscar utilizadores");
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_BASE}/api/users`);
    if (!res.ok) throw new Error("Falha ao buscar utilizadores");
    return res.json();
}

export async function getUsersById(id) {
    const users = await getUsers();
    const item = users.find((c) => String(c.id) === String(id));
    return item?.name ?? null;
}

export async function createUser(userData) {
    const res = await fetch(`${API_BASE}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create user");
    }

    return res.json();
}

export async function loginUser(credentials) {
    const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to login");
    }

    return res.json();
}

export async function getUserProfile(token) {
    const res = await fetch(`${API_BASE}/api/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch user profile");
    }

    return res.json();
}