import './headerAnimation.css';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { getUserRole } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";
import { NavButton } from '../../ui/Buttons';

export default function Header({ setCartIsOpen }) {

    const account = localStorage.getItem("account");
    const [isHidden, setIsHidden] = useState(false);
    const langOptions = ["pt", "fr", "en", "es", "de"];
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(() => {
        const storedLang = localStorage.getItem("language");
        if (storedLang && storedLang !== i18n.language)
            i18n.changeLanguage(storedLang);
        if (storedLang == null && i18n.language)
            localStorage.setItem("language", i18n.language);
    }, [i18n]);

    const handleAccountClick = async () => {
        if (!account) {
            navigate("/login");
            return;
        }

        try {
            const roleData = await getUserRole(account);
            const role = (roleData?.userRole ?? "").toLowerCase();
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user-page/control-panel");
            }
        } catch {
            navigate("/user-page/control-panel");
        }
    };


    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const currentY = window.scrollY;

            setIsHidden(currentY > lastScrollY);
            if(lastScrollY <= 0) 
                setIsHidden(false);

            lastScrollY = currentY;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={isHidden ? 'header fixed top-0 left-0 h-30 w-full z-50 flex flex-col text-sm  header--hidden' : 'header fixed top-0 left-0 h-30 w-full z-50 flex flex-col text-sm '}>
            <div className='flex-1 flex items-center justify-between gap-5 p-25 w-full box-border relative header-top'>
                
                {/* Left Header */}
                <div className='header-left'>
                    <select
                        className='bg-none border-none cursor-pointer text-xl flex m-0 p-0 pointer-events-auto z-10 font-[Panchang-Regular] header-button outline-none'
                        value={i18n.language || "en"}
                        onChange={(e) => {
                        const nextLang = e.target.value;
                        localStorage.setItem("language", nextLang);
                        i18n.changeLanguage(nextLang);
                        }}
                    >
                        {langOptions.map((option) => (
                            <option key={option} value={option}>
                                {option.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <NavButton className="text-xl header-button" onClick={() => navigate('/about-us')}>
                        {t("aboutUs")}
                    </NavButton>
                </div>

                {/* Central Header */}
                <NavButton className="text-xl active:scale-100" onClick={() => navigate('/')}>
                    <img className='object-contain mt-4 brightness-0 title h-8' src="/images/logo/logo.png" alt="logo" />
                </NavButton>

                {/* Right Header */}
                <div className='header-right'>
                    <NavButton header className="text-xl" onClick={() => navigate("/search")}><IoSearch /></NavButton>
                    <NavButton header className="text-xl" onClick={() => navigate('/wishlist')}><IoMdHeart /></NavButton>
                    <NavButton header className="text-xl" onClick={() => setCartIsOpen(true)}><IoBagHandle /></NavButton>
                    <NavButton header className="relative text-xl" onClick={handleAccountClick}>
                        <IoPerson />
                        {account != null && <span className="account-dot absolute -top-1 -right-1 w-1.5 h-1.5 bg-black rounded-full" />}
                    </NavButton>
                </div>
            </div>
            {/* Bottom Header */}
            <div className='header-bottom flex-1 flex items-center justify-center gap-5 w-full box-border'>
                <NavButton className="text-base header-button" onClick={() => navigate(`/category/1`)}>{t("daily")}</NavButton>
                <NavButton className="text-base header-button" onClick={() => navigate(`/category/2`)}>{t("casual")}</NavButton>
                <NavButton className="text-base header-button" onClick={() => navigate(`/category/3`)}>{t("elegance")}</NavButton>
            </div>
        </header>
    );
}
