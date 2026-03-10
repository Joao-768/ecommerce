const API_BASE = "http://localhost:3001";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error("Falha ao buscar produtos");
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Falha ao buscar produto");
  return res.json();
}