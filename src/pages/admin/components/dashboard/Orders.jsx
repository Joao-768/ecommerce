import { useState, useEffect } from "react";
import { getAllOrders, getTotalOrders } from "../../../../api/ordersApi";
import Table from "../../../../ui/Table";
import { formatDate } from "../../../../utils/format";
import { useTranslation } from "react-i18next";

export default function Orders() {
    const { t } = useTranslation();
    const [totalOrders, setTotalOrders] = useState();
    const [ordersSection, setOrdersSection] = useState("paid");
    const [paid, setPaid] = useState([]);
    const [shipped, setShipped] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const ordersToShow =
    ordersSection === "paid"
        ? paid
        : ordersSection === "shipped"
        ? shipped
        : delivered;

    const columns = [
        { key: "orderId", label: t("orderId") },
        { key: "name", label: t("name") },
        { key: "surname", label: t("surname") },
        { key: "totalPrice", label: t("totalPrice") },
        { key: "createdAt", label: t("createdAt") },
    ];

    const data = ordersToShow.map((order) => ({
        id: order.id,
        orderId: "#" + order.id,
        name: order.name,
        surname: order.surname,
        totalPrice: order.total_price,
        createdAt: formatDate(order.created_at),
    }));
    useEffect(() => {
        // Get Total Orders
        getTotalOrders()
            .then((data) => setTotalOrders(data?.totalOrders ?? 0))
            .catch(() => setTotalOrders(0));

        getAllOrders()
            .then((data) => {
                const orders = data;

                const deliveredOrders = orders.filter(order => order.status === "delivered");

                setPaid(orders.filter(order => order.status === "paid"));
                setShipped(orders.filter(order => order.status === "shipped"));
                setDelivered(deliveredOrders);

                setTotalSales(deliveredOrders.length);
            })
            .catch(() => {
                setTotalSales(0);
                setPaid([]);
                setShipped([]);
                setDelivered([]);
            });
            
    }, [])

    return (
        <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
            <h1 className="text-xl font-[Panchang-Semibold] pb-2">{t("orders")}</h1>
            <p className="text-md font-[Panchang-Regular] pb-2">{t("totalOrders")}: {totalOrders}</p>
            <p className="text-md font-[Panchang-Regular] pb-2">{t("totalSales")}: {totalSales}</p>
            <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-md border border-stone-100">
                <button
                    className={`${ordersSection === "paid" ? "text-black" : "text-stone-600"} cursor-pointer flex-1 text-center font-[Panchang-Semibold] -ml-15`}
                    onClick={() => setOrdersSection("paid")}
                >
                    {t("paid")}
                </button>
                <button
                    className={`${ordersSection === "shipped" ? "text-black" : "text-stone-600"} cursor-pointer flex-1 text-center font-[Panchang-Semibold]`}
                    onClick={() => setOrdersSection("shipped")}
                >
                    {t("shipped")}
                </button>
                <button
                    className={`${ordersSection === "delivered" ? "text-black" : "text-stone-600"} cursor-pointer flex-1 text-center font-[Panchang-Semibold]`}
                    onClick={() => setOrdersSection("delivered")}
                >
                    {t("delivered")}
                </button>
            </div>

            <Table
                columns={columns}
                data={data}
            />
        </div>
    )
}