import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./CategoryAnimation.css";
import { getCategories, getProductsByCategory } from "../../api/categoriesApi";

export default function Categories({ onNavigate, category }){
    const { t } = useTranslation();
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        if (!category) {
            setWatches([]);
            return;
        }

        const fetchData = async () => {
            try {
                const categories = await getCategories();
                const categoryValue = String(category).toLowerCase();

                const matchedCategory = categories.find(
                    (c) =>
                        String(c.name).toLowerCase() === categoryValue ||
                        String(c.id) === String(category)
                );

                if (!matchedCategory) {
                    setWatches([]);
                    return;
                }

                const products = await getProductsByCategory(matchedCategory.id);
                setWatches(products || []);
            } catch (err) {
                setWatches([]);
            }
        };

        fetchData();
    }, [category]);

    return(
        <div className="category-page min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative py-8 px-6 pt-35">
                <button
                    onClick={() => onNavigate("home")}
                    className="h-10 w-10 absolute right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
                <h1 className="text-4xl text-center font-[Panchang-Semibold]">
                    {t(category)}
                </h1>
            </div>
            {/* Watches Section */}
            <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {watches.map((watch, index) => (
                    <div
                        key={watch.id ?? index}
                        className="flex flex-col items-center min-w-60 snap-start pl-10"
                    >
                        <div 
                            className="w-60 h-96 bg-gray-200 mb-4 flex items-center justify-center"
                            onClick={() => onNavigate("product", { productId: watch.id })}
                        >
                            <span className="text-gray-500 font-[Panchang-Regular]">
                                {watch.name ?? "Product"}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold font-[Panchang-Regular]">
                            {watch.name ?? "Untitled watch"}
                        </h3>
                        <p className="text-gray-600 font-[Panchang-Regular]">
                            {watch.price != null ? `${watch.price}€` : ""}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
