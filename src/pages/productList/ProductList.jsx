import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";
import { getProductsByGender } from "../../api/gendersApi";
import { getCollectionsById, getProductsByCollection } from "../../api/collectionsApi";
import { getCategoriesById, getProductsByCategory } from "../../api/categoriesApi";

export default function ProductList({ type }) {
    const { id } = useParams();
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");

    const navigate = useNavigate();
    useScrollToTop();

    useEffect(() => {
        if (type === "gender") {
            getProductsByGender(id)
                .then((data) => {
                    setProducts(data || []);
                    setTitle(id === "1" ? "men" : "women");
                })
                .catch(() => setProducts([]));

        } else if (type === "collection") {
            getProductsByCollection(id)
                .then((data) => setProducts(data || []))
                .catch(() => setProducts([]));

            getCollectionsById(id)
                .then((data) => setTitle(data?.name || ""))
                .catch(() => setTitle(""));

        } else if (type === "category") {
            getProductsByCategory(id)
                .then((data) => setProducts(data || []))
                .catch(() => setProducts([]));

            getCategoriesById(id)
                .then((data) => setTitle(data?.name || ""))
                .catch(() => setTitle(""));
        }
    }, [id, type, t]);


    return (
        <div className="style-page min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative py-8 px-6 pt-35">
                <button
                    onClick={() => navigate('/')}
                    className="h-10 w-10 absolute right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
                <h1 className="text-4xl text-center font-[Panchang-Semibold]">
                    {t(title)}
                </h1>
            </div>

            {/* Product Section */}
            <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4 pl-5">
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
    );
}