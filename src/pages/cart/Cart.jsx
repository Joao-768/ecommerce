import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { getCartItems, ajustCartItemQuantity, removeCartItem } from "../../api/cartApi";
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../../utils/format';
import { Button, IconButton } from "../../ui/Buttons";
import EmptyState from '../../ui/EmptyState';

export default function Cart({ isOpen, onClose }) {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const account = localStorage.getItem("account");
    const navigate = useNavigate();

    useScrollToTop();

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            document.body.style.overflow = "hidden";
            setTimeout(() => setVisible(true), 10);
        } else {
            setVisible(false);
            setTimeout(() => {
                setMounted(false);
                document.body.style.overflow = "auto";
            }, 300);
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    useEffect(() => {
        if (!account || !mounted) {
            setCartItems([]);
            return;
        }
        getCartItems(account)
            .then((data) => setCartItems(data || []))
            .catch(() => setCartItems([]));
    }, [account, mounted]);

    let total = 0;
    for (const item of cartItems) {
        total += Number(item.price || 0) * (item.quantity || 1);
    }

    async function removeItem(productId, quantity, product) {
        try {
            if (quantity > 1) {
                await ajustCartItemQuantity(account, productId, 1, "decrease", product.size_mm);
                setCartItems(prev =>
                    prev.map(item =>
                        item.id === productId && item.size_mm === product.size_mm
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                );
            } else {
                await removeCartItem(account, productId, product.size_mm);
                setCartItems(prev =>
                    prev.filter(item => !(item.id === productId && item.size_mm === product.size_mm))
                );
            }
        } catch (err) {
            console.error(err);
        }
    }

    function currency(price) {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
                style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 300ms ease-in-out",
                }}
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Cart */}
            <aside
                style={{
                    transform: visible ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 300ms ease-in-out",
                }}
                className="absolute inset-y-0 right-0 w-1/3 bg-white shadow-lg flex flex-col"
            >
                <div className="p-6 flex items-center justify-between border-b">
                    <h2 className="text-xl font-[Panchang-Semibold]">{t("cart")}</h2>
                    <IconButton onClick={onClose} className="absolute top-4 right-6 text-xl font-bold">
                        ✕
                    </IconButton>
                </div>

                <div className="p-6 font-[Panchang-Regular] overflow-y-auto flex-1">
                    {cartItems.length !== 0 ? (
                        cartItems.map((product) => (
                            <div
                                key={product.id}
                                className="relative flex items-center gap-4 mb-4 border border-stone-300 h-34"
                                onClick={() => {
                                    navigate(`/product/${product.id}`);
                                    onClose();
                                }}
                            >
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
                                    <p className="text-sm">{product.size_mm}mm</p>
                                    <p className="text-sm">x{product.quantity}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeItem(product.id, product.quantity, product);
                                    }}
                                    className="h-10 w-10 absolute ml-98 mb-24 text-sm font-bold cursor-pointer text-stone-400 hover:text-black transition-all duration-300 active:scale-80"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    ) : (
                        <EmptyState message={t("cartEmpty")} />
                    )}
                </div>

                {cartItems.length !== 0 && (
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
                        <div className="px-6 m-5">
                            <Button
                                className="w-full flex items-center justify-center shadow-md"
                                onClick={() => { navigate('/checkout'); onClose(); }}
                            >
                                {t("checkoutButton")}
                            </Button>
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}