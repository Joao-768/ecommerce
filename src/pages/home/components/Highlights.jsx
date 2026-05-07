import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProductsByCollection } from "../../../api/collectionsApi";
import { getBestSellers, getNewProducts } from "../../../api/productsApi";
import ProductCard from "../../../ui/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Highlights() {
    const { t } = useTranslation();
    const [currentHighlight, setCurrentHighlight] = useState("new");
    const [seasonalProducts, setSeasonalProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    const navigate = useNavigate();

    function getSeasonId(date) {
        const month = date.getMonth();
        if (month >= 2 && month <= 4) return 2;
        if (month >= 5 && month <= 7) return 3;
        if (month >= 8 && month <= 10) return 4;
        return 5;
    }

    function getSeason(date) {
        const month = date.getMonth();
        if (month >= 2 && month <= 4) return "spring";
        if (month >= 5 && month <= 7) return "summer";
        if (month >= 8 && month <= 10) return "fall";
        return "winter";
    }

    const seasonId = getSeasonId(new Date());
    const season = getSeason(new Date());
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        if (currentHighlight !== "season") return;

        (async () => {
            try {
                const products = await getProductsByCollection(seasonId);
                setSeasonalProducts(Array.isArray(products) ? products : []);
            } catch {
                setSeasonalProducts([]);
            }
        })();
    }, [currentHighlight, seasonId]);

    useEffect(() => {
        getNewProducts()
            .then((data) => setNewProducts(data.newProducts))
            .catch(() => setNewProducts([]));

        getBestSellers(10)
            .then((data) => setBestSellers(data?.products))
            .catch(() => setBestSellers([]));
    }, []);

    return (
        <div className="min-h-screen flex flex-col pt-5">
            <div className="flex justify-center pt-28">
                <div className="relative">
                    <div className="flex items-center gap-6">
                        <button
                            className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 cursor-pointer ${
                                currentHighlight === "new" ? "underline" : ""
                            }`}
                            onClick={() => setCurrentHighlight("new")}
                        >
                            {t("new")}
                        </button>
                        <button
                            className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 cursor-pointer ${
                                currentHighlight === "best" ? "underline" : ""
                            }`}
                            onClick={() => setCurrentHighlight("best")}
                            >
                            {t("bestSellers")}
                        </button>
                        <button
                            className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 cursor-pointer ${
                                currentHighlight === "season" ? "underline" : ""
                            }`}
                            onClick={() => setCurrentHighlight("season")}
                            >
                            {t(season)}
                        </button>
                    </div>
                    <span className="absolute left-0 -bottom-1 h-px bg-black transition-transform duration-300" />
                </div>
            </div>

            <div className="flex gap-1 overflow-x-auto p-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {/* Newest Watches */}
                {currentHighlight === "new" &&
                newProducts.map((product) => (
                    <ProductCard 
                        key={product.id}
                        item={product}
                        onClick={() => navigate(`product/${product.id}`)} 
                        isSelling={true}
                    />
                ))}

                {/* Best sellers Watches */}
                {currentHighlight === "best" &&
                bestSellers.map((product) => (
                    <ProductCard 
                        key={product.id}
                        item={product}
                        onClick={() => navigate(`product/${product.id}`)} 
                        isSelling={true}
                    />
                ))}

                {/* Seasonal Watches */}
                {currentHighlight === "season" &&
                seasonalProducts.map((product) => (
                    <ProductCard 
                        key={product.id}
                        item={product}
                        onClick={() => navigate(`product/${product.id}`)} 
                        isSelling={true}
                    />
                ))}
            </div>
        </div>
    );
}
