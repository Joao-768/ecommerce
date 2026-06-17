import { useState, useEffect } from "react";
import { updateUser, getUserById } from "../../../../api/usersApi";
import { useNavigate, useParams } from "react-router-dom";
import { blockUser, isUserActive } from "../../../../api/adminApi";
import { Button } from "../../../../ui/Buttons.jsx";
import { FormInput, FormSelect } from "../../../../ui/Form.jsx";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper.jsx";
import { useTranslation } from "react-i18next";

export default function EditUser() {
    const { id } = useParams();
    const [editUser, setEditUser] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (!id) return;
        getUserById(id)
            .then((data) => setEditUser(data))
            .catch(() => setEditUser(null));
    }, [id]);

    useEffect(() => {
        if (!editUser?.id) return;
        isUserActive(editUser.id)
            .then((data) => setIsActive(data.isUserActive))
            .catch(() => setIsActive(null));
    }, [editUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlockUser = (id) => {
        blockUser(id)
            .then(() => navigate("/admin/user-management"))
            .catch((error) => console.error(error));
    };

    return (
        <AdminFormWrapper title={t("editUser")}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await updateUser(
                        editUser.id,
                        editUser.name,
                        editUser.surname,
                        editUser.email,
                        editUser.date_of_birth,
                        editUser.password,
                        editUser.role
                    );
                    alert(t("userEdited"));
                    navigate("/admin/user-management");
                }}
                className="grid grid-cols-2 gap-6"
            >
                <FormInput type="text" name="name" value={editUser?.name} onChange={handleChange} placeholder={t("firstName")} />
                <FormInput type="text" name="surname" value={editUser?.surname} onChange={handleChange} placeholder={t("lastName")} />
                <FormInput type="email" name="email" value={editUser?.email} onChange={handleChange} placeholder={t("email")} className="col-span-2" />
                <FormInput type="password" name="password" value={editUser?.password} onChange={handleChange} placeholder={t("newPassword")} />

                <FormSelect
                    name="role"
                    value={editUser?.role}
                    onChange={handleChange}
                    options={[{ value: "user", label: t("user") }, { value: "admin", label: t("admin") }]}
                />

                <div className="col-span-2 flex justify-end gap-4 mt-4">
                    <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/user-management")}>
                        {t("cancel")}
                    </Button>
                    <Button shape="pill" type="button" onClick={() => handleBlockUser(editUser.id)}>
                        {isActive ? t("block") : t("unlock")}
                    </Button>
                    <Button shape="pill" type="submit">
                        {t("update")}
                    </Button>
                </div>
            </form>
        </AdminFormWrapper>
    );
}