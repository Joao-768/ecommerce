import { useState } from "react";
import { getTotalCollections } from "../../../../api/adminApi";

export default function Collections() {
    const [totalCollections, setTotalCollections] = useState(0);

    getTotalCollections()
        .then((data) => setTotalCollections(data?.totalCollections ?? 0))
        .catch(() => setTotalCollections(0));

    return (
        <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100">
            <h1 className="text-xl font-[Panchang-Semibold] pb-2">Collections</h1>
            <p className="text-md font-[Panchang-Regular] pb-2">Total Collections: {totalCollections}</p>
            {/* Tabela */}
        </div>
    )
}