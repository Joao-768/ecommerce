import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Buttons";

export default function Step1({ billing, updateBilling, delivery, updateDelivery, addresses, setStep, isDifferentAddress, setIsDifferentAddress, user }) {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [showDelivery, setShowDelivery] = useState(false);

    return (
        <div className="space-y-4">
            <h2 className="font-[Panchang-Semibold]">{t("shippingInfo")}</h2>

            <div className="grid grid-cols-2 gap-4">
                <input name="name" placeholder={t("name")} value={billing.name} onChange={updateBilling}
                    className="w-full p-3 border rounded-xl font-[Panchang-Regular]" />
                <input name="surname" placeholder={t("surname")} value={billing.surname} onChange={updateBilling}
                    className="w-full p-3 border rounded-xl font-[Panchang-Regular]" />
            </div>

            {user?.nif ? (
                <input type="text" className="w-full p-3 border rounded-xl font-[Panchang-Regular]"
                    value={`*****${user.nif.slice(-4)}`} readOnly />
            ) : (
                <input type="text" name="nif" className="w-full p-3 border rounded-xl font-[Panchang-Regular]"
                    placeholder={t("NIF")} value={billing.nif} onChange={updateBilling} />
            )}

            <h3 className="text-sm font-[Panchang-Semibold]">{t("invoicing")}</h3>
            <div className="relative">
                <input name="street" placeholder={t("street")} value={billing.street}
                    onChange={updateBilling}
                    onFocus={() => setShow(true)}
                    className="w-full p-3 border rounded-xl font-[Panchang-Regular]" />
                {show && (
                    <div className="absolute w-full bg-white border rounded-xl mt-1 shadow z-10">
                        {addresses.map((a) => (
                            <div key={a.id}
                                onClick={() => {
                                    updateBilling({ target: { name: "street", value: a.street } });
                                    updateBilling({ target: { name: "city", value: a.city } });
                                    updateBilling({ target: { name: "postal_code", value: a.postal_code } });
                                    updateBilling({ target: { name: "district", value: a.district } });
                                    updateBilling({ target: { name: "country", value: a.country } });
                                    setShow(false);
                                }}
                                className="p-3 hover:bg-gray-100 hover:rounded-xl cursor-pointer font-[Panchang-Regular]">
                                {a.street}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input name="city" placeholder={t("city")} value={billing.city} onChange={updateBilling}
                    className="p-3 border rounded-xl font-[Panchang-Regular]" />
                <input name="postal_code" placeholder={t("postalCode")} value={billing.postal_code} onChange={updateBilling}
                    className="p-3 border rounded-xl font-[Panchang-Regular]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input name="district" placeholder={t("district")} value={billing.district} onChange={updateBilling}
                    className="p-3 border rounded-xl font-[Panchang-Regular]" />
                <input name="country" placeholder={t("country")} value={billing.country} onChange={updateBilling}
                    className="p-3 border rounded-xl font-[Panchang-Regular]" />
            </div>

            {/* Checkbox morada de entrega */}
            <label style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <span className="text-stone-400">{t("deliveryAddressButton")}</span>
                <input type="checkbox" checked={isDifferentAddress}
                    onChange={(e) => setIsDifferentAddress(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "black", cursor: "pointer" }} />
            </label>

            {/* Campos de entrega - só aparecem se checkbox marcada */}
            {isDifferentAddress && (
                <div className="space-y-4">
                    <h3 className="text-sm font-[Panchang-Semibold]">{t("deliveryAddress")}</h3>
                    <div className="relative">
                        <input name="street" placeholder={t("street")} value={delivery.street}
                            onChange={updateDelivery}
                            onFocus={() => setShowDelivery(true)}
                            className="w-full p-3 border rounded-xl font-[Panchang-Regular]" />
                        {showDelivery && (
                            <div className="absolute w-full bg-white border rounded-xl mt-1 shadow z-10">
                                {addresses.map((a) => (
                                    <div key={a.id}
                                        onClick={() => {
                                            updateDelivery({ target: { name: "street", value: a.street } });
                                            updateDelivery({ target: { name: "city", value: a.city } });
                                            updateDelivery({ target: { name: "postal_code", value: a.postal_code } });
                                            updateDelivery({ target: { name: "district", value: a.district } });
                                            updateDelivery({ target: { name: "country", value: a.country } });
                                            setShowDelivery(false);
                                        }}
                                        className="p-3 hover:bg-gray-100 hover:rounded-xl cursor-pointer font-[Panchang-Regular]">
                                        {a.street}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="city" placeholder={t("city")} value={delivery.city} onChange={updateDelivery}
                            className="p-3 border rounded-xl font-[Panchang-Regular]" />
                        <input name="postal_code" placeholder={t("postalCode")} value={delivery.postal_code} onChange={updateDelivery}
                            className="p-3 border rounded-xl font-[Panchang-Regular]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="district" placeholder={t("district")} value={delivery.district} onChange={updateDelivery}
                            className="p-3 border rounded-xl font-[Panchang-Regular]" />
                        <input name="country" placeholder={t("country")} value={delivery.country} onChange={updateDelivery}
                            className="p-3 border rounded-xl font-[Panchang-Regular]" />
                    </div>
                </div>
            )}

            <Button
                shape="full"
                onClick={() => {
                    if (!billing.name || !billing.surname || !billing.street || !billing.city || !billing.postal_code || !billing.district || !billing.country) {
                        alert(t("fillShippingData"));
                        return;
                    }
                    setStep(2);
                }}
            >
                {t("checkoutContinueButton")}
            </Button>
        </div>
    );
}