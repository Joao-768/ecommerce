import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserOrdersItems } from "../../../../api/ordersApi";
import { GhostButton } from "../../../../ui/Buttons";
import ProductGrid from "../../../../ui/ProductGrid";

export default function ViewOrder() {
    const { id } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getUserOrdersItems(id)
            .then((data) => setOrderItems(data))
            .catch(() => setOrderItems([]));
    }, [id]);

    return (
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-2">
            <GhostButton
                className="inline-flex items-center gap-2 text-sm text-stone-500 active:scale-100"
                onClick={() => navigate('/user-page/orders')}
            >
                <IoArrowBackOutline />
                Back to orders
            </GhostButton>
            <h1 className="text-3xl font-[Panchang-Semibold]">Your Order Items</h1>
            <p className="text-xs font-[Panchang-Regular]">
                Below are the items included in your order.
            </p>

            <ProductGrid
                products={orderItems}
                isSelling={false}
                showSize
                className="flex flex-wrap gap-6 justify-start"
            />
        </div>
    );
}