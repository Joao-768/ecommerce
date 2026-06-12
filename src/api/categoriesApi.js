import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/categories`;

// Fetch all categories
export async function getCategories() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Fail to fetch categories");
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
    const res = await fetch(`${API_BASE}/${categoryId}/products`);
    if (!res.ok) throw new Error("Fail to fetch products by category");
    return res.json();
}

export async function getTotalCategories() {
    const res = await fetch(`${API_BASE}/total`);
    if (!res.ok) {
        throw new Error("Fail to fetch total categories");
    }
    return res.json();
}
