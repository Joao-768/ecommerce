import { useNavigate } from "react-router-dom";
import { createCollection } from "../../../../api/collectionsApi";
import { useState } from "react";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper";
import { FormInput } from "../../../../ui/Form";
import { Button } from "../../../../ui/Buttons";
import { useTranslation } from "react-i18next";

export default function AddCollection() {
    const [form, setForm] = useState({ name: "", description: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const newHandleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <AdminFormWrapper title={t("createNewCollection")}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        await createCollection(form);
                        alert("Collection Created");
                        navigate("/admin/collection-management");
                    } catch (err) {
                        alert(err.message);
                    }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <FormInput type="text" name="name" value={form.name} onChange={newHandleChange} placeholder={t("name")} className="col-span-2" />
                <FormInput type="text" name="description" value={form.description} onChange={newHandleChange} placeholder={t("description")} className="col-span-2" />

                <div className="col-span-2 flex justify-end gap-4 mt-4">
                    <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/collection-management")}>Cancel</Button>
                    <Button shape="pill" type="submit">Create Collection</Button>
                </div>
            </form>
        </AdminFormWrapper>
    );
}