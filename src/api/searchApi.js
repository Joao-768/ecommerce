const API_BASE = "http://localhost:3001";

// Search for products by search
export async function searchProducts(search) {
    const res = await fetch(
        `${API_BASE}/api/search/products?search=${encodeURIComponent(search)}`
    );
    if (!res.ok) throw new Error("Falha ao buscar produtos");
    return res.json();
}

// Set search count for analytics
export async function setSearchCount(search) {
    const res = await fetch(`${API_BASE}/api/search/count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search }),
    });
    if (!res.ok) throw new Error("Falha ao atualizar contagem de busca");
    return res.json();
}