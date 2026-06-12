import { useState, useEffect } from "react";
import { getProductsByCollection, getCollections } from "../../api/collectionsApi";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import ProductCard from "../../ui/ProductCard";

export default function Watches() {
    const [collections, setCollections] = useState([]);
    const [productsByCollection, setProductsByCollection] = useState({});

    const navigate = useNavigate();

    useScrollToTop();

    useEffect(() => {
        getCollections().then((data) => {
            setCollections(data ?? []);

            data.forEach((c) => {
                getProductsByCollection(c.id).then((products) => {
                    setProductsByCollection(prev => ({
                        ...prev,
                        [c.id]: products ?? []
                    }));
                });
            });
        });
    }, []);

    return (
        <div className="py-12 pt-30">
            {collections.map((c) => {
                const products = productsByCollection[c.id] || [];

                return (
                    <section key={c.id} className="mb-20">
                        <h2 className="text-2xl font-[Panchang-Regular] border-b pb-2 mb-6 px-10">
                            {c.name}
                        </h2>

                        <div className="overflow-x-auto">
                            <div className="flex gap-2 px-10 pt-2 pb-10">
                                {products.map((product) => (
                                    <div className="shrink-0">
                                        <ProductCard
                                            key={product.id}
                                            item={product}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            isSelling={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}