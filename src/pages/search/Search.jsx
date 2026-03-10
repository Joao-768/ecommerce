import { useTranslation } from "react-i18next";

export default function Search({ onNavigate }){

    const watches = Array.from({ length: 10 }, (_, i) => `Watch ${i + 1}`);
        const { t } = useTranslation();

    return(
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="relative py-8 px-6 pt-15">
                <button
                    onClick={() => onNavigate("home")}
                    className="h-10 w-10 absolute top-4 right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
                <h1 className="text-4xl text-center font-[Panchang-Semibold]">
                    {t("searchTitle")}
                </h1>
            </div>
            {/* Search Section */}
            <div className="flex justify-center pt-5 px-6">
                <div className="flex items-center gap-6 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder={t("input")}
                        className="w-full max-w-xl border border-black px-4 py-3 bg-transparent focus:outline-none rounded-sm font-[Panchang-Regular]"
                    />
                    <button className="px-6 min-w-40 h-12 text-sm font-[Panchang-Regular] bg-white text-black border-2 border-black cursor-pointer rounded-md hover:bg-black hover:text-white transition-all duration-200">
                        {t("search")}
                    </button>
                </div>
            </div>
            {/* Watches Section */}
            <h1 className="pl-5">{t("popularSearches")}</h1>
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