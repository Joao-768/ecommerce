import { useEffect, useState } from "react";
import { deleteAddress, getAddresses, getUserById, updateUser } from "../../../../api/usersApi";
import { useNavigate } from "react-router-dom";
import Table from "../../../../ui/Table";
import { useTranslation } from "react-i18next";
import { Button, GhostButton } from "../../../../ui/Buttons";
import { FormInput } from "../../../../ui/Form";

export default function UserInfo() {
    const account = localStorage.getItem("account");
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const columns = [
        { key: "street", label: t("street") },
        { key: "postal_code", label: t("postalCode") },
        { key: "city", label: t("city") },
        { key: "district", label: t("district") },
        { key: "country", label: t("country") },

        {
            key: "actions",
            label: t("actions"),
            render: (row) => (
                <div className="flex flex-col gap-1">
                    <GhostButton className="text-left text-sm" onClick={() => navigate(`${row.id}/edit`)}>{t("edit")}</GhostButton>
                    <GhostButton className="text-left text-sm" onClick={() => handleDeleteAddress(row.id)}>{t("delete")}</GhostButton>
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
                date: new Date(user.date_of_birth).toLocaleDateString("en-CA"),
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
        alert(t("dataUpdated"));
    };

    function handleDeleteAddress(id) {
        deleteAddress(id);
        alert(t("addressDeleted"))
    }

    return(
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-[Panchang-Semibold]">{t("myPersonalInformation")}</h1>
                <p className="text-xs text-stone-500 font-[Panchang-Regular] mt-2">
                    {t("myPersonalInformationDescription")}
                </p>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <h2 className="text-lg font-[Panchang-Semibold] pb-2">{t("myAccount")}</h2>
                
                <div className="grid grid-cols-2 gap-6">

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">{t("email")}</label>
                        <FormInput type="text" name="email" value={form.email} onChange={handleChange} className="w-full h-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20" />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-2 items-start">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">{t("dateOfBirth")}</label>
                        <FormInput type="date" name="date" value={form.date} onChange={handleChange} className="w-full h-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20" />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">{t("name")}</label>
                        <FormInput type="text" name="name" value={form.name} onChange={handleChange} className="w-full h-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20" />
                    </div>

                    {/* Surname */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">{t("surname")}</label>
                        <FormInput type="text" name="surname" value={form.surname} onChange={handleChange} className="w-full h-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20" />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Button shape="pill" onClick={handleUpdateUserInfo}>{t("updateMyAccount")}</Button>
                    <Button shape="pill" variant="secondary" onClick={() => navigate("/user-page/personal-info/password")}>{t("changeMyPassword")}</Button>
                </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-[Panchang-Semibold]">{t("myAdresses")}</h2>
                    <GhostButton className="text-sm" onClick={() => navigate("/user-page/personal-info/add")}>{t("addAddress")}</GhostButton>
                </div>

                {!addresses || addresses.length === 0 ? ( 
                    <div className="mt-6 h-48 flex items-center justify-center text-xs text-stone-500 bg-stone-100 rounded-xl">
                        {t("noAddressesYet")}
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