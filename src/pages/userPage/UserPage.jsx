import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useScrollToTop } from '../../utils/format';

// Componen
import UserControlPanel from './components/UserControlPanel';
import UserCollection from './components/userCollection/UserCollection';
import UserCollectionAdd from './components/userCollection/UserCollectionAdd';
import UserOrders from './components/userOrders/UserOrders';
import UserPreferences from './components/userPreferences';
import { useEffect } from 'react';
import { getUserRole } from '../../api/usersApi';
import { NavButton } from '../../ui/Buttons';

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
        <div className="min-h-screen w-screen flex pl-4 lg:pl-14 pt-46">

            {/* Sidebar */}
            <div className="w-40 lg:w-72 shrink-0 sticky top-46 pt-10 border-r text-sm flex flex-col gap-10 font-[Panchang-Regular]">

                {sidebarOptions.map((opt) => (
                    <NavButton
                        key={opt.key}
                        className={`text-left w-full active:scale-100 ${
                            location.pathname.startsWith(`/user-page/${opt.path}`)
                                ? "font-[Panchang-Semibold]"
                                : ""
                        }`}
                        onClick={() => navigate(`/user-page/${opt.path}`)}
                    >
                        {t(opt.label)}
                    </NavButton>
                ))}

                <NavButton className="text-left active:scale-100" onClick={logout}>
                    {t("logout")}
                </NavButton>
            </div>

            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>

        </div>
    );
}