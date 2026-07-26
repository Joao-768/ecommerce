import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUser, verifyEmail, resendVerificationEmail } from "../../api/usersApi.js";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format.js";
import { Button, GhostButton } from "../../ui/Buttons.jsx";
import { FormInput } from "../../ui/Form.jsx";

export default function CreateAccount() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [step, setStep] = useState(1);
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    useScrollToTop();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.surname || !form.email || !form.password) {
            alert(t("fillAllFields"));
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert(t("passwordsDontMatch"));
            return;
        }

        if (form.password.length < 8) {
            alert(t("passwordShort"));
            return;
        }

        if(!/[!@#$%^&*_-]/.test(form.password)) {
            alert(t("passwordSpecialChar"));
            return;
        }

        if(!/[A-Z]/.test(form.password)) {
            alert(t("passwordUppercase"));
            return;
        }

        if(!/[a-z]/.test(form.password)) {
            alert(t("passwordLowercase"));
            return;
        }

        if(!/\d/.test(form.password)) {
            alert(t("passwordNumber"));
            return;
        }

        try {
            await createUser(form);
            setStep(2);
        } catch (err) {
            alert(err?.message || "Falha ao criar conta");
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!code) {
            alert(t("fillAllFields"));
            return;
        }

        try {
            await verifyEmail(form.email, code);
            navigate('/login');
        } catch (err) {
            alert(err?.message || "Código inválido");
        }
    };

    const handleResend = async () => {
        try {
            await resendVerificationEmail(form.email);
            alert("Código reenviado");
        } catch (err) {
            alert(err?.message || "Falha ao reenviar código");
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
                    {step === 1 ? t("createAccountDescription") : `Insere o código enviado para ${form.email}.`}
                </p>

                {step === 2 ? (
                    <form onSubmit={handleVerify} className="grid gap-6">
                        <FormInput
                            variant="line"
                            type="text"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000000"
                        />

                        <Button type="submit" className="py-3 rounded-full w-full" shape="pill">
                            Confirmar email
                        </Button>

                        <GhostButton type="button" onClick={handleResend} className="text-stone-500 text-sm">
                            Reenviar código
                        </GhostButton>
                    </form>
                ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

                    {/* Name */}
                    <div className="flex flex-col">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] text-stone-600`}
                        >
                            {t("name")}
                        </label>

                        <FormInput
                            variant="line"
                            type="text"
                            name="name"
                            autoComplete="given-name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={t("namePlaceholder")}
                        />

                    </div>

                    {/* Surname */}
                    <div className="flex flex-col">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] text-stone-600`}
                        >
                            {t("surname")}
                        </label>

                        <FormInput
                            variant="line"
                            type="text"
                            name="surname"
                            autoComplete="family-name"
                            value={form.surname}
                            onChange={handleChange}
                            placeholder={t("surnamePlaceholder")}
                        />

                    </div>

                    {/* Email */}
                    <div className="flex flex-col col-span-2">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] text-stone-600`}
                        >
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
                            className="col-span-2"
                        />

                    </div>

                    {/* Password */}
                    <div className="flex flex-col relative">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] "text-stone-600`}
                        >
                            {t("password")}
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="new-password"
                                value={form.password}
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

                    {/* Confirm Password */}
                    <div className="flex flex-col relative">
                        <label
                            className={`text-sm mb-1 font-[Panchang-Regular] text-stone-600`}
                        >
                            {t("confirmPassword")}
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                autoComplete="new-password"
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
                        className="col-span-2 py-3 rounded-full w-full"
                        shape="pill"
                    >
                        {t("createAccountButton")}
                    </Button>

                </form>
                )}

                <p className="mt-8 text-center text-sm text-stone-500 font-[Panchang-Regular]">
                    {t("alreadyHaveAccount")}{" "}
                    <GhostButton onClick={() => navigate('/login')} className="text-black">
                        {t("loginButton")}
                    </GhostButton>
                </p>

            </div>
        </div>
    );
}
