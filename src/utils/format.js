import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function formatCurrency(price) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-PT");
}

export function useScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}
