const API_BASE = "http://localhost:3001/api/collections";

// Create New Collection
export async function createCollection(collectionData) {
    const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectionData),
    });

    if (!res.ok) {
        let message = "Falha ao criar collection";
        const data = await res.json().catch(() => ({}));
        if (data.error) message = data.error;
        throw new Error(message);
    }

    return res.json();
}

// Get All Collections
export async function getCollections() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Falha ao buscar collections");
    return res.json();
}

// Get Collection By ID
export async function getCollectionsById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error("Falha ao buscar coleção");
    return res.json();
}

// Get Products By Collection Id
export async function getProductsByCollection(collectionId) {
    const res = await fetch(`${API_BASE}/${collectionId}/products`);
    if (!res.ok) throw new Error("Falha ao buscar produtos da coleção");
    return res.json();
}

export async function deleteCollection(id) {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao apagar collection");
        }

        return data;

    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

// Update Product Details
export async function updateCollection(productId, name, description) {
    const res = await fetch(`${API_BASE}/${productId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar informações da collection";
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