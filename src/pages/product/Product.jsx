import { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { getCategoriesById } from "../../api/categoriesApi.js";
import { getCollectionsById } from "../../api/collectionsApi.js";
import { getProductById } from "../../api/productsApi.js";
import { useTranslation } from "react-i18next";

export default function ProductPage({ id, onNavigate }) {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) {
      setError("ID do relógio em falta");
      return;
    }

    setError(null);
    setProduct(null);

    getProductById(id)
      .then((data) => {
        if (!data) {
          setError("Relógio nao encontrado");
          return;
        }
        setProduct(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar relógio");
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const categoryId = product.category_id ?? product.categoryId;
    const collectionId = product.collection_id ?? product.collectionId;

    if (categoryId !== undefined && categoryId !== null) {
      getCategoriesById(categoryId).then((name) => setCategory(name));
    } else {
      setCategory(product.category ?? product.style ?? null);
    }

    if (collectionId !== undefined && collectionId !== null) {
      getCollectionsById(collectionId).then((name) => setCollection(name));
    } else {
      setCollection(product.collection ?? null);
    }
  }, [product]);

  if (error) return <p className="pt-40 text-center">{error}</p>;
  if (!product) return <p className="pt-40 text-center">Loading...</p>;

  return (
    <div className="w-screen min-h-screen grid grid-cols-2">
      {/* Left Screen */}
      <div className="pt-24 flex justify-start items-center">
        <div className="h-130 w-full bg-stone-200 relative flex items-center justify-center -mt-10">
          <div className="w-full h-10 absolute top-0 left-0 z-0"></div>
          <nav className="absolute top-0 left-3 h-10 z-10 flex items-center gap-2 text-sm font-[Panchang-Regular] whitespace-nowrap">
            <button className="hover:underline" onClick={() => onNavigate("home")}>
              {t("home")}
            </button>
            <span>-</span>
            <button className="hover:underline" onClick={() => onNavigate("watches")}>
              {t("watches")}
            </button>
            <span>-</span>
            <button
              className="hover:underline"
              onClick={() => onNavigate("style", product.style)}
            >
              {t(String(category ?? product.style ?? ""))}
            </button>
            <span>-</span>
            <button
              className="hover:underline"
              onClick={() => onNavigate("collection", product.collection)}
            >
              {String(collection ?? product.collection ?? "")}
            </button>
            <span>-</span>
            <span className="font-[Panchang-Semibold] cursor-default">
              {t(product.name)}
            </span>
          </nav>
          <img
            className="h-105 relative z-10"
            src={`/images/${product.collection}/${product.image}`}
            alt={product.name}
          />
        </div>
      </div>

      {/* Right Screen */}
      <div className="flex justify-center">
        <div className="min-h-screen w-105">
          <div className="pt-40 flex items-center gap-3">
            <h1 className="text-3xl font-[Panchang-Semibold]">{product.name}</h1>
            <button className="w-12 h-12 text-2xl" 
              onClick={() => setIsFavorite((v) => !v)}>
              {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </button>
          </div>
          <h2 className="text-2xl font-[Panchang-Regular]">
            {String(collection ?? product.collection ?? "")} Collection
          </h2>
          <p className="text-sm font-[Panchang-Regular] mt-5">
            {product.description}
          </p>
          <p className="text-2xl font-[Panchang-Semibold] mt-5">
            {product.price},00€
          </p>
          <button
            className="w-36 h-12 text-sm font-[Panchang-Regular] bg-black text-white border-2 border-black cursor-pointer mb-5 rounded-md hover:bg-white hover:text-black transition-all duration-200 mt-10"
            onClick={() => onNavigate("cart", product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
