import './CartAnimation.css';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

export default function Cart({ onNavigate, isOpen, onClose, product, cartItems, setCartItems }) {

    const { t } = useTranslation();
    const [isCartEmpty, setIsCartEmpty] = useState(true);

    useEffect(() => {
        setIsCartEmpty(cartItems.length === 0);
    }, [cartItems]);

    let total = 0;
    for (const item of cartItems) {
        total += Number(item.price || 0);
    }

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-backdrop" onClick={onClose} />
            {/* Cart */}
            <aside className="cart-panel flex flex-col">
                <div className="p-6 flex items-center justify-between border-b">
                    <h2 className="text-xl font-[Panchang-Semibold]">Cart</h2>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 absolute top-4 right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-6 font-[Panchang-Regular]">
                    { !isCartEmpty ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 mb-4 border border-stone-300 h-34">
                                <img src={`/images/${item.collection}/${item.image}`} alt={item.name} className="w-34 h-34 object-cover rounded" />
                                <div>
                                    <h2 className="text-lg font-[Panchang-Semibold]">{item.name}</h2>
                                    <h3 className='text-base font-[Panchang-Regular]'>{t(item.collection)}</h3>
                                    <p className="text-sm">{item.price}€</p>
                                </div>
                                <button
                                    onClick={() => setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== item.id))}
                                    className="h-10 w-10 absolute ml-98 mb-24 text-sm font-bold cursor-pointer hover:border-black transition-all duration-300"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>{t("cartEmpty")}</p>
                    )}
                </div>

                {/* Checkout  */}
                {!isCartEmpty && (
                    <div className="mt-auto">
                        <div className='border-t border-stone-300 my-5'></div>
                        <div className="px-6 flex items-center justify-between font-[Panchang-Semibold] text-lg">
                            <span>{t("total")}:</span>
                            <div className="text-right">
                                <div>{total}.00€</div>
                                <div className="text-xs font-[Panchang-Regular] text-stone-500">
                                    {t("vat")}
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-1/2 mx-auto h-12 text-sm font-[Panchang-Regular] bg-black text-white border border-black cursor-pointer mb-5 rounded-md hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center"
                            onClick={() => {
                                onNavigate('checkout');
                                onClose();
                            }}
                        >
                            {t("checkoutButton")}
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
}
