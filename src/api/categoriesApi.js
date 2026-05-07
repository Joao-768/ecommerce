const API_BASE = "http://localhost:3001";

// Fetch all categories
export async function getCategories() {
    const res = await fetch(`${API_BASE}/api/categories`);
    if (!res.ok) throw new Error("Falha ao buscar categorias");
    return res.json();
}

// Fetch a single category by ID
export async function getCategoriesById(id) {
    const categories = await getCategories();
    const item = categories.find((c) => String(c.id) === String(id));
    return item ?? null;
}

// Fetch products for a specific category
export async function getProductsByCategory(categoryId) {
    const res = await fetch(`${API_BASE}/api/categories/${categoryId}/products`);
    if (!res.ok) throw new Error("Falha ao buscar produtos da categoria");
    return res.json();
}
