import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { searchProducts, incrementSearchCount } from "../../api/searchApi";
import { getPopularProducts } from "../../api/productsApi";
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
            .then((data) => setSearchPopularResults(data?.products ?? []))
            .catch(() => setSearchPopularResults([]));
    }, []);

    return(
        <div className="min-h-screen flex flex-col pt-20">
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
            <div className="flex justify-center px-6">
                <div className="flex items-center gap-6 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder={t("input")}
                        value={searchQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchQuery(value);
                            setSearchSection(value.trim() === "" ? "popular" : "searched");
                        }}
                        className="w-full max-w-xl border border-black px-4 py-3 bg-transparent focus:outline-none rounded-xl font-[Panchang-Regular] shadow-md"
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h1 className="pl-5 h-5 font-[Panchang-Regular] text-lg pt-4">
                    {searchSection === "popular" && (t("popularSearches"))}
                </h1>

                {searchSection === "searched" && searchResults.length === 0 ? (
                    <div className="flex-1 flex items-center -mt-40 justify-center">
                        <p className="font-[Panchang-Regular] text-stone-400">
                            {t("noResults")}
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4 pl-5">
                        {(searchSection === "popular" ? searchPopularResults : searchResults).map((product) => (
                            <ProductCard
                                key={product.id}
                                item={product}
                                onClick={() => {
                                    navigate(`/product/${product.id}`);
                                    incrementSearchCount(product.id);
                                }}
                                isSelling={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}        
