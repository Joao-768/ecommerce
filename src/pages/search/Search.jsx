import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { searchProducts } from "../../api/searchApi";
import { incrementSearchCount, getPopularProducts } from "../../api/productsApi";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";

export default function Search(){
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSection, setSearchSection] = useState("popular");
    const [searchResults, setSearchResults] = useState([]);
    const [searchPopularResults, setSearchPopularResults] = useState([]);

    const navigate = useNavigate();

    useScrollToTop();

    useEffect(() => {
        // Call the search API whenever the search query changes
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }
        searchProducts(searchQuery)
            .then((data) => setSearchResults(data))
            .catch(() => setSearchResults([]));
    }, [searchQuery]);

    useEffect(() => {
        getPopularProducts()
            .then((data) => setSearchPopularResults(data))
            .catch(() => setSearchPopularResults([]));
    }, [])

    return(
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative py-8 px-6 pt-15">
                <button
                    onClick={() => navigate('/')}
                    className="h-10 w-10 absolute top-4 right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
                <h1 className="text-4xl text-center font-[Panchang-Semibold]">
                    {t("searchTitle")}
                </h1>
            </div>
            {/* Search Section */}
            <div className="flex justify-center pt-5 px-6">
                <div className="flex items-center gap-6 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder={t("input")}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSearchSection("searched");
                        }}
                        className="w-full max-w-xl border border-black px-4 py-3 bg-transparent focus:outline-none rounded-xl font-[Panchang-Regular] shadow-md"
                    />
                </div>
            </div>

            {/* Popular Watches */}
            {searchSection === "popular" && (
                <div>
                    <h1 className="pl-5">{t("popularSearches")}</h1>
                    <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                        {searchPopularResults.map((product) => (
                            <ProductCard
                                item={product}
                                onClick={() => navigate(`product/${product.id}`)}
                                isSelling={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Searched Products */}
            {searchSection === "searched" && (
                <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                    {searchResults.map((product) => (
                        <ProductCard
                            item={product}
                            onClick={() => navigate(`product/${product.id}`)}
                            isSelling={true}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}        
