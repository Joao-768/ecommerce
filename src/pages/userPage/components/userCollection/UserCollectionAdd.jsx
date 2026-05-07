import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"
import { getCodes } from "../../../../api/productsApi";
import { setUserCollection } from "../../../../api/usersApi";
import { IoArrowBackOutline } from "react-icons/io5";

export default function UserCollectionAdd() {
    const account = localStorage.getItem("account");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [codes, setCodes] = useState([]);

    const { t } = useTranslation();
    const navigate = useNavigate();

    function selectCode(code) {
        setSearchQuery(code.code);
        setSearchResults([]);
        setSelectedCode(code);
    }

    function addProduct() {
        if (!selectedCode) {
            alert("Seleciona um código primeiro");
            return;
        }
        setUserCollection(account, selectedCode.product_id, selectedCode.id);
        alert("Product added to your collection");
        navigate("/user-page/collection");
    };

    function handleSearch(value) {
        setSearchQuery(value);

        if (!value) {
            setSearchResults([]);
            return;
        }

        const filtered = codes.filter((c) =>
            c.code?.toLowerCase().includes(value.toLowerCase())
        );

        setSearchResults(filtered);
    }

    useEffect(() => {
        getCodes()
            .then((data) => setCodes(data || []))
            .catch(() => setCodes([]));
    }, []);

    return(
        <div className="flex-1 pl-10">
            <button
                className="mb-4 inline-flex items-center gap-2 text-sm font-[Panchang-Regular] text-stone-500 hover:underline"
                onClick={() => navigate("/user-page/collection")}
            >
                <IoArrowBackOutline />
                {t("backToCollection")}
            </button>

            <h1 className="text-3xl font-[Panchang-Semibold]">
                {t("addNewWatch")}
            </h1>
            <p className="text-xs font-[Panchang-Regular]">
                {t("addNewWatchDescription")}
            </p>
            <h3 className="pt-5">{t("watchCode")}</h3>
            <div className="w-1/4">
                <input
                    type="text"
                    placeholder={`ex.: ${codes[0]?.code}`}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="h-10 w-full px-4 rounded-full border border-stone-300 bg-white text-sm font-[Panchang-Regular] placeholder-stone-400 shadow-sm hover:border-black outline-none"
                />
                {searchResults.length > 0 && (
                    <div className="absolute z-10 mt-2 w-5/7 bg-white border border-stone-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {searchResults.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => selectCode(item)}
                                className="px-4 py-2 text-sm hover:bg-stone-100 cursor-pointer font-[Panchang-Regular]"
                            >
                                {item.code}
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="px-5 py-2 mt-3 rounded-full bg-black text-white text-sm font-[Panchang-Regular] border border-black hover:bg-white hover:text-black transition-all duration-200"
                    onClick={addProduct}
                >
                    Add
                </button>
            </div>
        </div>
    )
}