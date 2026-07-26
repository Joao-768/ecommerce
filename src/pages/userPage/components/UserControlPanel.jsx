import { getLastOrder, getTotalItems } from "../../../api/ordersApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/usersApi";

import { FaMapLocationDot, FaGear } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";
import { LuWatch } from "react-icons/lu";
import { formatDate } from "../../../utils/format";
import { Button, GhostButton } from "../../../ui/Buttons";

import { useTranslation } from "react-i18next";

export default function UserControlPanel() {
    const account = localStorage.getItem("account");
    const [order, setOrder] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [user, setUser] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!account) return;

        getLastOrder(account)
            .then((data) => setOrder(data))
            .catch(() => setOrder(null));

        getCurrentUser()
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
                {t("hello")} {`${user?.name} ${user?.surname}`}
            </h1>
            <p className="text-xs -mt-8 font-[Panchang-Regular]">
                {t("myControlPanelDescription")}
            </p>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pb-3">
                {/* Most Recent Order */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md min-h-48">
                    <BiSolidPackage className="absolute right-6 bottom-4 text-stone-200 h-25 w-25 pointer-events-none" />

                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">
                        {t("myOrders")}
                    </h2>

                    {order ? (
                        <div className="relative z-10 mt-2 font-[Panchang-Regular]">
                            <p className="text-xs">{t("order")} #{order.id}</p>
                            <p className="text-xs">{t("items")}: {totalItems ?? 0}</p>
                            <p className="text-xs">{t("total")}: {currency(order.total_price)}</p>
                            <p className="text-xs">{t("date")}: {formatDate(order.created_at)}</p>

                            <GhostButton
                                className="mt-3 text-xs"
                                onClick={() => navigate(`/user-page/orders/${order.id}/view`)}
                            >
                                {t("viewDetails")}
                            </GhostButton>
                        </div>
                    ) : (
                        <h4 className="text-xs font-[Panchang-Regular] relative z-10">
                            {t("noOrders")}
                        </h4>
                    )}
                </div>

                {/* Adresses */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md min-h-48">
                    <FaMapLocationDot className="absolute right-6 bottom-4 text-stone-200 h-25 w-25 pointer-events-none" />
                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">{t("myAdresses")}</h2>
                    <GhostButton
                        className="text-xs relative z-10"
                        onClick={() => navigate("/user-page/personal-info")}
                    >
                        {t("manageMyAdresses")}
                    </GhostButton>
                </div>

                {/* Register Watch */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md min-h-48">
                    <LuWatch className="absolute right-6 bottom-4 text-stone-200 h-25 w-25 pointer-events-none"/>
                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">{t("registerMyWatch")}</h2>
                    <Button
                        className="absolute left-10 bottom-10 px-3 min-w-20"
                        onClick={() => navigate("/user-page/collection")}
                    >
                        {t("registerWatch")}
                    </Button>

                </div>

                {/* Preferences */}
                <div className="bg-white rounded-lg p-10 relative overflow-hidden shadow-md min-h-48">
                    <FaGear className="absolute right-6 bottom-4 text-stone-200 h-25 w-25 pointer-events-none"/>
                    <h2 className="text-lg font-[Panchang-Semibold] relative z-10">{t("manageMyPreferences")}</h2>
                    <Button
                        className="absolute bottom-10 px-3 min-w-20"
                        onClick={() => navigate("/user-page/preferences")}
                    >
                        {t("manage")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
