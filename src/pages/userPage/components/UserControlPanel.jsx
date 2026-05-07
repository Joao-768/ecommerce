import { getLastOrder, getTotalItems } from "../../../api/ordersApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../api/usersApi";

import { FaMapLocationDot, FaGear } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { LuWatch } from "react-icons/lu";
import { formatDate } from "../../../utils/format";

export default function UserControlPanel() {
    const account = localStorage.getItem("account");
    const [order, setOrder] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getLastOrder(account)
            .then((data) => setOrder(data))
            .catch(() => setOrder(null));

        getUserById(account)
            .then((data) => setUser(data))
            .catch(() => setUser(null));
    }, [account]);

    useEffect(() => {
        if (!order?.id) return;

        getTotalItems(order.id)
            .then((data) => setTotalItems(data?.totalItems ?? 0))
            .catch(() => setTotalItems(0));
    }, [order?.id]);

    function currency(price) {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    return (
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col">
            {/* Title */}
            <h1 className="text-3xl font-[Panchang-Semibold] mb-10">
                Hello {user ? `${user.name} ${user.surname}` : `User ${account ?? ""}`}   
            </h1>
            <p className="text-xs -mt-8 font-[Panchang-Regular]">
                In your control panel you can manage your personal information, view your watches and check your orders.
            </p>

            {/* Quick Access */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full pt-8 pb-3">
                {/* Most Recent Order */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md">
                    <BiSolidPackage className="absolute right-6 bottom-4 text-stone-200 text-[120px] pointer-events-none" />

                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">
                        Most Recent Order
                    </h2>

                    {order ? (
                        <div className="relative z-10 mt-2 font-[Panchang-Regular]">
                            <p className="text-xs">Order #{order.id}</p>
                            <p className="text-xs">Items: {totalItems ?? 0}</p>
                            <p className="text-xs">Total: {currency(order.total_price)}</p>
                            <p className="text-xs">Date: {formatDate(order.created_at)}</p>

                            <button className="mt-3 text-xs hover:underline hover:cursor-pointer"
                                onClick={() => navigate(`/user-page/orders/${order.id}/view`)}
                            >
                                View details
                            </button>
                        </div>
                    ) : (
                        <h4 className="text-xs font-[Panchang-Regular] relative z-10">
                            There are no orders.
                        </h4>
                    )}
                </div>

                {/* Adresses */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md">
                    <FaMapLocationDot className="absolute right-6 bottom-4 text-stone-200 text-[120px] pointer-events-none" />
                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">My Adresses</h2>
                    <button 
                        className="text-xs font-[Panchang-Regular] hover:underline relative z-10 cursor-pointer" 
                        onClick={() => navigate("/user-page/personal-info")}
                    >
                        Manage My Adresses
                    </button>
                </div>

                {/* Register Watch */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md">
                    <LuWatch className="absolute right-6 bottom-4 text-stone-200 text-[120px] pointer-events-none"/>
                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">Register My Watch</h2>
                    <button 
                        className="absolute left-10 bottom-10 px-3 min-w-20 h-12 text-sm font-[Panchang-Regular] bg-black text-white border-2 border-black rounded-md hover:bg-white hover:text-black transition-all duration-200 z-10 cursor-pointer"
                        onClick={() => navigate("/user-page/collection")}
                    >
                        Register Watch
                    </button>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md">
                    <FaGear className="absolute right-6 bottom-4 text-stone-200 text-[120px] pointer-events-none"/>
                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">Manage My Preferences</h2>
                    <button 
                        className="absolute bottom-10 px-3 min-w-20 h-12 text-sm font-[Panchang-Regular] bg-black text-white border-2 border-black rounded-md hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
                        onClick={() => navigate("/user-page/preferences")}
                    >
                        Manage
                    </button>
                </div>
            </div>
        </div>
    );
}
