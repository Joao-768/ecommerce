import { useState } from "react";
import { updateUser, getUserById } from "../../../../api/usersApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { blockUser, isUserActive } from "../../../../api/adminApi";
import { TbTriangleInvertedFilled } from "react-icons/tb";

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

        setEditUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlockUser = (id) => {
        blockUser(id)
            .then(() => {
                navigate("/admin/user-management");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="flex justify-center items-start align h-full w-3/4">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md border border-stone-100">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-8 text-center">
                    Edit User
                </h2>

                {/* Form */}
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

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={editUser?.name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Surname */}
                    <input
                        type="text"
                        name="surname"
                        value={editUser?.surname}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        value={editUser?.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="col-span-2 border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        value={editUser?.password}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all font-[Panchang-Regular]"
                    />

                    {/* Role */}
                    <div className="relative w-full font-[Panchang-Regular]">
                        <select
                            name="role"
                            value={editUser?.role}
                            onChange={handleChange}
                            className="w-full border border-stone-300 px-4 py-3 rounded-full outline-none focus:border-black transition-all appearance-none bg-white"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <TbTriangleInvertedFilled/>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4 font-[Panchang-Regular]">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/user-management")}
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                handleBlockUser(editUser.id)
                            }}
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            {isActive ? "Block" : "Unlock"}
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-full border bg-black text-white hover:bg-white hover:text-black duration-200"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}