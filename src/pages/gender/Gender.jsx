import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProductsByGender } from "../../api/genderApi";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";

export default function Gender() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [watches, setWatches] = useState([]);

    const navigate = useNavigate();

    useScrollToTop();
    
    useEffect(() => {
        getProductsByGender(id)
            .then((products) => setWatches(products || []))
            .catch(() => setWatches([]));
    }, [id]);

    return(
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
                    {id === 1 ? t("men") : t("women")}
                </h1>
            </div>

            {/* Product Section */}
            <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
                {watches.map((product) => (
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
