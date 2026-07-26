import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { loginUser, getUserRole, setLastActivity } from "../../api/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";
import { Button, GhostButton } from "../../ui/Buttons";
import { FormInput } from "../../ui/Form";

export default function Login() {
    const account = localStorage.getItem("account");
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    useScrollToTop();

    useEffect(() => {
        if (!account) return;

        getUserRole(account)
            .then((data) => {
                const role = data.userRole;

                if (role === "user") {
                    navigate("/user-page/control-panel");
                } else {
                    navigate("/admin/dashboard");
                }
            })
            .catch(() =>{ navigate("/login"); localStorage.removeItem("account")});

    }, [account, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(form.email, form.password);
            if (!data || data.user?.id == null) return;

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("account", data.user.id);

            setLastActivity(data.user.id);

            const roleData = await getUserRole(data.user.id);
            if (roleData?.userRole === "admin") 
                navigate('/admin/dashboard');
            else
                navigate('/user-page/control-panel');

        } catch (err) {
            alert(err?.message || "Falha no login");
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center px-6"> 
            <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* left Side */}
                <div className="p-16 flex flex-col justify-center bg-black text-white">
                    <h2 className="text-2xl font-[Panchang-Semibold] mb-6">
                        {t("createAccountTitle")}
                    </h2>

                    <p className="mb-8 text-white/70 font-[Panchang-Regular]">
                        {t("createAccountDescription")}
                    </p>

                    <ul className="space-y-3 mb-10 text-white/80 font-[Panchang-Regular]">
                        <li>• {t("li1")}</li>
                        <li>• {t("li2")}</li>
                        <li>• {t("li3")}</li>
                        <li>• {t("li4")}</li>
                    </ul>

                    <Button
                        variant="secondary"
                        shape="pill"
                        className="w-full py-3 rounded-full border-white hover:border-white"
                        onClick={() => navigate('/create-account')}
                    >
                        {t("createAccountButton")}
                    </Button>
                </div>

                {/* Right Side */}
                <div className="p-16 flex flex-col justify-center">
                    <h2 className="text-3xl font-[Panchang-Semibold] mb-10">
                        {t("loginTitle")}
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        <div className="flex flex-col">
                            <label className="text-sm mb-2 text-stone-600 font-[Panchang-Regular]">
                                {t("emailAddress")}
                            </label>
                            <FormInput
                                variant="line"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder={t("emailAddressExample")}
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="text-sm mb-2 text-stone-600 font-[Panchang-Regular]">
                                {t("password")}
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full border-b border-stone-300 focus:border-black outline-none py-2 pr-10 transition-all font-[Panchang-Regular]"
                                />

                                <GhostButton
                                    type="button"
                                    className="active:scale-100 absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-black hover:no-underline"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={18} />}
                                </GhostButton>
                            </div>
                        </div>

                        <GhostButton
                            type="button"
                            className="text-stone-500 hover:text-black mb-8"
                            onClick={() => navigate("/forgot-password")}
                        >
                            {t("forgotPassword")}
                        </GhostButton>

                        <Button 
                            type="submit" 
                            className="w-full py-3 rounded-full mt-5"
                            shape="pill"
                        >
                            {t("loginButton")}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
