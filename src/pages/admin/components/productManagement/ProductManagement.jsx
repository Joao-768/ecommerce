import { useEffect, useState } from 'react';
import { deleteProduct } from '../../../../api/adminApi'
import { getCollections, getTotalCollections } from '../../../../api/collectionsApi';
import { getCategories } from '../../../../api/categoriesApi';
import { getGenders } from '../../../../api/gendersApi';
import { getProducts, getTotalProducts } from '../../../../api/productsApi';
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../../utils/format';
import Table from '../../../../ui/Table';

export default function ProductManagement() {
    const [totalProducts, setTotalProducts] = useState();
    const [inStock, setInStock] = useState();
    const [outOfStock, setOutOfStock] = useState();
    const [lowStock, setLowStock] = useState();
    const [totalCollections, setTotalCollections] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [genders, setGenders] = useState([]);
    const navigate = useNavigate();

    const getCategoryName = (id) => {
        const category = categories.find(c => c.id === id);
        return category ? category.name : "-";
    };

    const getCollectionName = (id) => {
        const collection = collections.find(c => c.id === id);
        return collection ? collection.name : "-";
    };

    const getGenderName = (id) => {
        const gender = genders.find(g => g.id === id);
        return gender ? gender.name : "-";
    };

    const columns = [
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
        { key: "stock", label: "Stock" },
        { key: "sales", label: "Sales" },
        { key: "category", label: "Category" },
        { key: "collection", label: "Collection" },
        { key: "gender", label: "Gender" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => navigate(`${row.id}/edit`)}
                        className="hover:underline text-left"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(row.id)}
                        className="hover:underline text-left"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    const data = searchResults.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatCurrency(product.price),
        stock: product.stock,
        sales: product.sales,
        category: getCategoryName(product.category_id),
        collection: getCollectionName(product.collection_id),
        gender: getGenderName(product.gender_id),
    }));

    const handleSearch = (value) => {
        setSearchQuery(value);

        const filtered = allProducts.filter((user) =>
            user.name
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setSearchResults(filtered);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are You Sure?")) return;

        try {
            await deleteProduct(id);

            // remover da lista
            setSearchResults(prev => prev.filter(product => product.id !== id));
            setAllProducts(prev => prev.filter(product => product.id !== id));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTotalProducts()
            .then((data) => {
                setTotalProducts(data?.total ?? 0);
                setInStock(data?.inStock ?? 0);
                setOutOfStock(data?.outOfStock ?? 0);
                setLowStock(data?.lowStock ?? 0);
            })
            .catch(() => {
                setTotalProducts(0);
                setInStock(0);
                setOutOfStock(0);
                setLowStock(0);
            });

        // Get Total Collections
        getTotalCollections()
            .then((data) => setTotalCollections(data?.totalCollections ?? 0))
            .catch(() => setTotalCollections(0));

        // Get All Products
        getProducts()
            .then((data) => {
                const products = data?.products ?? [];
                setAllProducts(products);
                setSearchResults(products);
            })
            .catch(() => {
                setAllProducts([]);
                setSearchResults([]);
            });

        // Get Categories
        getCategories()
            .then((data) => setCategories(data ?? []))
            .catch(() => setCategories([]));

        // Get Collections
        getCollections()
            .then((data) => setCollections(data ?? []))
            .catch(() => setCollections([]));

        // Get Genders
        getGenders()
            .then((data) => setGenders(data ?? []))
            .catch(() => setGenders([]));

    }, []);

    return (
        <div className="flex-1 pl-10 flex flex-col gap-5 pr-10">

            {/* Stats */}
            <h1 className="text-3xl font-[Panchang-Semibold]">Product Management</h1>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <p className="text-md font-[Panchang-Regular] pb-2">Total Products: {totalProducts}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">In Stock Products: {inStock}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Out of Stock Products: {outOfStock}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Low Stock Products: {lowStock}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">Total Collections: {totalCollections}</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search for a product"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md"
                    />
                    <button
                        className="border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md hover:bg-black hover:text-white duration-200"
                        onClick={() => navigate("add")}
                    >
                        Add New Product
                    </button>
                </div>

                {/* Table */}
                <Table 
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}
