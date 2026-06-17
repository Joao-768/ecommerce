import { useEffect, useState } from 'react';
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getTotalOrders } from "../../../../api/ordersApi";
import { formatCurrency } from '../../../../utils/format';
import Table from '../../../../ui/Table';
import { useTranslation } from 'react-i18next';

export default function OrdersManagement() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const columns = [
        { key: "orderId", label: t("orderId") },
        { key: "name", label: t("name") },
        { key: "surname", label: t("surname") },
        { key: "total_price", label: t("totalPrice") },
        { key: "status", label: t("status") },
        { key: "created_at", label: t("date") },
        {
            key: "actions",
            label: t("action"),
            render: (row) => (
                <button
                    onClick={() => navigate(`${row.id}/edit`)}
                    className="hover:underline text-left"
                >
                    {t("edit")}
                </button>
            )
        }
    ];

    const data = searchResults.map((order) => ({
        id: order.id,
        orderId: `# ${order.id}`,
        name: order.name,
        surname: order.surname,
        total_price: formatCurrency(order.total_price),
        status: order.status,
        created_at: order.created_at?.slice(0, 10) || "",
    }));

    useEffect(() => {
        getTotalOrders()
            .then((data) => setTotalOrders(data.totalOrders))
            .catch(() => setTotalOrders(0));

        getAllOrders()
            .then((data) => {
                setOrders(data);
                setSearchResults(data);
            })
            .catch(() => {
                setOrders([]);
                setSearchResults([]);
            });
    }, []);


    const handleSearch = (value) => {
        setSearchQuery(value);

        const filtered = orders.filter((user) =>
            user.name
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setSearchResults(filtered);
    };

    return (
        <div className="flex-1 pl-10 flex flex-col gap-5 pr-10">

            {/* Stats */}
            <h1 className="text-3xl font-[Panchang-Semibold]">{t("orderManagement")}</h1>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <p className="text-md font-[Panchang-Regular] pb-2">{t("totalOrders")}: {totalOrders}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">{t("paidOrders")}: {orders.filter(order => order.status === "paid").length}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">{t("shippedOrders")}: {orders.filter(order => order.status === "shipped").length}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">{t("deliveredOrders")}: {orders.filter(order => order.status === "delivered").length}</p>
                <p className="text-md font-[Panchang-Regular] pb-2">{t("cancelledOrders")}: {orders.filter(order => order.status === "cancelled").length}</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder={t("orderSearch")}
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md"
                    />
                </div>

                <Table 
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}
