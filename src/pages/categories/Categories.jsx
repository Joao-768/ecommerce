import { useTranslation } from "react-i18next";
import "./Categories.css";

export default function Style({ onNavigate, style }){
    const watches = Array.from({ length: 10 }, (_, i) => `Watch ${i + 1}`);
    const { t } = useTranslation();
    
    return(
        <div className="style-page min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative py-8 px-6 pt-35">
                <button
                    onClick={() => onNavigate("home")}
                    className="h-10 w-10 absolute right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
                <h1 className="text-4xl text-center font-[Panchang-Semibold]">
                    {t(style)}
                </h1>
            </div>
            {/* Watches Section */}
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
    )
}
