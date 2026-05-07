import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { getCartItems, removeCartItem } from "../../api/productsApi";
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../../utils/format';

export default function Cart({ isOpen, onClose }) {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const account = localStorage.getItem("account");

    const navigate = useNavigate();

    useScrollToTop();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!account || !isOpen) {
            setCartItems([]);
            return;
        }

        getCartItems(account)
            .then((data) => setCartItems(data || []))
            .catch(() => setCartItems([]));
    }, [account, isOpen]);

    let total = 0;
    for (const item of cartItems) {
        total += Number(item.price || 0);
    }

    function removeItem(productId) {
        removeCartItem(account, productId)
            .then(() => {
                setCartItems(prev =>
                    prev.filter(item => item.id !== productId)
                );
            })
            .catch(console.error);
    }

    function currency(price) {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            {/* Cart */}
            <aside className="absolute inset-y-0 right-0 w-1/3 bg-white shadow-lg flex flex-col">
                <div className="p-6 flex items-center justify-between border-b">
                    <h2 className="text-xl font-[Panchang-Semibold]">{t("cart")}</h2>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 absolute top-4 right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-6 font-[Panchang-Regular] overflow-y-auto flex-1">
                    { cartItems.length !== 0 ? (
                        cartItems.map((product) => (
                            <div key={product.id} className="relative flex items-center gap-4 mb-4 border border-stone-300 h-34">
                                <div className="w-34 h-34 bg-stone-200 flex items-center justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="max-w-28 max-h-28 object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-[Panchang-Semibold]">{product.name}</h2>
                                    <h3 className='text-base font-[Panchang-Regular]'>{t(product.collection)}</h3>
                                    <p className="text-sm">{currency(product.price)}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(product.id)}
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
                { cartItems.length !== 0 && (
                    <div className="mt-auto">
                        <div className='border-t border-stone-300 my-5'></div>
                        <div className="px-6 flex items-center justify-between font-[Panchang-Semibold] text-lg">
                            <span>{t("total")}:</span>
                            <div className="text-right">
                                <div>{currency(total)}</div>
                                <div className="text-xs font-[Panchang-Regular] text-stone-500">
                                    {t("vat")}
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-1/2 mx-auto h-12 text-sm font-[Panchang-Regular] bg-black text-white border-2 border-black cursor-pointer mb-5 rounded-md hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center shadow-md"
                            onClick={() => {
                                navigate('/checkout');
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
