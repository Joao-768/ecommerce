import { generateCollectionSlug } from "../../api/src/utils/collectionsUtils";
import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/products`;

export async function createProduct(productData) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create product");
    }
    return res.json();
}

export async function getProducts() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Fail to fetch all products");
    return res.json();
}

export async function getProductById(id, lang = 'en') {
    if (!id) return { product: null, error: "ID do relógio em falta" };
    const res = await fetch(`${API_BASE}/${id}?lang=${lang}`);
    if (res.status === 404) return { product: null, error: "Product not found" };
    if (!res.ok) return { product: null, error: "Fail to fetch product by ID" };
    const product = await res.json();
    return { product, error: null };
}

export async function updateProduct(productId, name, price, stock, category, collection, gender) {
    const res = await fetch(`${API_BASE}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock, category, collection, gender }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to update product");
    }
    return res.json();
}

export async function setCode(id, code) {
    const res = await fetch(`${API_BASE}/${id}/code`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to create code");
    }
    return res.json();
}

export async function adjustStock(productId, amount, type) {
    const res = await fetch(`${API_BASE}/${productId}/stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, type }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Fail to adjust product stock");
    }
    return res.json();
}

export async function getPopularProducts() {
    const res = await fetch(`${API_BASE}?sort=popular`);
    if (!res.ok) throw new Error("Fail to fetch popular products");
    return res.json();
}

export async function getNewProducts() {
    const res = await fetch(`${API_BASE}?sort=new`);
    if (!res.ok) throw new Error("Fail to fetch new products");
    return res.json();
}

export async function getBestSellers(quantity) {
    const res = await fetch(`${API_BASE}?sort=bestsellers&limit=${quantity}`);
    if (!res.ok) throw new Error("Fail to fetch best sellers");
    return res.json();
}

export async function getLastFiveProducts() {
    const res = await fetch(`${API_BASE}?sort=new&limit=5`);
    if (!res.ok) throw new Error("Fail to fetch last five products");
    return res.json();
}

export async function getLowStock() {
    const res = await fetch(`${API_BASE}?stock=low`);
    if (!res.ok) throw new Error("Fail to fetch low stock products");
    return res.json();
}

export async function getTotalProducts() {
    const res = await fetch(`${API_BASE}?count=true`);
    if (!res.ok) throw new Error("Fail to fetch total products");
    return res.json();
}

export async function getInStock() {
    const res = await fetch(`${API_BASE}?count=true`);
    if (!res.ok) throw new Error("Fail to fetch products in stock");
    const data = await res.json();
    return { inStock: data.inStock };
}

export async function getOutOfStock() {
    const res = await fetch(`${API_BASE}?count=true`);
    if (!res.ok) throw new Error("Fail to fetch products out of stock");
    const data = await res.json();
    return { outOfStock: data.outOfStock };
}

export async function getTotalProductByCollection() {
    const res = await fetch(`${API_BASE}/collections`);
    if (!res.ok) throw new Error("Fail to fetch total products by collection");
    return res.json();
}

export async function getCodes() {
    const res = await fetch(`${API_BASE}/codes`);
    if (!res.ok) throw new Error("Fail to fetch codes");
    return res.json();
}

export async function getProductSizes(productId) {
    const res = await fetch(`${API_BASE}/${productId}/sizes`);
    if (!res.ok) throw new Error("Fail to fetch product sizes");
    return res.json();
}

export async function setProductSize(productId, size) {
    const res = await fetch(`${API_BASE}/${productId}/sizes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size }),
    });
    if (!res.ok) throw new Error("Fail to set product size");
    return res.json();
}

export async function uploadImage(file, collectionName, productName) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: {
            "collectionname": generateCollectionSlug(collectionName),
            "filename": `${productName}.png`,
        },
        body: formData,
    });
    if (!res.ok) throw new Error("Fail to upload image");
    return res.json();
}
