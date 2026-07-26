import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Audience() {
    const { t } = useTranslation();
    const cards = [
        { id: 1, title: "mensWatches", image: "/mensWatches.png" },
        { id: 2, title: "womensWatches", image: "/womensWatches.png" },
        { id: 6, title: "limitedCollection", image: "/limitedCollection.png" },
    ];

    const images = [
        { id: 1, watch: 1, src: "/images/eternal-beasts/the-white-fang.png", alt: "the-white-fang"},
        { id: 1, watch: 2, src: "/images/winter-edition/the-arctic-wolf.png", alt: "the-arctic-wolf"},
        { id: 2, watch: 1, src: "/images/spring-edition/the-pinky-blossom.png", alt: "the-pinky-blossom"},
        { id: 2, watch: 2, src: "/images/winter-edition/the-ice-dragon.png", alt: "the-ice-dragon"},
        { id: 6, watch: 1, src: "/images/limited-edition/the-sovereign-eclipse.png", alt: "the-sovereign-eclipse"},
        { id: 6, watch: 2, src: "/images/limited-edition/the-legendary-crown.png", alt: "the-legendary-crown"},
    ]

    const navigate = useNavigate();

    return (
        <div className="min-h-screen lg:h-screen px-4 lg:px-10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-full">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="relative overflow-hidden rounded-lg h-64 lg:h-auto cursor-pointer"
                        onClick={() =>
                            navigate(
                                card.title === "mensWatches" || card.title === "womensWatches"
                                    ? `/gender/${card.id}`
                                    : `/collection/${card.id}`
                            )
                        }
                    >
                        <img
                            src={images.find(img => img.id === card.id && img.watch === 1)?.src}
                            className="absolute top-1/2 -translate-y-1/2 lg:translate-y-0 lg:top-0 left-[10%] lg:-left-1/5 h-2/3 lg:h-auto object-contain"
                        />
                        <img
                            src={images.find(img => img.id === card.id && img.watch === 2)?.src}
                            className="absolute bottom-0 right-[10%] lg:-right-1/5 h-2/3 lg:h-auto object-contain"
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
