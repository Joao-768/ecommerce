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

export function generateCode(col, cat, id) {
    return `${col}-${cat}-${id}`
}

export function getSeasonStatus(collectionId) {
    const month = new Date().getMonth() + 1;

    const seasons = {
        "2": [3, 4, 5],
        "3": [6, 7, 8],
        "4": [9, 10, 11],
        "5": [12, 1, 2],
    };

    const season = seasons[collectionId];
    if (!season) return true;

    return season.includes(month);
}