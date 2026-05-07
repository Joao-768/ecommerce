import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useScrollToTop } from '../../utils/format';

// Components
import UserControlPanel from './components/UserControlPanel';
import UserCollection from './components/userCollection/UserCollection';
import UserCollectionAdd from './components/userCollection/UserCollectionAdd';
import UserOrders from './components/userOrders/UserOrders';
import UserPreferences from './components/userPreferences';
import { useEffect } from 'react';
import { getUserRole } from '../../api/usersApi';

export default function UserPage() {
    const account = localStorage.getItem("account");
    const { t } = useTranslation();

    const navigate = useNavigate();
    
    useScrollToTop();

    const location = useLocation();

    const sidebarOptions = [
        { key: "controlPanel", label: "myControlPanel", path: "control-panel" },
        { key: "personalInfo", label: "myPersonalInformation", path: "personal-info" },
        { key: "collection", label: "myCollection", path: "collection" },
        { key: "orders", label: "myOrders", path: "orders" },
        { key: "preferences", label: "myPreferences", path: "preferences" },
    ];

    function logout() {
        localStorage.removeItem("account");
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

                if (role !== "user") {
                    navigate("/admin");
                }
            })
            .catch(() => {
                localStorage.removeItem("account");
                navigate("/login");
            });

    }, [account, navigate]);

    return (
        <div className="min-h-screen w-screen flex pl-14 pt-46">

            {/* Sidebar */}
            <div className="w-72 sticky top-46 pt-10 border-r text-sm flex flex-col gap-10 font-[Panchang-Regular]">

                {sidebarOptions.map((opt) => (
                    <button
                        key={opt.key}
                        className={`cursor-pointer text-left w-full ${
                            location.pathname.startsWith(`/user-page/${opt.path}`)
                                ? "font-[Panchang-Semibold]"
                                : ""
                        }`}
                        onClick={() => navigate(`/user-page/${opt.path}`)}
                    >
                        {t(opt.label)}
                    </button>
                ))}

                <button 
                    className="cursor-pointer text-left"
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