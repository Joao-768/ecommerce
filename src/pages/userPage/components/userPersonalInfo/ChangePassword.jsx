import { useState } from "react";
import { setNewPassword } from "../../../../api/usersApi";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function ChangePassword({ setCurrentSection }) {
    const account = localStorage.getItem("account");
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!form.password) errors.password = t("passwordRequired");
        if (!form.newPassword) errors.newPassword = t("newPasswordRequired");
        if (form.newPassword !== form.confirmPassword) errors.confirmPassword = t("passwordsDontMatch");
        return errors;
    };

    // Set New Password
    const setPassword = async () => {
        if (Object.keys(validate()).length) {
            alert("Preenche os campos corretamente");
            return;
        }
        await setNewPassword(account, form.password, form.newPassword);
        setForm({ password: "", newPassword: "", confirmPassword: "" });
        setCurrentSection("view");
    }

    return(
        <div className="flex-1 pl-10 pr-10 pt-4 flex flex-col gap-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-[Panchang-Semibold]">Change My Password</h1>
                <p className="text-xs text-stone-500 font-[Panchang-Regular] mt-2 max-w-xl">
                    Choose a strong password you haven't used before.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 col-span-2">

                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">
                            Current Password
                        </label>

                        <div className="relative w-115">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="h-10 w-115 px-4 pr-10 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
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

                    <div className="flex flex-col gap-2">

                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-stone-500 font-[Panchang-Regular]">
                                New Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className="w-full h-10 px-4 pr-10 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] shadow-sm hover:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black transition"
                                >
                                    {showNew 
                                        ? <FaEye size={16} className="-translate-x-px" /> 
                                        : <FaEyeSlash size={18} />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black transition"
                            >
                                {showConfirm 
                                    ? <FaEye size={16} className="-translate-x-px" /> 
                                    : <FaEyeSlash size={18} />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-full bg-black text-white text-sm font-[Panchang-Regular] border border-black hover:bg-white hover:text-black transition-all duration-200"
                        onClick={setPassword}
                    >
                        Change My Password
                    </button>
                </div>
            </div>
        </div>
    )
}