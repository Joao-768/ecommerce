const API_BASE = "http://localhost:3001/api/genders";

// Get All Genders
export async function getGenders() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Falha ao buscar genders");
    return res.json();
}

// Get Products By Gender
export async function getProductsByGender(genderId) {
    const res = await fetch(`${API_BASE}/${genderId}/products`);
    if (!res.ok) throw new Error("Falha ao buscar produtos do gênero");
    return res.json();
}

// Get Genders by ID
export async function getGendersById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error("Falha ao buscar gêneros");
    return res.json();
}