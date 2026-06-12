import { useState, useEffect } from "react";
import { updateUser, getUserById } from "../../../../api/usersApi";
import { useNavigate, useParams } from "react-router-dom";
import { blockUser, isUserActive } from "../../../../api/adminApi";
import { Button } from "../../../../ui/Buttons.jsx";
import { FormInput, FormSelect } from "../../../../ui/Form.jsx";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper.jsx";

export default function EditUser() {
    const { id } = useParams();
    const [editUser, setEditUser] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const navigate = useNavigate();

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
        <AdminFormWrapper title="Edit User">
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
                    alert("User Edited");
                    navigate("/admin/user-management");
                }}
                className="grid grid-cols-2 gap-6"
            >
                <FormInput type="text" name="name" value={editUser?.name} onChange={handleChange} placeholder="First Name" />
                <FormInput type="text" name="surname" value={editUser?.surname} onChange={handleChange} placeholder="Last Name" />
                <FormInput type="email" name="email" value={editUser?.email} onChange={handleChange} placeholder="Email Address" className="col-span-2" />
                <FormInput type="password" name="password" value={editUser?.password} onChange={handleChange} placeholder="New Password" />

                <FormSelect
                    name="role"
                    value={editUser?.role}
                    onChange={handleChange}
                    options={[{ value: "user", label: "User" }, { value: "admin", label: "Admin" }]}
                />

                <div className="col-span-2 flex justify-end gap-4 mt-4">
                    <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/user-management")}>Cancel</Button>
                    <Button shape="pill" type="button" onClick={() => handleBlockUser(editUser.id)}>
                        {isActive ? "Block" : "Unlock"}
                    </Button>
                    <Button shape="pill" type="submit">Update User</Button>
                </div>
            </form>
        </AdminFormWrapper>
    );
}