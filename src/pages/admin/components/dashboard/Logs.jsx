import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../utils/format";
import { getLastFiveUsers } from "../../../../api/adminApi";
import { getLastFiveOrders } from "../../../../api/ordersApi";
import { getLastFiveProducts } from "../../../../api/productsApi";
import { getCategories } from "../../../../api/categoriesApi";
import { getCollections } from "../../../../api/collectionsApi";
import { getGenders } from "../../../../api/gendersApi";
import Table from "../../../../ui/Table";
import { useTranslation } from "react-i18next";

export default function Logs() {
    const { t } = useTranslation();
    const [lastUsers, setLastUsers] = useState([]);
    const [lastOrders, setLastOrders] = useState([]);
    const [lastProducts, setLastProducts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [genders, setGenders] = useState([]);

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

    const userColumns = [
        { key: "name", label: "Name" },
        { key: "surname", label: "Surname" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
    ];

    const userData = lastUsers.map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        status: user.status,
    }));

    const orderColumns = [
        { key: "orderId", label: "Order Id" },
        { key: "name", label: "Name" },
        { key: "surname", label: "Surname" },
        { key: "totalPrice", label: "Total Price" },
        { key: "date", label: "Date" },
    ];

    const orderData = lastOrders.map((order) => ({
        id: order.id,
        orderId: `# ${order.id}`,
        name: order.name,
        surname: order.surname,
        totalPrice: formatCurrency(order.total_price),
        date: order.created_at?.slice(0, 10) || "",
    }));

    const productColumns = [
        { key: "name", label: t("name") },
        { key: "price", label: t("price") },
        { key: "stock", label: t("stock") },
        { key: "sales", label: t("sales") },
        { key: "category", label: t("category") },
        { key: "collection", label: t("collection") },
        { key: "gender", label: t("gender") },
        { key: "date", label: t("date") },
    ];

    const productData = lastProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatCurrency(product.price),
        stock: product.stock,
        sales: product.sales,
        category: getCategoryName(product.category_id),
        collection: getCollectionName(product.collection_id),
        gender: getGenderName(product.gender_id),
        date: product.created_at?.slice(0, 10) || "",
    }));

    useEffect(() => {
        // Get Last 5 Users Created
        getLastFiveUsers()
            .then((data) => setLastUsers(data?.users))
            .catch(() => setLastUsers([]));

        // Get Last 5 Orders Created
        getLastFiveOrders()
            .then((data) => setLastOrders(data.orders))
            .catch(() => setLastOrders([]));

        getLastFiveProducts()
            .then((data) => setLastProducts(data?.products))
            .catch(() => setLastProducts([]));

        getCategories()
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));

        // Get Collections
        getCollections()
            .then((data) => setCollections(data))
            .catch(() => setCollections([]));

        // Get Genders
        getGenders()
            .then((data) => setGenders(data))
            .catch(() => setGenders([]));
    }, [])

    return (
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <h1 className="text-xl font-[Panchang-Semibold] pb-2">{t("logs")}</h1>
                <p className="text-md font-[Panchang-Regular] pb-2">{t("lastCreatedUsers")}:</p>
                <div className="mt-2">
                    <Table
                        columns={userColumns}
                        data={userData}
                    />
                </div>

                <p className="text-md font-[Panchang-Regular] pb-2 pt-5">{t("lastCreatedOrders")}:</p>
                <Table
                    columns={orderColumns}
                    data={orderData}
                />

                <p className="text-md font-[Panchang-Regular] pb-2 pt-5">{t("lastCreatedProducts")}:</p>
                <Table
                    columns={productColumns}
                    data={productData}
                />
            </div>
    )
}