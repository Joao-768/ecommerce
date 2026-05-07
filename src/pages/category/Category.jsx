import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCategoriesById, getProductsByCategory } from "../../api/categoriesApi";
import { useParams, useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";

export default function Categories(){
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    useScrollToTop();

    // Get products for the category
    useEffect(() => {
        // If no category ID, clear products
        if (!id) {
            setProducts([]);
            return;
        }

        getProductsByCategory(id)
            .then((products) => setProducts(products || []))
            .catch(() => setProducts([]));
    }, [id]);

    // Get category name
    useEffect(() => {
        // If no category ID, clear name
        if (!id) setCategoryName("");


        // Fetch category name by ID
        getCategoriesById(id)
            .then((data) => setCategoryName(data?.name))
            .catch(() => setCategoryName(""));
        }, [id]);

    return(
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative py-8 px-6 pt-35">
                <button
                    onClick={() => navigate('/')}
                    className="h-10 w-10 absolute right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
                <h1 className="text-4xl text-center font-[Panchang-Semibold]">
                    {t(categoryName || id)}
                </h1>
            </div>
            {/* Watches Section */}
            <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {products.map((product) => (
                    <ProductCard
                        item={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                        isSelling={true}
                    />
                ))}
            </div>
        </div>
    )
}
