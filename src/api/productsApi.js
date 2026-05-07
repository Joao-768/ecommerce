const API_BASE = "http://localhost:3001/api/products";

// Create a new user account
export async function createProduct(productData) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });

    if (!res.ok) {
        let message = "Falha ao criar produto";
        const data = await res.json().catch(() => ({}));
        if (data.error) message = data.error;
        throw new Error(message);
    }

    return res.json();
}

export async function getProducts() {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) {
        throw new Error("Falha ao obter todos os produtos");
    }
    return res.json();
}

// Fetch product by ID
export async function getProductById(id) {
    if (!id) {
        return { product: null, error: "ID do relógio em falta" };
    }
    const res = await fetch(`${API_BASE}/${id}`);
    if (res.status === 404) {
        return { product: null, error: "Relógio nao encontrado" };
    }
    if (!res.ok) {
        return { product: null, error: "Falha ao carregar relógio" };
    }
    const product = await res.json();
    return { product, error: null };
}

// Increase the search count
export async function incrementSearchCount(id) {
    const res = await fetch(`${API_BASE}/${id}/search`, {
        method: "POST",
    });

    if (!res.ok) throw new Error("Falha ao atualizar contador");
    return res.json();
}

// set wishlist item
export async function setWishslistItem(userId, productId) {
    const res = await fetch(`${API_BASE}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
    });

    if (!res.ok) throw new Error("Falha ao adicionar à wishlist");
    return res.json();
}

// Get wishlist items for a user
export async function getWishlistItems(userId) {
    const res = await fetch(`${API_BASE}/wishlist/${userId}`);
    if (!res.ok) throw new Error("Falha ao buscar wishlist");
    return res.json();
}

// set cart item
export async function setCartItem(userId, productId) {
    const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
    });

    if (!res.ok) throw new Error("Falha ao adicionar à cart");
    return res.json();
}

// Get cart items for a user
export async function getCartItems(userId) {
    const res = await fetch(`${API_BASE}/cart/${userId}`);
    if (!res.ok) throw new Error("Falha ao buscar cart");
    return res.json();
}

// Get cart items for a user
export async function isInCart(userId, productId) {
    const res = await fetch(`${API_BASE}/cart/${userId}/${productId}`);
    if (!res.ok) throw new Error("Falha ao verificar carrinho");
    return res.json();
}

export async function getPopularProducts() {
    const res = await fetch(`${API_BASE}/popularProducts`);
    if (!res.ok) throw new Error("Falha ao carregar relógios populares");
    return res.json();
}

export async function getTotalProductByCollection() {
    const res = await fetch(`${API_BASE}/collections`);
    if (!res.ok) throw new Error("Falha ao carregar total de produtos por categoria");
    return res.json();
}

export async function getNewProducts() {
    const res = await fetch(`${API_BASE}/new`);
    if (!res.ok) {
        throw new Error("Falha ao obter novos produtos");
    }
    return res.json();
}

export async function removeCartItem(userId, productId) {
    const res = await fetch(
        `${API_BASE}/cart/${userId}/${productId}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) throw new Error("Failed to remove cart item");

    return res.json();
}

export async function clearCart(userId) {
    const res = await fetch(
        `${API_BASE}/cart/${userId}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) throw new Error("Failed to remove cart items");

    return res.json();
}

// Update Product Details
export async function updateProduct(productId, name, price, stock, category, collection, gender) {
    const res = await fetch(`${API_BASE}/${productId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock, category, collection, gender }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar informações do utilizador";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // Ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}

// Get Prouct Codes
export async function getCodes() {
    const res = await fetch(`${API_BASE}/codes`);
    if (!res.ok) throw new Error("Falha ao Receber Codigos");
    return res.json();
}

// Increase Product Stock
export async function increaseStock(productId, amount) {
    const res = await fetch(`${API_BASE}/${productId}/increase`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar stock do product";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // Ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}

// Decrease Product Stock
export async function decreaseStock(productId, amount) {
    const res = await fetch(`${API_BASE}/${productId}/decrease`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
    });

    if (!res.ok) {
        let message = "Falha ao atualizar stock do product";
        try {
            const data = await res.json();
            if (data && data.error) message = data.error;
        } catch {
            // Ignore parse errors
        }
        throw new Error(message);
    }

    return res.json();
}

export async function getLowStock() {
    const res = await fetch(`${API_BASE}/lowStock`);
    if (!res.ok) {
        throw new Error("Falha ao obter stock baixo");
    }
    return res.json();
}

export async function getProductsByPreference(preferenceId) {
    const res = await fetch(`${API_BASE}/${preferenceId}/products`);
    if (!res.ok) {
        throw new Error("Falha ao obter stock baixo");
    }
    return res.json();
}

export async function getLastFiveProducts() {
    const res = await fetch(`${API_BASE}/lastFive`);

    if (!res.ok) throw new Error("Falha ao receber as ultimas 5 products");
    return res.json();
}

export async function getBestSellers(quantity) {
    const res = await fetch(`${API_BASE}/${quantity}/bestSellers`); 
    if (!res.ok) throw new Error("Falha ao receber os best sellers");
    return res.json();
}