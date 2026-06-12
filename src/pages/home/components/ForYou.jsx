import { useEffect, useState } from "react";
import { getProductsByPreferences } from "../../../api/preferencesApi";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/productsApi"
import ProductCard from "../../../ui/ProductCard";
import { useTranslation } from "react-i18next";

export default function ForYou() {
    const { t } = useTranslation();
    const account = localStorage.getItem("account");
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            getProducts().then((data) => setProducts(data.products));
            return;
        }

        getProductsByPreferences(account)
            .then((data) => {
                if (!data || data.length === 0) {
                    getProducts().then((data) => setProducts(data.products));
                } else {
                    setProducts(data);
                }
            })
            .catch(() => getProducts().then((data) => setProducts(data.products)));
    }, [account]);

    return(
        <div className="h-170 font-[Panchang-Regular]">
            <div className="text-center">
                {t("forYou")}
            </div>
            <div className="flex gap-1 overflow-x-auto p-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {products.map((product) => (
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