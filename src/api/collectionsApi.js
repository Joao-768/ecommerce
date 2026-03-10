const API_BASE = "http://localhost:3001";

export async function getCollections() {
    const res = await fetch(`${API_BASE}/api/collections`);
    if (!res.ok) throw new Error("Falha ao buscar collections");
    return res.json();
}

export async function getCollectionsById(id) {
    const collections = await getCollections();
    const item = collections.find((c) => String(c.id) === String(id));
    return item?.name ?? null;
}