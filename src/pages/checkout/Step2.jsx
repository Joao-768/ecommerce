import { useState } from "react";
import { FiCreditCard, FiLock } from "react-icons/fi";
import { Button } from "../../ui/Buttons";

export default function Step2({ card, updateCard, setStep, payment, t, savedCards, setSelectedCard }) {
    const [showCards, setShowCards] = useState(false);

    return (
        <div className="space-y-4">
            <h2 className="font-[Panchang-Semibold]">
                {t("secondCheckoutSubtitle")}
            </h2>

            <div className="relative">
                <FiCreditCard className="h-1/2 absolute left-3 top-3 text-stone-400" />
                <input 
                    name="cardNumber" 
                    placeholder="Card Number" 
                    value={card.cardNumber} 
                    onChange={updateCard}
                    onFocus={() => setShowCards(true)}
                    className="w-full p-3 pl-10 border rounded-xl font-[Panchang-Regular]" 
                />
                {showCards && (savedCards ?? []).length > 0 && (
                    <div className="absolute w-full bg-white border rounded-xl mt-1 shadow z-10">
                        {savedCards.map((c) => (
                            <div key={c.id}
                                onClick={() => {
                                    updateCard({ target: { name: "cardNumber", value: `**** **** **** ${c.card_number}` } });
                                    updateCard({ target: { name: "expiry", value: c.expiry } });
                                    setSelectedCard(c);
                                    setShowCards(false);
                                }}
                                className="p-3 hover:bg-gray-100 hover:rounded-xl cursor-pointer font-[Panchang-Regular]">
                                **** **** **** {c.card_number} - {c.expiry}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="expiry" placeholder={t("expiry")} value={card.expiry} onChange={updateCard}
                    className="p-3 border rounded-xl font-[Panchang-Regular]" />
                <input name="cvc" placeholder={t("cvc")} value={card.cvc} onChange={updateCard}
                    className="p-3 border rounded-xl font-[Panchang-Regular]" />
            </div>

            <div className="flex gap-3">
                <Button shape="full" variant="secondary" onClick={() => setStep(1)}>
                    {t("checkoutBack")}
                </Button>
                <Button shape="full" onClick={payment} className="flex items-center justify-center gap-2">
                    <FiLock /> {t("checkoutPay")}
                </Button>
            </div>
        </div>
    );
}