import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCollectionsById, getProductsByCollection } from "../../api/collectionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";

export default function Collection(){
    const { id } = useParams();
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [collectionName, setCollectionName] = useState("");

    const navigate = useNavigate();

    useScrollToTop();
    
    // Get products for the collection
    useEffect(() => {
        // If no coll ID, clear products
        if (!id) {
            setProducts([]);
            return;
        }

        getProductsByCollection(id)
            .then((products) => setProducts(products || []))
            .catch(() => setProducts([]));
    }, [id]);

    // Get collection name
    useEffect(() => {
        // If no collection ID, clear name
        if (!id) {
            setCollectionName("");
            return;
        }

        // Get collection name by ID
        getCollectionsById(id)
            .then((data) => {
                if (data && data.name) setCollectionName(data.name);
                else setCollectionName("");
            })
            .catch(() => {
                setCollectionName("");
            });
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
                    {t(collectionName)}
                </h1>
            </div>
            {/* Products Section */}
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
