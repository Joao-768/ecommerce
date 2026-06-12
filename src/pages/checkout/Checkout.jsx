import { useEffect, useState } from "react";
import { adjustStock } from "../../api/productsApi";
import { getCartItems, clearCart } from "../../api/cartApi";
import { getAddresses, getPaymentMethod, getUserById, setPaymentMethod, setNif } from "../../api/usersApi";
import { useTranslation } from "react-i18next";
import { createOrder, createOrderAddress, setOrderItems } from "../../api/ordersApi";
import { formatCurrency, useScrollToTop } from "../../utils/format";
import { FiShoppingCart } from "react-icons/fi";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Summary from "./Summary";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const account = localStorage.getItem("account");
    const [step, setStep] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [isDifferentAddress, setIsDifferentAddress] = useState(false);
    const [user, setUser] = useState(null);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const { t } = useTranslation();
    const navigate = useNavigate();

    useScrollToTop();

    const [billing, setBilling] = useState({
        name: "", surname: "", email: "", nif: "",
        address: "", street: "", city: "", postal_code: "", district: "", country: ""
    });

    const [delivery, setDelivery] = useState({
        name: "", surname: "",
        address: "", street: "", city: "", postal_code: "", district: "", country: ""
    });

    const [card, setCard] = useState({
        cardNumber: "", expiry: "", cvc: ""
    });

    const updateBilling = (e) => setBilling(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const updateDelivery = (e) => setDelivery(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const updateCard = (e) => setCard(prev => ({ ...prev, [e.target.name]: e.target.value }));

    useEffect(() => {
        getCartItems(account)
            .then((data) => setCartItems(data))
            .catch(() => setCartItems([]));

        getUserById(account)
        .then((u) => {
            setUser(u);
            setBilling(prev => ({ ...prev, name: u.name, surname: u.surname, nif: u.nif ?? "" }));
        });

        getAddresses(account)
            .then((address) => setAddresses(address))
            .catch(() => setAddresses([]));

        getPaymentMethod(account)
        .then((data) => {
            setSavedCards(data);
            if (data?.length) setSelectedCard(data[0]);
        })
        .catch(() => setSavedCards([]));
    }, [account]);

    async function payment() {
        const finalDelivery = isDifferentAddress ? delivery : billing;

        if (!billing.name || !billing.surname || !total) {
            alert(t("missingFields"));
            return;
        }

        if (billing.nif.length !== 9 || !/^\d+$/.test(billing.nif)) {
            alert(t("invalidNIF"));
            return;
        }

        if (!finalDelivery.street || !finalDelivery.city || !finalDelivery.postal_code || !finalDelivery.district || !finalDelivery.country) {
            alert(t("missingAddress"));
            return;
        }

        if (finalDelivery.postal_code.length < 4 || finalDelivery.postal_code.length > 10) {
            alert(t("invalidPostalCode"));
            return;
        }

        if (!card.cvc) {
            alert(t("missingFields"));
            return;
        }

        if (!selectedCard) {
            if (!card.cardNumber || !card.expiry || !card.cvc) { 
                alert(t("missingFields")); 
                return; 
            }

            if (card.cvc.length !== 3 || card.cardNumber.length !== 16 || !/^\d+$/.test(card.cvc) || !/^\d+$/.test(card.cardNumber)) { 
                alert(t("invalidPayment")); 
                return; 
            }

            if (card.expiry.length !== 5 || card.expiry[2] !== "/") { 
                alert(t("invalidExpiryFormat")); 
                return; 
            }

            const [month, year] = card.expiry.split("/");
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;

            if (Number(month) < 1 || Number(month) > 12) { 
                alert(t("invalidMonth")); 
                return; 
            }
            if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) { 
                alert(t("expiredCard")); 
                return; 
            }
        } else {
            if (card.cvc.length !== 3 || !/^\d+$/.test(card.cvc)) { 
                alert(t("invalidPayment")); 
                return; 
            }
        }

        try {
            const order = await createOrder(account, total, billing.nif);
            await createOrderAddress(order.id, finalDelivery);
            await setOrderItems(order.id, cartItems);
            if (!user?.nif) {
                await setNif(account, billing.nif);
            }
            if (!selectedCard) {
                await setPaymentMethod(account, card.cardNumber, card.expiry);
            }
            for (const item of cartItems) await adjustStock(item.id, item.quantity || 1, "decrease");
            await clearCart(account);
            alert(t("orderSuccess"));
            navigate("/user-page/orders");
        } catch (err) {
            console.error(err);
        }
    }

    let total = 0;
    for (const item of cartItems) total += Number(item.price || 0) * (item.quantity || 1);

    return (
        <div className="min-h-screen flex items-start justify-center p-6 pt-40">
            <div className="w-full max-w-6xl grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <FiShoppingCart className="text-xl" />
                        <h1 className="text-xl font-[Panchang-Semibold]">{t("checkout")}</h1>
                    </div>

                    <div className="flex gap-2 mb-6">
                        {[1, 2].map((s) => (
                            <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? "bg-black" : "bg-gray-200"}`} />
                        ))}
                    </div>

                    {step === 1 && (
                        <Step1
                            billing={billing} 
                            updateBilling={updateBilling}
                            delivery={delivery} 
                            updateDelivery={updateDelivery}
                            addresses={addresses} 
                            setStep={setStep} 
                            t={t}
                            isDifferentAddress={isDifferentAddress} 
                            setIsDifferentAddress={setIsDifferentAddress}
                            user={user}
                        />
                    )}
                    {step === 2 && (
                        <Step2
                            card={card}
                            updateCard={updateCard}
                            setStep={setStep}
                            payment={payment}
                            t={t}
                            savedCards={savedCards}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                        />
                    )}
                </div>

                <div className="md:col-span-2">
                    <Summary cartItems={cartItems} total={total} formatCurrency={formatCurrency} t={t} />
                </div>
            </div>
        </div>
    );
}