import { useEffect, useState } from "react";
import { FiCreditCard, FiLock, FiShoppingCart } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { getCartItems, clearCart, decreaseStock } from "../../api/productsApi";
import { getAddresses, getUserById } from "../../api/usersApi";
import { useTranslation } from "react-i18next";
import { createOrder, setOrderItems, updateOrderAddress } from "../../api/ordersApi";
import { formatCurrency, useScrollToTop } from "../../utils/format";

export default function Checkout() {
    const account = localStorage.getItem("account");
    const [step, setStep] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [show, setShow] = useState(false);
    const { t } = useTranslation();

    useScrollToTop();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        address: "",
        street: "",
        city: "",
        postal_code: "",
        district: "",
        country: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const update = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getCartItems(account)
            .then((data) => setCartItems(data || []))
            .catch(() => setCartItems([]));

        getUserById(account)
            .then((user) => {
                setForm((prev) => ({
                    ...prev,
                    name: user.name,
                    surname: user.surname,
                }));
        });


        getAddresses(account)
            .then((address) => setAddresses(address || []))
            .catch(() => setAddresses([]));
    }, [account]);

    async function payement() {
        if(!form.name || !form.surname || !total || !form.cardNumber || !form.expiry || !form.cvc){
            alert("Campos em falta!");
            return;
        }
        try {
            const order = await createOrder(account, form.name, form.surname, total);

            await updateOrderAddress(order.id, form.street, form.city, form.postal_code, form.district, form.country);

            await setOrderItems(order.id, cartItems);

            for (const item of cartItems) {
                await decreaseStock(item.id, item.quantity || 1);
            }

            await clearCart(account);

            alert("Order successfully created!");
        } catch (err) {
            console.error(err);
        }
    }

    let total = 0;
    for (const item of cartItems) {
        total += Number(item.price || 0);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl grid md:grid-cols-3 gap-6">
                {/* Form */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6">
                        <FiShoppingCart className="text-xl" />
                        <h1 className="text-xl font-bold">{t("checkout")}</h1>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex gap-2 mb-6">
                        {[1, 2].map((s) => (
                            <div
                                key={s}
                                className={`h-2 flex-1 rounded-full ${
                                    step >= s ? "bg-black" : "bg-gray-200"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="font-semibold">Shipping Information</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    name="name"
                                    placeholder={t("name")}
                                    value={form.name}
                                    onChange={update}
                                    className="w-full p-3 border rounded-xl"
                                />

                                <input
                                    name="surname"
                                    placeholder={t("surname")}
                                    value={form.surname}
                                    onChange={update}
                                    className="w-full p-3 border rounded-xl"
                                />
                            </div>

                        <div className="relative">
                        <input
                            name="street"
                            placeholder={t("street")}
                            value={form.street}
                            onChange={(e) => setForm({ ...form, street: e.target.value })}
                            onFocus={() => setShow(true)}
                            className="w-full p-3 border rounded-xl"
                        />

                        {show && (
                            <div className="absolute w-full bg-white border rounded-xl mt-1 shadow">
                                {addresses.map((a) => (
                                    <div
                                        key={a.id}
                                        onClick={() => {
                                            setForm({
                                                ...form,
                                                street: a.street,
                                                city: a.city,
                                                postal_code: a.postal_code,
                                                district: a.district,
                                                country: a.country,
                                            });
                                            setShow(false);
                                        }}
                                        className="p-3 hover:bg-gray-100 hover:rounded-xl cursor-pointer"
                                    >
                                        {a.street}
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="city"
                                placeholder={t("city")}
                                value={form.city}
                                onChange={update}
                                className="p-3 border rounded-xl"
                            />

                            <input
                                name="postal_code"
                                placeholder={t("postalCode")}
                                value={form.postal_code}
                                onChange={update}
                                className="p-3 border rounded-xl"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="district"
                                placeholder={t("district")}
                                value={form.district}
                                onChange={update}
                                className="p-3 border rounded-xl"
                            />

                            <input
                                name="country"
                                placeholder={t("country")}
                                value={form.country}
                                onChange={update}
                                className="p-3 border rounded-xl"
                            />
                        </div>

                            <button
                                onClick={() => {
                                    if (!form.name || !form.surname || !form.street || !form.city || !form.postal_code || !form.district || !form.country) {
                                        alert("Preenche os dados de envio");
                                        return;
                                    }
                                setStep(2);
                                }}
                                className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 border-2 hover:text-black hover:bg-white duration-200"
                            >
                                {t("checkoutContinueButton")}
                            </button>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="font-semibold">{t("secondCheckoutSubtitle")}</h2>

                            <div className="flex items-center gap-3 text-xl">
                                <FaCcVisa />
                                <FaCcMastercard />
                                <FaPaypal />
                            </div>

                            <div className="relative">
                                <FiCreditCard className="h-1/2 absolute left-3 top-3 text-gray-400" />
                                <input
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={form.cardNumber}
                                    onChange={update}
                                    className="w-full p-3 pl-10 border rounded-xl"
                                />
                            </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="expiry"
                                placeholder="MM/YY"
                                value={form.expiry}
                                onChange={update}
                                className="p-3 border rounded-xl"
                            />

                            <input
                                name="cvc"
                                placeholder="CVC"
                                value={form.cvc}
                                onChange={update}
                                className="p-3 border rounded-xl"
                            />
                        </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full bg-white text-black py-3 rounded-xl hover:opacity-90 border-2 hover:text-white hover:bg-black duration-200"
                            >
                                    {t("checkoutBack")}
                                </button>

                                <button 
                                    className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 border-2 border-black hover:text-black hover:bg-white duration-200"
                                    onClick={payement}
                                >
                                    <FiLock /> {t("checkoutPay")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Page */}
                <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
                    <h2 className="font-bold mb-4">{t("orderSummary")}</h2>

                    <div className="space-y-3 text-sm">

                        {cartItems.map((p) => (
                            <div key={p.id} className="flex justify-between">
                            <span>{p.name}</span>
                            <span>{formatCurrency(p.price)}</span>
                        </div>
                        ))}

                        <div className="border-t pt-3 flex justify-between font-bold">
                            <span>{t("total")}</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
