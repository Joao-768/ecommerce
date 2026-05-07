import { useState } from "react";
import { forgotPassword } from "../../api/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";

export default function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    useScrollToTop();

    const [form, setForm] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.newPassword || !form.confirmPassword) {
            alert("Preenche todos os campos");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords diferentes");
            return;
        }

        try {
            await forgotPassword(form.email, form.newPassword);

            navigate('/login');

        } catch (error) {
            alert(error?.message || "Falha ao atualizar password");
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center px-6 bg-stone-100">
            <div className="w-full max-w-xl p-10 bg-white shadow-2xl rounded-3xl">
                <h2 className="text-3xl font-[Panchang-Semibold] mb-3 text-center">
                    Change My Password
                </h2>
                <p className="text-stone-500 mb-8 text-center font-[Panchang-Regular]">
                    Set a new password for your account.
                </p>

                <form onSubmit={handleSubmit} className="grid gap-5">

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="h-10 px-4 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>

                    {/* New Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                className="w-full h-10 px-4 pr-10 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black transition"
                            >
                                {showPassword 
                                    ? <FaEye size={16} className="-translate-x-px" /> 
                                    : <FaEyeSlash size={18} />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full h-10 px-4 pr-10 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 cursor-pointer hover:text-black transition"
                            >
                                {showConfirm 
                                    ? <FaEye size={16} className="-translate-x-px"/> 
                                    : <FaEyeSlash size={18} />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 bg-black text-white py-3 rounded-full transition-all font-[Panchang-Regular] hover:border hover:bg-white hover:text-black"
                    >
                        Change My Password
                    </button>
                </form>
            </div>
        </div>
    );
}
