
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserRole } from '../../api/usersApi';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

// Import Sections
import Dashboard from './components/dashboard/Dashboard';
import UserManagement from './components/userManagement/UserManagement';
import ProductManagement from './components/productManagement/ProductManagement';
import CollectionManagement from './components/collectionManagement/CollectionManagement';
import OrderManagement from './components/orderManagement/OrderManagement';
import { useScrollToTop } from '../../utils/format';

export default function Admin() {
    const account = localStorage.getItem("account");
    const { t } = useTranslation();
    const location = useLocation();

    const sidebarOptions = [
        { key: "dashboard", label: t("dashboard"), path:"dashboard"},
        { key: "userManagement", label: t("userManagement"), path: "user-management"},
        { key: "productManagement", label: t("productManagement"), path:"product-management"},
        { key: "collectionManagement", label: t("collectionManagement"), path:"collection-management"},
        { key: "orderManagement", label: t("orderManagement"), path:"order-management"},
    ];

    const navigate = useNavigate();

    useScrollToTop();

    function logout() {
        localStorage.removeItem('account'); 
        navigate('/login');
    }

    useEffect(() => {
        if (!account) {
            navigate("/login");
            return;
        }

        getUserRole(account)
            .then((data) => {
                const role = data.userRole;

                if (role === "user") {
                    navigate("/user-page/control-panel");
                } else if (role !== "admin") {
                    navigate("/login");
                }
            })
            .catch(() => navigate("/login"));

    }, [account, navigate]);


    return(
        <div className="min-h-screen w-screen flex pl-14 pt-46">
            {/* Sidebar with user options */}
            <div className="w-72 sticky top-46 pt-10 h-screen border-r text-sm flex flex-col gap-10 font-[Panchang-Regular]">
                {sidebarOptions.map((opt) => (
                    <button
                        key={opt.key}
                        className={`cursor-pointer text-left w-full ${
                            location.pathname.startsWith(`/admin/${opt.path}`)
                                ? "font-[Panchang-Semibold]"
                                : ""
                        }`}
                        onClick={() => navigate(`/admin/${opt.path}`)}
                    >
                        {t(opt.label)}
                    </button>
                ))}
                <button className='cursor-pointer text-left' 
                    onClick={logout}
                >
                    {t("logout")}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
