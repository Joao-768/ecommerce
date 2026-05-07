const API_BASE = "http://localhost:3001/api/preferences";

export async function getPreferences() {
    const res = await fetch(`${API_BASE}/`);
    if (!res.ok) {
        throw new Error("Falha ao obter todas as preferences");
    }
    return res.json();
}

export async function getUserPreferences(userId) {
    if (!userId) {
        throw new Error("UserId em falta");
    }

    const res = await fetch(`${API_BASE}/user/${userId}`);

    if (!res.ok) {
        throw new Error("Falha ao carregar preferences do user");
    }

    return res.json();
}

export async function setUserPreference(userId, preferenceId) {
    const res = await fetch(
        `${API_BASE}/user/${userId}/${preferenceId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }
    );

    if (!res.ok) {
        throw new Error("Falha ao adicionar preference");
    }

    return res.json();
}

export async function removeUserPreference(userId, preferenceId) {
    try {
        const response = await fetch(`${API_BASE}/user/${userId}/${preferenceId}`, {
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