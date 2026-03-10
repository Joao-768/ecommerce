const API_BASE = "http://localhost:3001";

export async function getCategories() {
    const res = await fetch(`${API_BASE}/api/categories`);
    if (!res.ok) throw new Error("Falha ao buscar categorias");
    return res.json();
}

export async function getCategoriesById(id) {
    const categories = await getCategories();
    const item = categories.find((c) => String(c.id) === String(id));
    return item?.name ?? null;
}