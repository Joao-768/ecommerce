import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

export default function NewestWatch({ onNavigate }) {
  const [isHidden, setIsHidden] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      setIsHidden(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pt-48 text-black flex flex-col h-screen items-start relative overflow-hidden">
      <div className="absolute inset-0 pt-40 z-0">
        <img
          src="/images/mountains.png"
          alt="Mountains"
          className="w-full h-full object-contain -mt-35"
        />
      </div>
      <img
        src="/images/tiger.png"
        alt="Tiger"
        className="absolute left-10 bottom-28 h-5/9 z-10"
      />
      <img
        src="/images/ground.png"
        alt="Ground"
        className="absolute left-10 bottom-28 h-5/9 z-10"
      />
      <img
        src="/images/eternal-beasts/the-white-fang.png"
        alt="White Fang"
        className="absolute left-185 top-100 w-3/8 -translate-x-1/2 -translate-y-1/2 z-10"
      />
      <div className="flex flex-col items-start pt-40 z-10 translate-x-16 ml-210">
        <div className="text-[62px] font-[Panchang-Extrabold] -mb-10 pt-4">
          The White
        </div>
        <div className="text-9xl font-[Panchang-ExtraBold] pr-30">Fang</div>

        <button
          className="px-6 min-w-30 h-12 text-sm font-[Panchang-Regular] bg-black text-white border-2 border-black cursor-pointer mb-5 rounded-md hover:bg-white hover:text-black transition-all duration-200"
          onClick={() => onNavigate('product', { productId: 1 })}
        >
          {t("buyNow")}
        </button>

        <button 
          className="px-6 min-w-20 h-12 text-sm font-[Panchang-Regular] bg-white text-black border-2 border-black cursor-pointer rounded-md hover:bg-black hover:text-white transition-all duration-200"
          onClick={() => onNavigate("collection", { collectionId: "eternalBeastsCollection" })}>
          {t("eternalBeastsCollection")}
        </button>
      </div>
            
      <div
        className={`w-screen flex flex-col items-center pt-20 font-[Panchang-Regular] transition-opacity duration-300 ${
          isHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
        }`}
      >
        <div className='-mt-3'>{t("slideDown")}</div>
        <div className="mt-2 h-12 w-px bg-black" aria-hidden="true" />
      </div>
    </div>
  );
}
