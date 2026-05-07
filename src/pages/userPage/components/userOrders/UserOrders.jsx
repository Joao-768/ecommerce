import { useTranslation } from "react-i18next";
import { getUserOrders } from "../../../../api/ordersApi.js";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Table from "../../../../ui/Table.jsx";
import { formatDate } from "../../../../utils/format.js";

export default function UserOrders() {
    const account = localStorage.getItem("account");
    const [orders, setOrders] = useState([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const columns = [
        { key: "order_id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "total_price", label: "Total Price" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Purchase Date" },
        { 
            key: "actions", 
            label: "Actions" 
            , render: (row) => (
                <div className="flex flex-col gap-1">
                    <button 
                        className="hover:underline text-left hover:cursor-pointer"
                        onClick={() => navigate(`/user-page/orders/${row.id}/view`)}
                    >
                        View Details
                    </button>
                </div>
            )
        },
    ];

    const data = orders.map((order) => ({
        id: order.id,
        order_id: `# ${order.id}`,
        name: order.name,
        total_price: order.total_price,
        status: order.status,
        created_at: formatDate(order.created_at),
    }));

    useEffect(() => {
        getUserOrders(account)
            .then((data) => setOrders(data))
            .catch(() => setOrders([]));
    }, [account]);

    return (
        <div className="flex-1 pl-10 pr-10 pt-4 pb-3 flex flex-col gap-4">
            <h1 className="text-3xl font-[Panchang-Semibold]">
                {t("myOrders")}
            </h1>
            <p className="text-xs font-[Panchang-Regular]">
                {orders.length === 0 ? t("myOrdersDescription") : "Your Orders"}
            </p>

            <div className="bg-white rounded-2xl pl-5 pr-5 pb-5 pt-1 shadow-md border border-stone-100">
                <Table
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}
