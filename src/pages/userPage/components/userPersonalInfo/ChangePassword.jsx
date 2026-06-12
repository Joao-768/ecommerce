import { useState } from "react";
import { setNewPassword } from "../../../../api/usersApi";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button, GhostButton } from "../../../../ui/Buttons";
import { FormInput } from "../../../../ui/Form";

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
    async function setPassword() {
        if (Object.keys(validate()).length) {
            alert(t("fillFieldsCorrectly"));
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
                <h1 className="text-3xl font-[Panchang-Semibold]">{t("changeMyPassword")}</h1>
                <p className="text-xs text-stone-500 font-[Panchang-Regular] mt-2 max-w-xl">
                    {t("passwordDescription")}
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 col-span-2">

                        <label className="text-xs text-stone-500 font-[Panchang-Regular]">
                            {t("currentPassword")}
                        </label>

                        <div className="relative w-115">
                            <FormInput
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-115 h-10 pr-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20"
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
                                {t("newPassword")}
                            </label>

                            <div className="relative">
                                <FormInput
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className="w-full h-10 pr-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20"
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
                            {t("confirmNewPassword")}
                        </label>

                        <div className="relative">
                            <FormInput
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full h-10 pr-10 shadow-sm hover:border-black focus:ring-2 focus:ring-black/20"
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
                    <Button shape="pill" onClick={setPassword}>
                        {t("changeMyPassword")}
                    </Button>
                </div>
            </div>
        </div>
    )
}