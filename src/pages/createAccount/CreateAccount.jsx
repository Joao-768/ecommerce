import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CreateAccount({ onNavigate }) {
    const { t } = useTranslation();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const newErrors = {};
        if (!form.name) newErrors.name = t("nameRequired");
        if (!form.surname) newErrors.surname = t("surnameRequired");
        if (!form.email) newErrors.email = t("emailRequired");
        if (!form.password) newErrors.password = t("passwordRequired");
        if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = t("passwordsDontMatch");

        setErrors(newErrors);
        setStatus(null);

        if (Object.keys(newErrors).length === 0) {
            try {
                setIsSubmitting(true);
                const res = await fetch("http://localhost:3001/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form.name,
                        surname: form.surname,
                        email: form.email,
                        password: form.password,
                    }),
                });

                if (!res.ok) {
                    let message = "Falha ao criar conta";
                    try {
                        const data = await res.json();
                        if (data?.error) message = data.error;
                    } catch {}
                    setStatus({ type: "error", message });
                    return;
                }

                setStatus({ type: "success", message: "Conta criada. Verifica o email." });
                onNavigate("emailVerification", {
                    state: {
                        signupData: {
                            name: form.name,
                            surname: form.surname,
                            email: form.email,
                            password: form.password,
                        },
                    },
                });
            } catch {
                setStatus({ type: "error", message: "Falha de rede ao criar conta" });
            } finally {
                setIsSubmitting(false);
            }
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
                    <div className="flex flex-col">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.password ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("password")} {errors.password && <span> Required</span>}
                        </label>

                        <input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder={t("passwordPlaceholder")}
                            className="border-b py-2 outline-none transition-all font-[Panchang-Regular]"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] ${
                                errors.confirmPassword ? "text-red-500" : "text-stone-600"
                            }`}
                        >
                            {t("confirmPassword")} {errors.confirmPassword && <span> Required</span>}
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder={t("confirmPasswordPlaceholder")}
                            className="border-b border-stone-300 py-2 outline-none focus:border-black transition-all font-[Panchang-Regular]"
                        />

                    </div>
                
                    {/* I am Human */}
                    <div className="flex items-center col-span-2 h-15 gap-2 w-full border border-stone-300 py-2 px-4 rounded-md">
                        <input
                            type="checkbox"
                            id="human"
                            className="w-4 h-4"
                        />
                        <label htmlFor="human" className="text-sm font-[Panchang-Regular] text-stone-600">
                            {t("iAmHuman")}
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`col-span-2 bg-black text-white py-3 rounded-full transition-all font-[Panchang-Regular] ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:border hover:bg-white hover:text-black"
                        }`}
                        disabled={isSubmitting}
                    >
                        {t("createAccountButton")}
                    </button>

                    {status?.message && (
                        <p
                            className={`col-span-2 text-sm ${
                                status.type === "error" ? "text-red-500" : "text-emerald-600"
                            }`}
                        >
                            {status.message}
                        </p>
                    )}

                </form>

                <p className="mt-8 text-center text-sm text-stone-500 font-[Panchang-Regular]">
                    {t("alreadyHaveAccount")}{" "}
                    <span
                            className="underline cursor-pointer text-black"
                            onClick={() => onNavigate("login")}
                    >
                        {t("loginButton")}
                    </span>
                </p>

            </div>
        </div>
    );
}
