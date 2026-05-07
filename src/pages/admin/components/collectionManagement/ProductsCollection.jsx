import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCollection } from "../../../../api/collectionsApi";
import { getCollections } from "../../../../api/collectionsApi";
import { getCategories } from "../../../../api/categoriesApi";
import { getGenders } from "../../../../api/genderApi";
import { IoArrowBackOutline } from "react-icons/io5";
import Table from "../../../../ui/Table";

export default function ProductsCollection() {
    const [products, setProducts] = useState([]);
    const [collection, setCollection] = useState(null);
    const { id } = useParams()
    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);
    const navigate = useNavigate();

    const getGenderName = (id) => {
        const gender = genders.find(g => g.id === id);
        return gender ? gender.name : "-";
    };

    const getCategoryName = (id) => {
        const category = categories.find(c => c.id === id);
        return category ? category.name : "-";
    };

    const getCollectionName = (id) => {
        const collection = collections.find(c => c.id === id);
        return collection ? collection.name : "-";
    };

    const columns = [
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "stock", label: "Stock" },
        { key: "category", label: "Category" },
        { key: "collection", label: "Collection" },
        { key: "gender", label: "Gender" },
    ];

    const data = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: getCategoryName(product.category_id),
        collection: getCollectionName(product.collection_id),
        gender: getGenderName(product.gender_id),
    }));

    useEffect(() => {
        if (!id) return;

        getProductsByCollection(id)
            .then((data) => setProducts(data ?? []))
            .catch(() => setProducts([]));

        getCollections()
            .then((data) => {
                const found = data.find(c => c.id === Number(id));
                setCollection(found);
            })
            .catch(() => setCollection(null));

    }, [id]);

    useEffect(() => {
        getCollections()
            .then((data) => setCollections(data))
            .catch(() => setCollections([]));
        
        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
        
        // Get Genders
        getGenders()
            .then((data) => setGenders(data))
            .catch(() => setGenders([]));
    }, [])

    return (
        <div className="flex-1 pl-10 pr-10 flex flex-col gap-2">
            {/* Header */}
            <button
                className="inline-flex items-center gap-2 text-sm font-[Panchang-Regular] text-stone-500 hover:underline"
                onClick={() => navigate("/admin/collection-management")}
            >
                <IoArrowBackOutline />
                back to the personal information
            </button>
            <h1 className="text-3xl font-[Panchang-Semibold]">{collection?.name} Products</h1>

            <div className="bg-white rounded-2xl pt-1 pl-6 pr-6 pb-6 shadow-md border border-stone-100">
                <Table 
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}