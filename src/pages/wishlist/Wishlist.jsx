import { useEffect, useState } from "react";
import { getWishlistItems } from "../../api/productsApi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const account = localStorage.getItem("account");
    const { t } = useTranslation();

    const navigate = useNavigate();

    useScrollToTop();

    useEffect(() => {
        if (!account) return;

        getWishlistItems(account)
            .then((data) => setWishlistItems(data || []))
            .catch(() => setWishlistItems([]));
    }, [account]);

    return (
        <div className="min-h-screen pt-40 px-8">
            <h1 className="text-4xl font-[Panchang-Bold] mb-4 flex justify-center">{t("wishlistTitle")}</h1>
            <h3 className="text-2xl font-[Panchang-Semibold] mb-4 flex justify-center">{t("wishlistDescription")}</h3>
            <div className="flex gap-6 overflow-x-auto snap-x scroll-smooth px-4">
                {wishlistItems.map((product) => (
                    <ProductCard
                        item={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                        isSelling={true}
                    />
                ))}
            </div>
        </div>
    );
}
