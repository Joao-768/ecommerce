import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAddress } from "../../../../api/usersApi";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../ui/Buttons";
import { FormInput } from "../../../../ui/Form";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper";

export default function AddAddress() {
    const account = localStorage.getItem("account");
    const navigate = useNavigate();
const { t } = useTranslation();

    const [form, setForm] = useState({
        street: "",
        city: "",
        postal_code: "",
        district: "",
        country: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-start pt-10 h-full w-3/4">
            <AdminFormWrapper title={t("addAddress")}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await createAddress(account, form);
                        alert(t("addressCreated"));
                        navigate("/user-page/personal-info");
                    }}
                    className="grid grid-cols-2 gap-6"
                >
                    <FormInput type="text" name="street" value={form.street} onChange={handleChange} placeholder={t("street")} className="col-span-2 w-full" />
                    <FormInput type="text" name="city" value={form.city} onChange={handleChange} placeholder={t("city")} className="w-full" />
                    <FormInput type="text" name="postal_code" value={form.postal_code} onChange={handleChange} placeholder={t("postalCode")} className="w-full" />
                    <FormInput type="text" name="district" value={form.district} onChange={handleChange} placeholder={t("district")} className="w-full" />
                    <FormInput type="text" name="country" value={form.country} onChange={handleChange} placeholder={t("country")} className="w-full" />

                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/user-page/personal-info")}>{t("cancel")}</Button>
                        <Button shape="pill" type="submit">{t("save")}</Button>
                    </div>
                </form>
            </AdminFormWrapper>
        </div>
    );
}