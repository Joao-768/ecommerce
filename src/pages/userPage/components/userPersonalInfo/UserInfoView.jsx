import { useEffect, useState } from "react";
import { deleteAddress, getAddresses, getUserById, updateUser } from "../../../../api/usersApi";
import { useNavigate } from "react-router-dom";
import Table from "../../../../ui/Table";
import { formatDate } from "../../../../utils/format";

export default function UserInfo() {
    const account = localStorage.getItem("account");
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const columns = [
    { key: "street", label: "Street" },
    { key: "postal_code", label: "Postal Code" },
    { key: "city", label: "City" },
    { key: "district", label: "District" },
    { key: "country", label: "Country" },

    {
        key: "actions",
        label: "Actions",
        render: (row) => (
            <div className="flex flex-col gap-1">
                <button
                    onClick={() =>
                        navigate(`${row.id}/edit`)
                    }
                    className="hover:underline text-left"
                >
                    Edit
                </button>

                <button
                    onClick={() => handleDeleteAddress(row.id)}
                    className="hover:underline text-left"
                >
                    Delete
                </button>
            </div>
        )
    }
];

    const data = addresses.map(addr => ({
        id: addr.id,
        street: addr.street,
        postal_code: addr.postal_code,
        city: addr.city,
        district: addr.district,
        country: addr.country,
    }));

    const [form, setForm] = useState({
        email: "",
        date: "",
        name: "",
        surname: ""
    });

    useEffect(() => {
        getUserById(account)
            .then((data) => setUser(data))
            .catch(() => setUser([]));
    }, [account])

    useEffect(() => {
        if (user) {
            setForm({
                email: user.email || "",
                date: formatDate(user.date_of_birth),
                name: user.name || "",
                surname: user.surname || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (!account) return;

        getAddresses(account)
            .then((data) => setAddresses(data))
            .catch(() => setAddresses([]));
    }, [account]);

    function handleUpdateUserInfo() {
        updateUser(
            account,
            form.name,
            form.surname,
            form.email,
            null,
            form.date,
            "user"
        );
        alert("Data updated successfully");
    };

    function handleDeleteAddress(id) {
        deleteAddress(id);
        alert("Address successfully deleted")
    }

    return(
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-[Panchang-Semibold]">My Personal Information</h1>
                <p className="text-xs text-stone-500 font-[Panchang-Regular] mt-2 max-w-xl">
                    View and manage your profile. Update your details and addresses any time.
                </p>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <h2 className="text-lg font-[Panchang-Semibold] pb-2">My Account</h2>
                <div className="grid grid-cols-2 gap-6">

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="h-10 px-4 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-2 items-start">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">Date of Birth</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full h-10 px-4 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="h-10 px-4 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>

                    {/* Surname */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={form.surname}
                            onChange={handleChange}
                            className="h-10 px-4 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <button 
                        className="px-5 py-2 rounded-full bg-black text-white text-sm font-[Panchang-Regular] border border-black hover:bg-white hover:text-black transition-all duration-200"
                        onClick={handleUpdateUserInfo}
                    >
                        Update My Account
                    </button>
                    <button 
                        className="px-5 py-2 rounded-full bg-white text-black text-sm font-[Panchang-Regular] border border-black hover:bg-black hover:text-white transition-all duration-200"
                        onClick={() => navigate("/user-page/personal-info/password")}
                    >
                        Change My Password
                    </button>
                </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-[Panchang-Semibold]">My Addresses</h2>
                    <button 
                        className="text-sm hover:underline font-[Panchang-Regular] cursor-pointer"
                        onClick={() => navigate("/user-page/personal-info/add")}
                    >
                        Add
                    </button>
                </div>

                {!addresses || addresses.length === 0 ? ( 
                    <div className="mt-6 h-48 flex items-center justify-center text-xs text-stone-500 bg-stone-100 rounded-xl">
                        No addresses yet
                    </div> 
                ) : (
                    <div className="mt-5">
                        <Table 
                            columns={columns} 
                            data={data} 
                        />
                    </div>
                )}
            </div>
        </div>
    )
}