import { useTranslation } from "react-i18next";

export default function Login({ onNavigate }) {

    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex items-center justify-center px-6"> 
            <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl grid grid-cols-2 overflow-hidden">
                {/* LEFT SIDE */}
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
                        onClick={() => onNavigate('createAccount')}
                    >
                        {t("createAccountButton")}
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-16 flex flex-col justify-center">
                    <h2 className="text-3xl font-[Panchang-Semibold] mb-10">
                        {t("loginTitle")}
                    </h2>

                    <form className="space-y-6">
                        
                        <div className="flex flex-col">
                            <label className="text-sm mb-2 text-stone-600 font-[Panchang-Regular]">
                                {t("emailAddress")}
                            </label>
                            <input
                                type="email"
                                placeholder={t("emailAddressExample")}
                                required
                                className="border-b border-stone-300 focus:border-black outline-none py-2 transition-all font-[Panchang-Regular]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm mb-2 text-stone-600 font-[Panchang-Regular]">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder={t("password")}
                                required
                                className="border-b border-stone-300 focus:border-black outline-none py-2 transition-all font-[Panchang-Regular]"
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <button
                                type="button"
                                className="text-stone-500 hover:text-black transitio font-[Panchang-Regular]"
                            >
                                {t("forgotPassword")}
                            </button>
                        </div>

                        <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-full border border-transparent hover:bg-white hover:border-black hover:text-black transition-all duration-300 font-[Panchang-Regular]"
                        >
                            {t("loginButton")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
