import { useEffect, useState } from "react";
import { getTotalUsers, getTotalAdmins, getLastActiveUsers, getAllUsers, getBlockedUsers, deleteUser } from "../../../../api/adminApi";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Table from "../../../../ui/Table";

export default function UserManagement() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [blockedUsers, setBlockedUsers] = useState(0);
    const [admins, setAdmins] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { key: "name", label: "Name" },
        { key: "surname", label: "Surname" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => navigate(`${row.id}/edit`)}
                        className="hover:underline text-left"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(row.id)}
                        className="hover:underline text-left"
                    >
                        Delete
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

            // remover da lista
            setSearchResults(prev => prev.filter(user => user.id !== id));
            setAllUsers(prev => prev.filter(user => user.id !== id));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Total Users
        getTotalUsers()
            .then((data) => setTotalUsers(data?.totalUsers ?? 0))
            .catch(() => setTotalUsers(0));

        // Total Admins
        getTotalAdmins()
            .then((data) => setAdmins(data?.totalAdmins ?? 0))
            .catch(() => setAdmins(0));

        // Last Active Users
        getLastActiveUsers()
            .then((data) => setActiveUsers(data?.activeUsers ?? 0))
            .catch(() => setActiveUsers(0));

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

        // Blocked Users
        getBlockedUsers()
            .then((data) => setBlockedUsers(data?.blockedUsers ?? 0))
            .catch(() => setBlockedUsers(0));
    }, []);

    return (
        <>
            <div className="flex-1 pl-10 my-10 flex flex-col gap-5 pr-10">
                <h1 className="text-3xl font-[Panchang-Semibold]">User Management</h1>
                
                {/* Stats */}
                <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                    <p className="text-md font-[Panchang-Regular] pb-2">Total Users: {totalUsers}</p>
                    <p className="text-md font-[Panchang-Regular] pb-2">Active Users: {activeUsers}</p>
                    <p className="text-md font-[Panchang-Regular] pb-2">Blocked Users: {blockedUsers}</p>
                    <p className="text-md font-[Panchang-Regular] pb-2">Admins: {admins}</p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 mt-5">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search for a User"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md"
                        />
                        <button
                            className="border border-black px-4 py-3 bg-transparent focus:outline-none rounded-full font-[Panchang-Regular] shadow-md hover:bg-black hover:text-white duration-200"
                            onClick={() => navigate("add")}
                        >
                            Add New User
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={data}
                    />

                </div>
            </div>
        </>
    );
}
