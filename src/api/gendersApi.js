import { API_URL } from "./config.js";

const API_BASE = `${API_URL}/genders`;

// Get All Genders
export async function getGenders() {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Fail to fetch genders");
    return res.json();
}

// Get Products By Gender
export async function getProductsByGender(genderId) {
    const res = await fetch(`${API_BASE}/${genderId}/products`);
    if (!res.ok) throw new Error("Fail to fetch products by gender");
    return res.json();
}

// Get Genders by ID
export async function getGenderById(genderId) {
    const res = await fetch(`${API_BASE}/${genderId}`);
    if (!res.ok) throw new Error("Fail to fetch gender by ID");
    return res.json();
}