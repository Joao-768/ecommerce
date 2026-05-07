import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { getCategoriesById } from "../../api/categoriesApi.js";
import { getCollectionsById } from "../../api/collectionsApi.js";
import { getProductById, setWishslistItem, setCartItem, isInCart } from "../../api/productsApi.js";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useScrollToTop } from "../../utils/format.js";

export default function ProductPage({ setCartIsOpen }) {
    const [product, setProduct] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [collection, setCollection] = useState({ name: "" });
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const account = localStorage.getItem("account");
    const [isItemInCart, setIsItemInCart] = useState(false);
    const [isItemActive, setIsItemActive] = useState(0);

    const { id } = useParams();

    const navigate = useNavigate();

    useScrollToTop();

    function currency(price) {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    const handleWishlist = async () => {
        if (!account) {
            alert("Faca login para adicionar o produto a wishlist");
            return;
        }

        if (!product?.id) return;

        try {
            await setWishslistItem(account, product.id);
            setIsWishlisted(true);
        } catch {
            // Ignore errors for now
        }
    };

    const handleCart = async () => {
        if (!account) {
            alert("Faca login para adicionar o produto ao cart");
            return;
        }

        if (!product.id) return;
        if (product.status === 0) return;
        if (isItemInCart) {
            setCartIsOpen(true)
            return;
        }

        try {
            await setCartItem(account, product.id);
            setIsItemInCart(true);
        } catch {
            // Ignore errors for now
        }
    };

    useEffect(() => {
        if (!id) {
            setError("Invalid product id");
            return;
        }

        getProductById(id)
            .then((data) => {
                setProduct(data?.product ?? data);
            })
            .catch((err) => {
                setError("Failed to load product");
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        if (!product) return;

        setCategoryName(product.category || "");
        setCollection({
            name: product.collection || ""
        });

        if (product.category_id != null) {
            getCategoriesById(product.category_id).then((data) =>
                setCategoryName(data && data.name ? data.name : "")
            );
        }

        if (product.collection_id != null) {
            getCollectionsById(product.collection_id).then((data) =>
                setCollection(data ? data : { name: "" })
            );
        }

        setIsItemActive(product.status);
    }, [product]);

    useEffect(() => {
        if (!account || !product?.id) {
            setIsItemInCart(false);
            return;
        }
        isInCart(account, product.id)
            .then((exists) => setIsItemInCart(Boolean(exists)))
            .catch(() => setIsItemInCart(false));
    }, [account, product?.id]);

    if (error) return <p className="pt-40 text-center">{error}</p>;
    if (!product) return <p className="pt-40 text-center">Loading...</p>;

    return (
        <div className="w-screen min-h-screen grid grid-cols-2">
            {/* Left Screen */}
            <div className="pt-24 flex justify-start items-center">
                <div className="h-130 w-full bg-stone-200 relative flex items-center justify-center -mt-10">
                    <div className="w-full h-10 absolute top-0 left-0 z-0"></div>
                    <nav className="absolute top-0 left-3 h-10 z-10 flex items-center gap-2 text-sm font-[Panchang-Regular] whitespace-nowrap">
                        <button className="hover:underline" 
                            onClick={() => navigate('/')}
                        >
                            {t("home")}
                        </button>
                        <span>-</span>
                        <button className="hover:underline" 
                            onClick={() => navigate('/watches')}
                        >
                            {t("watches")}
                        </button>
                        <span>-</span>
                        <button
                            className="hover:underline"
                            onClick={() => navigate(`/category/${product.category_id}`)}
                        >
                            {t(categoryName)}
                        </button>
                        <span>-</span>
                        <button
                            className="hover:underline"
                            onClick={() => navigate(`/collection/${product.collection_id}`)}
                        >
                            {collection.name}
                        </button>
                        <span>-</span>
                        <span className="font-[Panchang-Semibold] cursor-default">
                            {t(product.name)}
                        </span>
                    </nav>
                    <img
                        className="h-105 relative z-10"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
            </div>

            {/* Right Screen */}
            <div className="flex justify-center">
                <div className="min-h-screen w-105">
                    <div className="pt-45 flex items-center gap-3">
                        <h1 className="text-3xl font-[Panchang-Semibold]">{product.name}</h1>
                        <button
                            className="w-12 h-12 text-2xl"
                            onClick={handleWishlist}
                        >
                            {isWishlisted ? <IoMdHeart /> : <IoMdHeartEmpty />}
                        </button>
                    </div>
                    <h2 className="text-2xl font-[Panchang-Regular]">
                        {collection.name} Collection
                    </h2>
                    <p className="text-sm font-[Panchang-Regular] mt-5">
                        {product.description}
                    </p>
                    <p className="text-2xl font-[Panchang-Semibold] mt-5">
                        {currency(product.price)}
                    </p>
                    <button
                        className="min-w-38 min-h-12 text-sm font-[Panchang-Regular] bg-black text-white border-2 border-black cursor-pointer mb-5 rounded-md hover:bg-white hover:text-black transition-all duration-200 mt-10 shadow-md"
                        onClick={handleCart}
                    >
                        {isItemActive === 1 ? isItemInCart ? t("inYourCart") : t("addToCart") : t("unavaliable")}
                    </button>
                </div>
            </div>
        </div>
    );
}
