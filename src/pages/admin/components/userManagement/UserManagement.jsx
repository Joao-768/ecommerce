import { useEffect, useState } from "react";
import { getUserStats, deleteUser } from "../../../../api/adminApi";
import { getAllUsers } from "../../../../api/usersApi";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Table from "../../../../ui/Table";
import { useTranslation } from "react-i18next";

export default function UserManagement() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [blockedUsers, setBlockedUsers] = useState(0);
    const [admins, setAdmins] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const columns = [
        { key: "name", label: t("name") },
        { key: "surname", label: t("surname") },
        { key: "email", label: t("email") },
        { key: "role", label: t("role") },
        { key: "status", label: t("status") },
        {
            key: "actions",
            label: t("actions"),
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => navigate(`${row.id}/edit`)}
                        className="hover:underline text-left"
                    >
                        {t("edit")}
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="hover:underline text-left"
                    >
                        {t("delete")}
                    </button>
                </div>
            )
        }
    ];

    const data = searchResults.map((user) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        status: user.status,
    }));

    const handleSearch = (value) => {
        setSearchQuery(value);
        const filtered = allUsers.filter((user) =>
            `${user.name} ${user.surname} ${user.email}`
                .toLowerCase()
                .includes(value.toLowerCase())
        );
        setSearchResults(filtered);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are You Sure?")) return;
        try {
            await deleteUser(id);
            setSearchResults(prev => prev.filter(user => user.id !== id));
            setAllUsers(prev => prev.filter(user => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserStats()
            .then((data) => {
                setTotalUsers(data?.totalUsers ?? 0);
                setAdmins(data?.totalAdmins ?? 0);
                setActiveUsers(data?.activeUsers ?? 0);
                setBlockedUsers(data?.blockedUsers ?? 0);
            })
            .catch(() => {
                setTotalUsers(0);
                setAdmins(0);
                setActiveUsers(0);
                setBlockedUsers(0);
            });

        // All Users
        getAllUsers()
            .then((data) => {
                const users = data?.users ?? [];
                setAllUsers(users);
                setSearchResults(users);
            })
            .catch(() => {
                setAllUsers([]);
                setSearchResults([]);
            });
    }, []);

    return (
        <>
            <div className="flex-1 pl-10 flex flex-col gap-5 pr-10">
                <h1 className="text-3xl font-[Panchang-Semibold]">{t("userManagement")}</h1>
                
                <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                    <p className="text-md font-[Panchang-Regular] pb-2">{t("totalUsers")}: {totalUsers}</p>
                    <p className="text-md font-[Panchang-Regular] pb-2">{t("activeUsers")}: {activeUsers}</p>
                    <p className="text-md font-[Panchang-Regular] pb-2">{t("blockedUsers")}: {blockedUsers}</p>
                    <p className="text-md font-[Panchang-Regular] pb-2">{t("admins")}: {admins}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder={t("searchForUser")}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md"
                        />
                        <button
                            className="border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md hover:bg-black hover:text-white duration-200"
                            onClick={() => navigate("add")}
                        >
                            {t("addNewUser")}
                        </button>
                    </div>
                    <Table columns={columns} data={data} />
                </div>
            </div>
        </>
    );
}