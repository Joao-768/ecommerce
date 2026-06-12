import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

export default function ProductGrid({ products, onCardClick, isSelling, isRemovable, onRemove, className = "", showSize = false }) {
    const navigate = useNavigate();

    return (
        <div className={className || "flex flex-wrap gap-6 justify-center"}>
            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    item={p}
                    onClick={() => onCardClick ? onCardClick(p) : navigate(`/product/${p.id}`)}
                    isSelling={isSelling}
                    isRemovable={isRemovable}
                    onRemove={onRemove}
                    showSize={showSize}
                    size={p.size ?? p.size_mm}
                />
            ))}
        </div>
    );
}