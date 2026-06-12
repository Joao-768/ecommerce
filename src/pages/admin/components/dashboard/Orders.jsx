import { useState, useEffect } from "react";
import { getAllOrders, getTotalOrders } from "../../../../api/ordersApi";
import Table from "../../../../ui/Table";
import { formatDate } from "../../../../utils/format";

export default function Orders() {
    // Orders
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
        { key: "orderId", label: "Order Id" },
        { key: "name", label: "Name" },
        { key: "surname", label: "Surname" },
        { key: "totalPrice", label: "Total Price" },
        { key: "createdAt", label: "Date" },
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
            <h1 className="text-xl font-[Panchang-Semibold] pb-2">Orders</h1>
            <p className="text-md font-[Panchang-Regular] pb-2">Total orders: {totalOrders}</p>
            <p className="text-md font-[Panchang-Regular] pb-2">Total Sales: {totalSales}</p>
            <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-md border border-stone-100">
                <button
                    className={`${ordersSection === "paid" ? "text-black" : "text-stone-600"} cursor-pointer flex-1 text-center font-[Panchang-Semibold] -ml-15`}
                    onClick={() => setOrdersSection("paid")}
                >
                    Paid
                </button>
                <button
                    className={`${ordersSection === "shipped" ? "text-black" : "text-stone-600"} cursor-pointer flex-1 text-center font-[Panchang-Semibold]`}
                    onClick={() => setOrdersSection("shipped")}
                >
                    Shipped
                </button>
                <button
                    className={`${ordersSection === "delivered" ? "text-black" : "text-stone-600"} cursor-pointer flex-1 text-center font-[Panchang-Semibold]`}
                    onClick={() => setOrdersSection("delivered")}
                >
                    Delivered
                </button>
            </div>

            <Table
                columns={columns}
                data={data}
            />
        </div>
    )
}