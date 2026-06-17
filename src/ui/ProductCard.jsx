import { formatCurrency, getSeasonStatus } from "../utils/format";
import { useTranslation } from "react-i18next";

export default function ProductCard({ item, onClick, isRemovable, onRemove, isSelling, showSize = false, showQuantity = false}) {
    const { t } = useTranslation();

    return (
        <div 
            className="relative z-0 hover:z-10 w-60 h-96 bg-white rounded-lg shadow-sm border 
            border-stone-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
            flex flex-col justify-between hover:cursor-pointer active:scale-95"
        >

            {isRemovable && (
                <button
                    onClick={() => onRemove(item.id)}
                    className="h-10 w-10 absolute top-4 right-6 text-xl rounded-xs font-bold 
                    cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                >
                    ✕
                </button>
            )}

            <button
                onClick={onClick}
                className="w-60 h-96 mb-4 flex items-center justify-center overflow-hidden hover:cursor-pointer"
            >
                <img
                    className="w-full h-full object-cover p-5 hover:cursor-pointer"
                    src={item.image}
                    alt={item.name}
                />
            </button>

            <h2 className="text-lg font-[Panchang-Semibold] text-center pl-2 pr-2 hover:cursor-pointer">
                {item.name}
            </h2>

            {isSelling ?
                getSeasonStatus(item.collection_id) ? 
                    <h3 className="text-md font-[Panchang-Regular] pb-1 text-center hover:cursor-pointer">
                        {formatCurrency(item.price)}
                    </h3>
                : 
                    <h3 className="text-md font-[Panchang-Regular] pb-1 text-center hover:cursor-pointer">
                        {t("unavaliable")}
                    </h3>
            :
                <div className="h-3"/>
            }

            {showSize ?
                <h3 className="text-md font-[Panchang-Regular] pb-1 text-center hover:cursor-pointer">
                    {item.size}mm
                </h3>
            :
                <div className="h-3"/>
            }

            {showQuantity ?
                <h3 className="text-md font-[Panchang-Regular] pb-1 text-center hover:cursor-pointer">
                    x{item.quantity}
                </h3>
            :
                <div className="h-3"/>
            }
        </div>
    );
}