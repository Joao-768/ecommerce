import { useState } from 'react';
import './cartAnimation.css';

export default function Cart({ isOpen, onClose }) {

    const [cartProducts, setCartProducts] = useState(0);

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-backdrop" onClick={onClose} />
            <aside className="cart-panel">
                <div className="p-6 flex items-center justify-between border-b">
                    <h2 className="text-xl font-[Panchang-Semibold]">Cart</h2>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 absolute top-4 right-6 text-xl rounded-xs font-bold cursor-pointer border border-stone-300 hover:border-black transition-all duration-300"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6 font-[Panchang-Regular]">
                    { cartProducts === 0 ? "Your cart is empty." : ""}
                </div>
            </aside>
        </div>
    );
}
