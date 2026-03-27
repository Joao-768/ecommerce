import './headerAnimation.css';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Header({ onNavigate, lang, setLang, haveAccount }) {

  const [isHidden, setIsHidden] = useState(false);
  const langOptions = ["pt", "fr", "en", "es", "de"];
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    lastScrollY.current = window.scrollY || 0;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastScrollY.current;

        if (currentY <= 0) {
          setIsHidden(false);
        } else if (delta > 5) {
          setIsHidden(true);
        } else if (delta < -5) {
          setIsHidden(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={isHidden ? 'header fixed top-0 left-0 h-30 w-full z-50 flex flex-col text-sm  header--hidden' : 'header fixed top-0 left-0 h-30 w-full z-50 flex flex-col text-sm '}>
      <div className='flex-1 flex items-center justify-between gap-5 p-25 w-full box-border relative header-top'>
        {/* Left Header */}
        <div className='header-left'>
          <select
            className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button'
            value={lang}
            onChange={(e) => {
              const nextLang = e.target.value;
              setLang(nextLang);
              i18n.changeLanguage(nextLang);
            }}
          >
            {langOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          <button className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button' onClick={() => onNavigate('aboutUs')}>
            {t("aboutUs")}
          </button>
        </div>
        {/* Central Header */}
        <button className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button' onClick={() => onNavigate('home')}>
          <img className='h-50 object-contain mt-4 brightness-0 title' src="/images/untitled.png" alt="untitled" />
        </button>
        {/* Right Header */}
        <div className='header-right'>
          <button className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 header-button' onClick={() => onNavigate('search')}><IoSearch /></button>
          <button className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 header-button' onClick={() => onNavigate('wishlist')}><IoMdHeart /></button>
          <button className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 header-button' onClick={() => onNavigate('cart')}><IoBagHandle /></button>
          <button className='bg-none border-none text-black cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 header-button' onClick={() => haveAccount ? onNavigate('userPage') : onNavigate('login')}><IoPerson /></button>
        </div>
      </div>
      {/* Bottom Header */}
      <div className='header-bottom flex-1 flex items-center justify-center gap-5 w-full box-border'>
        <button className='bg-none border-none text-black cursor-pointer text-base flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button'  onClick={() => onNavigate('category', { categoryId: 'daily' })}>
          {t("daily")}
        </button>
        <button className='bg-none border-none text-black cursor-pointer text-base flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button'  onClick={() => onNavigate('category', { categoryId: 'casual' })}>
          {t("casual")}
        </button>
        <button className='bg-none border-none text-black cursor-pointer text-base flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button'  onClick={() => onNavigate('category', { categoryId: 'elegance' })}>
          {t("elegance")}
        </button>
      </div>
    </header>
  );
}
