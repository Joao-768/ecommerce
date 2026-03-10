import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Highlights() {
    const [currentHighlight, setCurrentHighlight] = useState("new");
    const { t } = useTranslation();
    const watches = Array.from({ length: 10 }, (_, i) => `Watch ${i + 1}`);
    const season = getSeason(new Date());

    function getSeason(date) {
        const month = date.getMonth();
        if (month >= 2 && month <= 4) return "spring";
        if (month >= 5 && month <= 7) return "summer";
        if (month >= 8 && month <= 10) return "fall";
        return "winter";
    }

    return (
        <div className="min-h-screen flex flex-col pt-5">
            <div className="flex justify-center pt-28">
                <div className="relative">
                    <div className="flex items-center gap-6">
                        <button
                        className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 ${currentHighlight === ("new") ? "underline" : ""}`}

                        onClick={() => setCurrentHighlight("new")}
                        >
                        {t("new")}
                        </button>
                        <button
                        className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 ${currentHighlight === ("best") ? "underline" : ""}`}
                        onClick={() => setCurrentHighlight("best")}
                        >
                        {t("bestSellers")}
                        </button>
                        <button
                        className={`border-0 bg-transparent text-black font-[Panchang-Regular] pb-2 ${currentHighlight === ("season") ? "underline" : ""}`}
                        onClick={() => setCurrentHighlight("season")}
                        >
                        {t(season)}
                        </button>
                    </div>
                    <span
                        className="absolute left-0 -bottom-1 h-px bg-black transition-transform duration-300"
                    />
                    </div>
                </div>

        <div className="flex gap-1 overflow-x-auto pb-6 pt-5 pr-10 snap-x scrollbar-x overscroll-x-contain mt-4">
            {watches.map((watch, index) => (
                <div
                key={index}
                className="flex flex-col items-center min-w-60 snap-start pl-10"
                >
                    <div className="w-60 h-96 bg-gray-200 mb-4 flex items-center justify-center">
                        <span className="text-gray-500 font-[Panchang-Regular]">
                        {watch} Image
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold font-[Panchang-Regular]">
                        {watch}
                    </h3>
                    <p className="text-gray-600 font-[Panchang-Regular]">$XXX.XX</p>
                </div>
                ))}
            </div>
        </div>
    );
}
