import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { getUserCollection, removeCollectionProduct } from "../../../../api/usersApi";
import ProductCard from "../../../../ui/ProductCard";
import { useNavigate } from "react-router-dom";
import { AddCardButton } from "../../../../ui/Buttons";

export default function UserCollection() {
    const account = localStorage.getItem("account");
    const [collection, setCollection] = useState([]);
    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(() => {
        if (!account) return;
        getUserCollection(account)
            .then((data) => setCollection(data))
            .catch((error) => console.error(error));
    }, [account]);

    async function removeProduct(productId) {
        try {
            await removeCollectionProduct(account, productId);
            setCollection(collection.filter(p => p.id !== productId));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-[Panchang-Semibold]">
                    {t("myCollection")}
                </h1>
                <p className="text-xs text-stone-500 font-[Panchang-Regular] mt-2 max-w-xl">
                    { collection.length > 0 ? t("allYourWatches") : t("mycollectionDescription") }
                </p>
            </div>
            {/* Collection Products */}
            <div className="grid grid-cols-4 text-center">
                {collection.map((product) => (
                    <ProductCard 
                        key={product.id}
                        item={product}
                        isRemovable={true}
                        onRemove={removeProduct}
                        onClick={() => navigate(`/product/${product.id}`)}
                    />
                ))}
                
                {/* Add Product Button */}
                <AddCardButton
                    onClick={() => navigate("/user-page/collection/add")}
                    className="hover:shadow-xl hover:scale-[1.02]"
                >
                    <span className="w-20 h-20 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-4xl text-stone-500 transition-all duration-300 group-hover:border-black group-hover:text-black">
                        +
                    </span>
                    <p className="mt-2 font-[Panchang-Regular] text-black text-sm">
                        {t("addNewWatch")}
                    </p>
                </AddCardButton>
            </div>
        </div>
    );
}
