const API_BASE = "http://localhost:3001/api/users";

// Create a new user account
export async function createUser(userData) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        let message = "Falha ao criar conta";
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

// Login user with email and password
export async function loginUser(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        let message = "Falha no login";
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

// Get user details by ID
export async function getUserById(userId) {
    const res = await fetch(`${API_BASE}/${userId}`);
    if (!res.ok) {
        let message = "Falha ao obter detalhes do utilizador";
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

// Update user details
export async function updateUser(userId, name, surname, email, password, date_of_birth, role) {
    const res = await fetch(`${API_BASE}/${userId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password, date_of_birth, role }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar informações do utilizador";
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

// Update user password
export async function setNewPassword(userId, currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar password";
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

// Get user collection
export async function getUserCollection(userId) {
    const res = await fetch(`${API_BASE}/${userId}/collection`);
    if (!res.ok) {
        let message = "Falha ao obter coleção do utilizador";
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

// Get the user role
export async function getUserRole(userId) {
    const res = await fetch(`${API_BASE}/${userId}/role`);
    if (!res.ok) {
        let message = "Falha ao obter role do utilizador";
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

export async function forgotPassword(email, newPassword) {
    const res = await fetch(`${API_BASE}/password/forgot`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar password";
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

// Set Last Activity
export async function setLastActivity(userId) {
    const res = await fetch(`${API_BASE}/lastActivity`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar atividade";
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

// Create Address
export async function createAddress(userId, addressData) {
    const res = await fetch(`${API_BASE}/${userId}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
    });

    if (!res.ok) {
        let message = "Falha ao criar morada";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}

// Get User Addresses
export async function getAddresses(userId) {
    const res = await fetch(`${API_BASE}/${userId}/addresses`);

    if (!res.ok) {
        let message = "Falha ao obter moradas";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}

// Set Product In User Collection
export async function setUserCollection(userId, productId, codeId) {
    const res = await fetch(`${API_BASE}/${userId}/setCollectionProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, codeId }),
    });

    if (!res.ok) throw new Error("Falha ao adicionar produto");
    return res.json();
}

export async function deleteAddress(id) {
    try {
        const response = await fetch(`${API_BASE}/addresses/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao apagar address");
        }

        return data;

    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

// Update Address
export async function updateAddress(addressId, street, city, postal_code, district, country) {
    const res = await fetch(`${API_BASE}/addresses/${addressId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street, city, postal_code, district, country }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar informações do address";
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