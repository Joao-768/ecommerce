import { useState, useEffect } from "react";
import { getTotalCategories } from "../../../../api/categoriesApi";
import { useTranslation } from "react-i18next";

export default function Categories() {
    const [totalCategories, setTotalCategories] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        getTotalCategories()
            .then((data) => setTotalCategories(data?.totalCategories ?? 0))
            .catch(() => setTotalCategories(0));
    }, []);

    return (
        <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
            <h1 className="text-xl font-[Panchang-Semibold] pb-2">{t("categories")}</h1>
            <p className="text-md font-[Panchang-Regular] pb-2">{t("totalCategories")}: {totalCategories}</p>
        </div>
    )
}