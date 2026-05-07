import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUser } from "../../api/usersApi.js";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format.js";

export default function CreateAccount() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    useScrollToTop();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!form.name) errors.name = t("nameRequired");
        if (!form.surname) errors.surname = t("surnameRequired");
        if (!form.email) errors.email = t("emailRequired");
        if (!form.password) errors.password = t("passwordRequired");
        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = t("passwordsDontMatch");
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();
        setErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            const data = await createUser(form);
            localStorage.setItem("account", String(data.id));
            navigate('/user-page/control-panel');
        } catch (err) {
            alert(err?.message || "Falha ao criar conta");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center px-6 bg-stone-100">
            <div className="w-full max-w-4xl p-12 bg-white shadow-2xl rounded-3xl mt-25">

                {/* Title */}
                <h2 className="text-3xl font-[Panchang-Semibold] mb-3 text-center">
                    {t("createAccountTitle")}
                </h2>

                <p className="text-stone-500 mb-10 text-center font-[Panchang-Regular]">
                    {t("createAccountDescription")}
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-6">

                    {/* Name */}
                    <div className="flex flex-col">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.name ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("name")} {errors.name && <span> Required</span>}
                        </label>

                        <input
                            type="text"
                            name="name"
                            autoComplete="given-name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={t("namePlaceholder")}
                            className="border-b border-stone-300 py-2 outline-none focus:border-black transition-all font-[Panchang-Regular]"
                        />

                    </div>

                    {/* Surname */}
                    <div className="flex flex-col">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.surname ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("surname")} {errors.surname && <span> Required</span>}
                        </label>

                        <input
                            type="text"
                            name="surname"
                            autoComplete="family-name"
                            value={form.surname}
                            onChange={handleChange}
                            placeholder={t("surnamePlaceholder")}
                            className="border-b border-stone-300 py-2 outline-none focus:border-black transition-all font-[Panchang-Regular]"
                        />

                    </div>

                    {/* Email */}
                    <div className="flex flex-col col-span-2">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.email ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("emailAddress")} {errors.email && <span> Required</span>}
                        </label>
                        

                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder={t("emailPlaceholder")}
                            className="border-b border-stone-300 py-2 outline-none focus:border-black transition-all font-[Panchang-Regular]"
                        />

                    </div>

                    {/* Password */}
                    <div className="flex flex-col relative">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.password ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("password")} {errors.password && <span> Required</span>}
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder={t("passwordPlaceholder")}
                                className="w-full border-b py-2 pr-10 outline-none transition-all font-[Panchang-Regular]"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 cursor-pointer hover:text-black transition"
                            >
                                {showPassword 
                                    ? <FaEye size={16} className="-translate-x-px"/> 
                                    : <FaEyeSlash size={18} />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col relative">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.confirmPassword ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("confirmPassword")} {errors.confirmPassword && <span> Required</span>}
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                autoComplete="new-password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder={t("confirmPasswordPlaceholder")}
                                className="w-full border-b py-2 pr-10 outline-none transition-all font-[Panchang-Regular]"
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
                        className="col-span-2 bg-black text-white py-3 rounded-full transition-all font-[Panchang-Regular] hover:border hover:bg-white hover:text-black"
                    >
                        {t("createAccountButton")}
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-stone-500 font-[Panchang-Regular]">
                    {t("alreadyHaveAccount")}{" "}
                    <span
                            className="underline cursor-pointer text-black"
                            onClick={() => navigate('/login')}
                    >
                        {t("loginButton")}
                    </span>
                </p>

            </div>
        </div>
    );
}
