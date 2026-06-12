import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../api/usersApi";
import { useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import AdminFormWrapper from "../../../../ui/AdminFormWrapper";
import { FormInput, FormSelect } from "../../../../ui/Form";
import { Button } from "../../../../ui/Buttons";

export default function AddUser() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return(
        <div className="flex justify-center items-start align h-full w-3/4">
            <AdminFormWrapper title="Create New User">
                <form onSubmit={(e) => { e.preventDefault(); createUser(form); navigate("/admin/user-management"); alert("User Created"); }}
                    className="grid grid-cols-2 gap-6"
                >
                    <FormInput type="text" name="name" value={form.name} onChange={handleChange} placeholder="First Name" />
                    <FormInput type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Last Name" />
                    <FormInput type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="col-span-2" />
                    <FormInput type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />

                    <FormSelect
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        options={[{ value: "user", label: "User" }, { value: "admin", label: "Admin" }]}
                    />

                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <Button shape="pill" variant="secondary" type="button" onClick={() => navigate("/admin/user-management")}>Cancel</Button>
                        <Button shape="pill" type="submit">Create User</Button>
                    </div>
                </form>
            </AdminFormWrapper>
        </div>
    )
}