import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserOrdersItems } from "../../../../api/ordersApi";
import Table from "../../../../ui/Table";

export default function ViewOrder() {
    const { id } = useParams();
    const [orderItems, setOrderItems] = useState([]);

    const columns = [
        { key: "name", label: "Name" },
        { key: "price", label: "Price" },
    ];

    const data = orderItems.map((orderItems) => ({
        name: orderItems.name,
        price: orderItems.price,
    }));

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        getUserOrdersItems(id)
            .then((data) => setOrderItems(data))
            .catch(() => setOrderItems([]));
    }, [id]);

    return(
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-2">
            {/* Header */}
            <button
                className="inline-flex items-center gap-2 text-sm font-[Panchang-Regular] text-stone-500 hover:underline"
                onClick={() => navigate('/user-page/orders')}
            >
                <IoArrowBackOutline />
                Back to orders
            </button>
            <h1 className="text-3xl font-[Panchang-Semibold]">
                Your Order Items
            </h1>
            <p className="text-xs font-[Panchang-Regular]">
                Below are the items included in your order.
            </p>

            <div className="bg-white rounded-2xl pl-4 pb-4 pr-4 pt-1 shadow-md border border-stone-100">
                <Table
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}