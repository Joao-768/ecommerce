import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { loginUser, getUserRole, setLastActivity } from "../../api/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";

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
            if (!data || data.id == null) return;

            localStorage.setItem("account", String(data.id))
            
            setLastActivity(data.id);
            
            const roleData = await getUserRole(data.id);
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
            <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl grid grid-cols-2 overflow-hidden">
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

                    <button 
                        className="border  py-3 rounded-full text-black bg-white hover:border-white hover:bg-black hover:text-white transition-all duration-300 font-[Panchang-Regular]"
                        onClick={() => navigate('/create-account')}
                    >
                        {t("createAccountButton")}
                    </button>
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
                            <input
                                type="email"
                                name="email"
                                placeholder={t("emailAddressExample")}
                                value={form.email}
                                onChange={handleChange}
                                className="border-b border-stone-300 focus:border-black outline-none py-2 transition-all font-[Panchang-Regular]"
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
                                    placeholder={t("passwordPlaceholder")}
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full border-b border-stone-300 focus:border-black outline-none py-2 pr-10 transition-all font-[Panchang-Regular]"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 cursor-pointer hover:text-black transition"
                                >
                                    {showPassword 
                                        ? <FaEye size={16} className="-translate-x-px" /> 
                                        : <FaEyeSlash size={18} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-between items-center text-sm">
                            <button
                                type="button"
                                className="text-stone-500 hover:text-black transition-all duration-300 font-[Panchang-Regular] hover:underline mb-8"
                                onClick={() => navigate("/forgot-password")}
                            >
                                {t("forgotPassword")}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-full border border-white hover:bg-white hover:border-black hover:text-black transition-all duration-300 font-[Panchang-Regular]"
                        >
                            {t("loginButton")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
