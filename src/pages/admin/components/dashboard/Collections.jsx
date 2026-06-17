import { useState } from "react";
import { getTotalCollections } from "../../../../api/collectionsApi";
import { useTranslation } from "react-i18next";

export default function Collections() {
    const [totalCollections, setTotalCollections] = useState(0);
    const { t } = useTranslation();

    getTotalCollections()
        .then((data) => setTotalCollections(data?.totalCollections ?? 0))
        .catch(() => setTotalCollections(0));

    return (
        <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
            <h1 className="text-xl font-[Panchang-Semibold] pb-2">{t("collections")}</h1>
            <p className="text-md font-[Panchang-Regular] pb-2">{t("totalCollections")}: {totalCollections}</p>
        </div>
    )
}