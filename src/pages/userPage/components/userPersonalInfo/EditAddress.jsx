import { useNavigate, useParams } from "react-router-dom";
import { getAddresses, updateAddress } from "../../../../api/usersApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../ui/Buttons";
import { FormInput } from "../../../../ui/Form";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper";

export default function EditAddress() {
    const account = localStorage.getItem("account");
    const [editAddress, setEditAddress] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [addresses, setAddresses] = useState([]);
const { t } = useTranslation();

    useEffect(() => {
        getAddresses(account)
            .then((data) => setAddresses(data));
    }, [account]);

    useEffect(() => {

        const found = addresses.find(
            addr => addr.id === parseInt(id)
        );

        if (found) {
            setEditAddress(found);
        }
    }, [addresses, id]);

    const editHandleChange = (e) => {
        const { name, value } = e.target;

        setEditAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!editAddress) {
        return (
            <div className="flex justify-center items-center h-full">
                {t("loading")}
            </div>
        );
    }

    return(
        <div className="flex justify-center items-start pt-10 align h-full w-3/4">
            <AdminFormWrapper title={t("editAddress")}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await updateAddress(editAddress.id, editAddress.street, editAddress.city, editAddress.postal_code, editAddress.district, editAddress.country);
                        alert(t("addressEdited"));
                        navigate("/user-page/personal-info");
                    }}
                    className="grid grid-cols-2 gap-6"
                >
                    <FormInput type="text" name="street" value={editAddress.street} onChange={editHandleChange} placeholder={t("street")} className="col-span-2 w-full" />
                    <FormInput type="text" name="city" value={editAddress.city} onChange={editHandleChange} placeholder={t("city")} className="w-full" />
                    <FormInput type="text" name="postal_code" value={editAddress.postal_code} onChange={editHandleChange} placeholder={t("postalCode")} className="w-full" />
                    <FormInput type="text" name="district" value={editAddress.district} onChange={editHandleChange} placeholder={t("district")} className="w-full" />
                    <FormInput type="text" name="country" value={editAddress.country} onChange={editHandleChange} placeholder={t("country")} className="w-full" />

                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/user-page/personal-info")}>{t("cancel")}</Button>
                        <Button shape="pill" type="submit">{t("update")}</Button>
                    </div>
                </form>
            </AdminFormWrapper>
        </div>
    )
}