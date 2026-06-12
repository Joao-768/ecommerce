export default function Summary({ cartItems, total, formatCurrency, t }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h2 className="font-[Panchang-Semibold] mb-4">{t("orderSummary")}</h2>

            <div className="space-y-3 text-sm">
                {cartItems.map((p) => (
                    <div 
                        key={`${p.id}-${p.size_mm}`}
                        className="flex justify-between items-center text-xs font-[Panchang-Regular]"
                    >
                        <span className="flex-1">{p.name}</span>
                        <span className="text-stone-400 mx-4">{p.size_mm}mm</span>
                        <span className="text-stone-400 mx-2">x{p.quantity}</span>
                        <span className="ml-2">{formatCurrency(p.price * p.quantity)}</span>
                    </div>
                ))}

                <div className="border-t pt-3 flex justify-between font-[Panchang-Semibold]">
                    <span>{t("total")}</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );
}