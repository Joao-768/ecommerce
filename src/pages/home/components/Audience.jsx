import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Audience() {
    const { t } = useTranslation();
    const cards = [
        { id: 1, title: "mensWatches", image: "/mensWatches.png" },
        { id: 2, title: "womensWatches", image: "/womensWatches.png" },
        { id: 6, title: "limitedCollection", image: "/limitedCollection.png" },
    ];

    const navigate = useNavigate();

    return (
        <div className="h-screen px-10 py-16">
            <div className="grid grid-cols-3 gap-4 h-full">
                {cards.map((card) => (
                    <div 
                        key={card.title} 
                        className="relative overflow-hidden rounded-lg"
                        onClick={() =>
                            navigate(
                                card.title === "mensWatches" || card.title === "womensWatches"
                                    ? `/gender/${card.id}`
                                    : `/collection/${card.id}`
                            )
                        }
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={card.image}
                            alt={card.title}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                            <span className="absolute bottom-4 left-4 text-white text-xl font-[Panchang-Semibold]">
                                {t(card.title)}
                            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
