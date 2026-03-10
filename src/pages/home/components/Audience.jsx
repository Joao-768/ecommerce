import { useTranslation } from "react-i18next";

export default function Audience() {
  const { t } = useTranslation();
  const cards = [
    { title: "mensWatches", image: "/mensWatches.png" },
    { title: "womensWatches", image: "/womensWatches.png" },
    { title: "limitedCollection", image: "/limitedCollection.png" },
  ];

  return (
    <div className="h-screen bg-stone-100 px-10 py-16">
      <div className="grid grid-cols-3 gap-4 h-full">
        {cards.map((card) => (
          <div key={card.title} className="relative overflow-hidden rounded-lg">
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
