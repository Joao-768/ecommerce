import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="w-full">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-6 text-sm">
                
                <div className="w-full h-px bg-stone-800 mb-4" />

                <p className="font-[Panchang-Regular]">
                    © {year} {t("footerRights")}
                </p>

                <p className="text-stone-500 text-xs mt-1 font-[Panchang-Regular]">
                    {t("footerDescription")}
                </p>
            </div>
        </footer>
    );
}