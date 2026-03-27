const API_BASE = "http://localhost:3001";

export async function getCollections() {
    const res = await fetch(`${API_BASE}/api/collections`);
    if (!res.ok) throw new Error("Falha ao buscar collections");
    return res.json();
}

export async function getCollectionsById(id) {
    const res = await fetch(`${API_BASE}/api/collections/${id}`);
    if (!res.ok) throw new Error("Falha ao buscar coleção");
    return res.json();
}

export async function getProductsByCollection(collectionId) {
    const res = await fetch(`${API_BASE}/api/collections/${collectionId}/products`);
    if (!res.ok) throw new Error("Falha ao buscar produtos da coleção");
    return res.json();
}

export async function getSeasonalProducts(season) {
    const collections = await getCollections();
    const seasonKey = String(season ?? "").toLowerCase();
    const collection = collections.find((c) => {
        const name = String(c?.name ?? "").toLowerCase();
        return name === seasonKey || name.includes(seasonKey);
    });

    if (!collection?.id) return [];
    return getProductsByCollection(collection.id);
}
