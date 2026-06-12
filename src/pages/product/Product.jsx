import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { getCategoriesById } from "../../api/categoriesApi.js";
import { getCollectionsById, getProductsByCollection } from "../../api/collectionsApi.js";
import { getGenderById } from "../../api/gendersApi.js";
import { getProductById, getProductSizes } from "../../api/productsApi.js";
import { setCartItem, isInCart, ajustCartItemQuantity } from "../../api/cartApi.js";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency, getSeasonStatus, useScrollToTop } from "../../utils/format.js";
import ProductCard from "../../ui/ProductCard.jsx";
import { Button, GhostButton, SizeButton } from "../../ui/Buttons";
import ProductGrid from "../../ui/ProductGrid.jsx";
import { isInWishlist, setWishlistItem, removeWishlistItem } from "../../api/wishlistApi.js";

export default function ProductPage({ cartIsOpen, setCartIsOpen }) {
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState("");
    const [collection, setCollection] = useState("");
    const [gender, setGender] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { t, i18n } = useTranslation();
    const account = localStorage.getItem("account");
    const [isItemInCart, setIsItemInCart] = useState(false);
    const [isItemActive, setIsItemActive] = useState(0);
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [similarProducts, setSimilarProducts] = useState([]);
    const [showAllSpecs, setShowAllSpecs] = useState(false);

    useScrollToTop();

    const handleWishlist = async () => {
        if (!account) {
            alert(t("loginToWishlist"));
            return;
        }

        if (!product?.id) return;

        try {
            if(isWishlisted){
                await removeWishlistItem(account, product.id);
                setIsWishlisted(false);
            }
            else{
                await setWishlistItem(account, product.id);
                setIsWishlisted(true);
            }
        } catch {
            // Ignore errors
        }
    };

    const handleCart = async () => {
        if (!account) {
            alert(t("loginToCart"));
            return;
        }

        if (!product.id) return;
        if (!getSeasonStatus(product.collection_id)) return;
        if(selectedSize === null) {
            alert(t("selectCaseSize"));
            return;
        }

        if (isItemInCart) {
            try {
                await ajustCartItemQuantity(account, product.id, 1, "increase", selectedSize);
                setCartIsOpen(true);
            } catch (err) {
                alert(err.message);
            }
            return;
        }

        try {
            await setCartItem(account, product.id, selectedSize);
            setIsItemInCart(true);
            setCartIsOpen(true);
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        if (!id) return;

        getProductById(id, i18n.language)
            .then((data) => setProduct(data.product))
            .catch((err) => console.error(err));

        getProductSizes(id)
            .then((data) => setSizes(data))
            .catch(() => setSizes([]));
    }, [id, i18n.language]);


    useEffect(() => {
        if (!product) return;

        getCategoriesById(product.category_id).then((data) =>
            setCategory(data && data.name ? data.name : "")
        );

        getCollectionsById(product.collection_id).then((data) =>
            setCollection(data ? data : "")
        );

        getProductsByCollection(product.collection_id)
            .then((data) => setSimilarProducts(data))
            .catch(() => setSimilarProducts([]));

        getGenderById(product.gender_id).then((data) =>
            setGender(data && data.name ? data.name : "")
        );

        setIsItemActive(getSeasonStatus(product.collection_id));
    }, [product]);

    useEffect(() => {
        if (!account || !product?.id) {
            setIsItemInCart(false);
            return;
        }

        isInWishlist(account, product.id)
            .then((exists) => setIsWishlisted(Boolean(exists)))
            .catch(() => setIsWishlisted(false));

        if (!selectedSize) {
            setIsItemInCart(false);
            return;
        }

        isInCart(account, product.id, selectedSize)
            .then((exists) => setIsItemInCart(Boolean(exists)))
            .catch(() => setIsItemInCart(false));
    }, [account, product?.id, selectedSize, cartIsOpen]);

    if (!product) return <p className="flex items-center justify-center h-screen">{t("loading")}</p>;

    const specs = [
        { label: "movement", value: product.movement },
        { label: "caseMaterial", value: product.case_material },
        { label: "crystal", value: product.crystal },
        { label: "waterResistance", value: product.water_resistance },
        { label: "strap", value: product.strap },
        { label: "warranty", value: product.warranty },
    ];

    const visibleSpecs = showAllSpecs ? specs : [];

    return (
        <div className="w-screen min-h-screen">
            <div className="grid grid-cols-2">

                {/* Left Screen */}
                <div className="relative">
                    <div className="sticky top-0 h-screen w-full bg-stone-100 flex items-center justify-center pt-30">
                        <nav className="absolute top-32 left-3 h-10 z-10 flex items-center gap-2 text-sm font-[Panchang-Regular] whitespace-nowrap">
                            <GhostButton onClick={() => navigate('/')}>{t("home")}</GhostButton>
                            <span>-</span>
                            <GhostButton onClick={() => navigate('/watches')}>{t("watches")}</GhostButton>
                            <span>-</span>
                            <GhostButton onClick={() => navigate(`/category/${product.category_id}`)}>{t(category)}</GhostButton>
                            <span>-</span>
                            <GhostButton onClick={() => navigate(`/collection/${product.collection_id}`)}>{collection.name}</GhostButton>
                            <span>-</span>
                            <span className="font-[Panchang-Semibold] cursor-default">
                                {t(product.name)}
                            </span>
                        </nav>
                        <img
                            className="h-3/4 object-contain relative z-10"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                </div>

                {/* Right Screen */}
                <div className="flex justify-center border-l border-stone-100">
                    <div className="w-full pr-20 pt-33 pb-20">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-[Panchang-Semibold]">{product.name}</h1>
                            <button
                                className="w-12 h-12 text-2xl hover:cursor-pointer"
                                onClick={handleWishlist}
                            >
                                {isWishlisted ? <IoMdHeart /> : <IoMdHeartEmpty />}
                            </button>
                        </div>

                        <h2 className="text-lg font-[Panchang-Regular] text-stone-400 mt-1">
                            {collection.name} Collection
                        </h2>

                        <p className="text-sm font-[Panchang-Regular] text-stone-400 mt-2">
                            {t(gender.toLowerCase())}
                        </p>

                        <p className="text-2xl font-[Panchang-Semibold] mt-4">
                            {formatCurrency(product.price)}
                        </p>

                        {product.stock <= product.max_stock / 10 && product.stock > 0 && (
                            <p className="text-xs font-[Panchang-Regular] text-red-700 mt-2">
                                {t("leftInStock", { count: product.stock })}
                            </p>
                        )}

                        <p className="text-sm font-[Panchang-Regular] mt-6 text-stone-600">
                            {product.description}
                        </p>

                        {/* Case Size */}
                        <div className="mt-8">
                            <p className="text-xs font-[Panchang-Regular] text-stone-400 tracking-widest mb-3">{t("caseSize")}</p>
                            <div className="flex gap-2">
                                {sizes.map((size) => (
                                    <SizeButton
                                        key={size.size_mm}
                                        selected={selectedSize === size.size_mm}
                                        onClick={() => setSelectedSize(size.size_mm)}
                                        className="w-30"
                                    >
                                        {size.size_mm}mm
                                    </SizeButton>
                                ))}
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="mt-8 border-t border-stone-200 pt-4 flex flex-col gap-3">
                            <h2 className="font-[Panchang-Semibold] mb-3">{t("specifications")}</h2>
                            {visibleSpecs.map(({ label, value }) => (
                                <div key={label} className="flex justify-between items-center border-b border-stone-100 pb-2">
                                    <span className="text-xs font-[Panchang-Regular] text-stone-400 uppercase tracking-widest">{t(label)}</span>
                                    <span className="text-sm font-[Panchang-Regular]">{value}</span>
                                </div>
                            ))}
                            <GhostButton
                                className="max-w-50 text-xs text-stone-400 hover:text-black text-left underline mt-1"
                                onClick={() => setShowAllSpecs(!showAllSpecs)}
                            >
                                {showAllSpecs ? t("hideSpecifications") : t("viewSpecifications")}
                            </GhostButton>
                        </div>

                        {/* Add to Cart */}
                        <Button className="w-full mt-8 shadow-md" onClick={handleCart} disabled={product.stock === 0 || !isItemActive}>
                            {product.stock === 0 ? t("outOfStock") : isItemActive ? t("addToCart") : t("unavaliable")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            <h2 className="mt-10 pl-10 text-xl font-[Panchang-Semibold]">{t("fromTheSameCollection")}</h2>
            <ProductGrid
                products={similarProducts.filter(p => p.id !== product.id)}
                className="flex gap-1 overflow-x-auto p-10 pb-10 snap-x scrollbar-x overscroll-x-contain"
            />
        </div>
    );
}
