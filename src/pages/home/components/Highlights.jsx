import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSeasonalProducts } from "../../../api/collectionsApi";

function getSeason(date) {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "fall";
    return "winter";
}

export default function Highlights({ onNavigate }) {
    const { t } = useTranslation();
    const [currentHighlight, setCurrentHighlight] = useState("new");
    const [seasonalProducts, setSeasonalProducts] = useState([]);

    const season = getSeason(new Date());
    const newWatches = Array.from({ length: 10 }, (_, i) => `Watch ${i + 1}`);
    const bestSellers = Array.from({ length: 10 }, (_, i) => `Watch ${i + 1}`);

    useEffect(() => {
        if (currentHighlight !== "season") return;

        (async () => {
            try {
                const products = await getSeasonalProducts(season);
                setSeasonalProducts(Array.isArray(products) ? products : []);
            } catch {
                setSeasonalProducts([]);
            }
        })();
    }, [currentHighlight, season]);

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
                            className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 cursor-pointer${
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

            <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {/* Newest Watches */}
                {currentHighlight === "new" &&
                newWatches.map((watch, index) => (
                    <div key={index} className="flex flex-col items-center min-w-60 snap-start pl-10">
                        <div className="w-60 h-96 bg-gray-200 mb-4 flex items-center justify-center">
                            <span className="text-gray-500 font-[Panchang-Regular]">{watch} Image</span>
                        </div>
                        <h3 className="text-lg font-semibold font-[Panchang-Regular]">{watch}</h3>
                        <p className="text-gray-600 font-[Panchang-Regular]">$XXX.XX</p>
                    </div>
                ))}

                {/* Best sellers Watches */}
                {currentHighlight === "best" &&
                bestSellers.map((watch, index) => (
                        <div key={index} className="flex flex-col items-center min-w-60 snap-start pl-10">
                            <div className="w-60 h-96 bg-gray-200 mb-4 flex items-center justify-center">
                                <span className="text-gray-500 font-[Panchang-Regular]">{watch} Image</span>
                            </div>
                            <h3 className="text-lg font-semibold font-[Panchang-Regular]">{watch}</h3>
                            <p className="text-gray-600 font-[Panchang-Regular]">$XXX.XX</p>
                        </div>
                ))}

                {/* Seasonal Watches */}
                {currentHighlight === "season" &&
                    seasonalProducts.map((product) => (
                        <div
                            className="flex flex-col items-center min-w-60 snap-start pl-10"
                        >
                            <div 
                                className="w-60 h-96 bg-gray-200 mb-4 flex items-center justify-center"
                                onClick={() => onNavigate("product", { productId: product.id })}
                            >
                                <span className="text-gray-500 font-[Panchang-Regular]">
                                    {product?.name ?? "Product"}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold font-[Panchang-Regular]">
                                {product?.name ?? "Untitled watch"}
                            </h3>
                            <p className="text-gray-600 font-[Panchang-Regular]">
                                {product?.price != null ? `${product.price}€` : ""}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
