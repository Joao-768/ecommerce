import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../utils/format";

export default function AboutUs() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    useScrollToTop();

    return (
        <div className="min-h-screen bg-neutral-100 text-black px-6 py-10 flex flex-col">

            {/* Close Button */}
            <button
                onClick={() => navigate('/')}
                className="h-9 w-9 absolute top-6 right-5 text-lg font-bold cursor-pointer text-black hover:border hover:border-black transition-all duration-300"
            >
                ✕
            </button>

            {/* CONTENT WRAPPER */}
            <div className="flex-1 flex flex-col items-center justify-center">

                {/* Header */}
                <div className="max-w-4xl text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 tracking-wide">
                        {t("aboutUsTitle")}
                    </h1>

                    <p className="text-neutral-600 text-lg">
                        {t("aboutUsSubtitle")}
                    </p>
                </div>

                {/* About Section */}
                <div className="max-w-3xl text-center space-y-6 mb-16">
                    <p className="text-neutral-700 leading-relaxed">
                        {t("aboutUsFirstParagraph")}
                    </p>

                    <p className="text-neutral-700 leading-relaxed">
                        {t("aboutUsSecondParagraph")}
                    </p>

                    <p className="text-neutral-700 leading-relaxed">
                        {t("aboutUsThirdParagraph")}
                    </p>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
                        <h3 className="text-xl font-semibold mb-2">
                            {t("aboutUsFirstValueTitle")}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                            {t("aboutUsFirstValue")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
                        <h3 className="text-xl font-semibold mb-2">
                            {t("aboutUsSecondValueTitle")}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                            {t("aboutUsSecondValue")}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
                        <h3 className="text-xl font-semibold mb-2">
                            {t("aboutUsThirdValueTitle")}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                            {t("aboutUsThirdValue")}
                        </p>
                    </div>

                </div>

            </div>

            {/* FOOTER */}
            <div className="text-center border-t border-neutral-300 pt-6 w-full max-w-3xl mx-auto">
                <p className="text-neutral-500 text-sm">
                    {t("aboutUsCreatedBy")} João Caetano
                </p>
            </div>

        </div>
    );
}