import { useState } from "react";
import { forgotPassword } from "../../api/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import { useTranslation } from "react-i18next";
import { Button, GhostButton } from "../../ui/Buttons.jsx";
import { FormInput } from "../../ui/Form.jsx";

export default function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            alert(t("fillAllFields"));
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            alert(t("passwordsDontMatch"));
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
            <div className="w-full max-w-3xl p-10 bg-white shadow-2xl rounded-3xl">
                <h1 className="text-3xl font-[Panchang-Semibold] mb-3 text-center">
                    {t("changeMyPassword")}
                </h1>
                <p className="text-stone-500 mb-8 text-center font-[Panchang-Regular]">
                    {t("passwordDescription")}
                </p>

                <form onSubmit={handleSubmit} className="grid gap-6">

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 font-[Panchang-Regular] text-stone-600">
                            {t("emailAddress")}
                        </label>
                        <FormInput
                            variant="line"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder={t("emailPlaceholder")}
                        />
                    </div>

                    {/* New Password */}
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 font-[Panchang-Regular] text-stone-600">
                            {t("newPassword")}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border-b border-stone-300 py-2 pr-10 outline-none focus:border-black transition-all font-[Panchang-Regular]"
                            />
                            <GhostButton
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="active:scale-100 absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black hover:no-underline"
                            >
                                {showPassword ? <FaEye size={16} className="-translate-x-px" /> : <FaEyeSlash size={18} />}
                            </GhostButton>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="flex flex-col">
                        <label className="text-sm mb-1 font-[Panchang-Regular] text-stone-600">
                            {t("confirmNewPassword")}
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border-b border-stone-300 py-2 pr-10 outline-none focus:border-black transition-all font-[Panchang-Regular]"
                            />
                            <GhostButton
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="active:scale-100 absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black hover:no-underline"
                            >
                                {showConfirm ? <FaEye size={16} className="-translate-x-px" /> : <FaEyeSlash size={18} />}
                            </GhostButton>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="py-3 rounded-full w-full"
                        shape="pill"
                    >
                        {t("change")}
                    </Button>

                </form>
            </div>
        </div>
    );
}