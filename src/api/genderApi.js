const API_BASE = "http://localhost:3001";

export async function getGenders() {
    const res = await fetch(`${API_BASE}/api/genders`);
    if (!res.ok) throw new Error("Falha ao buscar gêneros");
    return res.json();
}

export async function getGenderById(id) {
    const genders = await getGenders();
    const item = genders.find((g) => String(g.id) === String(id));
    return item?.name ?? null;
}

export async function getProductsByGender(genderId) {
    const res = await fetch(`${API_BASE}/api/genders/${genderId}/products`);
    if (!res.ok) throw new Error("Falha ao buscar produtos do gênero");
    return res.json();
}
