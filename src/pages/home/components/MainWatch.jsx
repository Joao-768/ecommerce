import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/Buttons';

export default function MainWatch() {
    const [isHidden, setIsHidden] = useState(false);
    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => {
            setIsHidden(window.scrollY > 10);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* Original hero — UNCHANGED, shown only at >=1400px (the design target width) */}
            <div className="hidden min-[1400px]:flex pt-48 text-black flex-col h-screen items-start relative overflow-hidden">

                <div className="absolute inset-0 pt-40 z-0">
                    <img
                        src="/images/mountains.png"
                        alt="Mountains"
                        className="w-screen h-full object-contain -mt-35"
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
                    className="absolute left-181 top-100 w-3/8 -translate-x-1/2 -translate-y-1/2 z-10"
                />

                <div className="flex flex-col items-start pt-40 z-10 translate-x-16 ml-210">
                    <div className="text-[62px] font-[Panchang-Extrabold] -mb-10 pt-4">
                        The White
                    </div>

                    <div className="text-9xl font-[Panchang-ExtraBold] pr-30">
                        Fang
                    </div>

                    <Button className="mb-5 shadow-xl" onClick={() => navigate('product/1')}>
                        {t("buyNow")}
                    </Button>

                    <Button variant="secondary" className="shadow-xl" onClick={() => navigate('collection/1')}>
                        {t("eternalBeastsCollection")}
                    </Button>
                </div>

                <div
                    className={`w-screen flex flex-col items-center pt-20 font-[Panchang-Regular] transition-opacity duration-300 ${
                        isHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
                    }`}
                >
                    <div className='-mt-3'>
                        {t("slideDown")}
                    </div>

                    <div className="mt-2 h-12 w-px bg-black" />
                </div>
            </div>

            {/* Responsive stacked hero — shown only below 1400px */}
            <div className="flex min-[1400px]:hidden pt-32 sm:pt-40 text-black flex-col min-h-screen items-center relative overflow-hidden">

                <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                    <img
                        src="/images/mountains.png"
                        alt="Mountains"
                        className="w-full object-contain"
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full">

                    {/* Watch (main) with tiger beside */}
                    <div className="relative w-full flex items-end justify-center h-[40vh]">
                        <div className="absolute bottom-0 left-0 h-[62%] flex items-end">
                            <img src="/images/tiger.png" alt="Tiger" className="h-full object-contain max-w-none" />
                            <img src="/images/ground.png" alt="Ground" className="absolute bottom-0 left-0 h-full object-contain max-w-none" />
                        </div>
                        <img
                            src="/images/eternal-beasts/the-white-fang.png"
                            alt="White Fang"
                            className="relative h-full object-contain translate-x-6"
                        />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col items-center text-center">
                        <div className="text-[clamp(2rem,7vw,3.5rem)] font-[Panchang-Extrabold] leading-none -mb-2">
                            The White
                        </div>
                        <div className="text-[clamp(3.5rem,14vw,7rem)] font-[Panchang-ExtraBold] leading-none">
                            Fang
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col items-center gap-4">
                        <Button className="shadow-xl" onClick={() => navigate('product/1')}>
                            {t("buyNow")}
                        </Button>
                        <Button variant="secondary" className="shadow-xl" onClick={() => navigate('collection/1')}>
                            {t("eternalBeastsCollection")}
                        </Button>
                    </div>
                </div>

                <div
                    className={`w-full flex flex-col items-center pt-8 pb-6 font-[Panchang-Regular] transition-opacity duration-300 ${
                        isHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
                    }`}
                >
                    <div>{t("slideDown")}</div>
                    <div className="mt-2 h-12 w-px bg-black" />
                </div>
            </div>
        </>
    );
}
