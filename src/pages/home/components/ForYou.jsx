import { useEffect, useState } from "react";
import { getUserPreferences } from "../../../api/preferencesApi";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/productsApi"
import ProductCard from "../../../ui/ProductCard";

export default function ForYou() {
    const account = localStorage.getItem("account");
    const [preferences, setPreferences] = useState([1, 2, 3, 4, 5, 6]);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!account) return;

        getUserPreferences(account)
            .then((data) => {
                if (!data || data.length === 0) {
                    setPreferences([1, 2, 3, 4, 5, 6]);
                } else {
                    setPreferences(data.map(p => p.preference_id));
                }
            })
            .catch(() => setPreferences([1, 2, 3, 4, 5, 6]));
    }, [account]);

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data.products))
            .catch(() => setProducts([]));
    }, []);

    const filteredProducts = products.filter((product) =>
        preferences.includes(product.preference_id)
    );

    return(
        <div className="h-170 font-[Panchang-Regular]">
            <div className="text-center">
                For You
            </div>
            <div className="flex gap-1 overflow-x-auto p-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        item={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                        isSelling={true}
                    />
                ))}
            </div>
        </div>
    )
}