import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enShop from "./locales/en/shop.json";
import enCheckout from "./locales/en/checkout.json";
import enAccount from "./locales/en/account.json";
import enAbout from "./locales/en/about.json";

// Portuguese
import ptCommon from "./locales/pt/common.json";
import ptAuth from "./locales/pt/auth.json";
import ptShop from "./locales/pt/shop.json";
import ptCheckout from "./locales/pt/checkout.json";
import ptAccount from "./locales/pt/account.json";
import ptAbout from "./locales/pt/about.json";

// Spanish
import esCommon from "./locales/es/common.json";
import esAuth from "./locales/es/auth.json";
import esShop from "./locales/es/shop.json";
import esCheckout from "./locales/es/checkout.json";
import esAccount from "./locales/es/account.json";
import esAbout from "./locales/es/about.json";

// French
import frCommon from "./locales/fr/common.json";
import frAuth from "./locales/fr/auth.json";
import frShop from "./locales/fr/shop.json";
import frCheckout from "./locales/fr/checkout.json";
import frAccount from "./locales/fr/account.json";
import frAbout from "./locales/fr/about.json";

// German
import deCommon from "./locales/de/common.json";
import deAuth from "./locales/de/auth.json";
import deShop from "./locales/de/shop.json";
import deCheckout from "./locales/de/checkout.json";
import deAccount from "./locales/de/account.json";
import deAbout from "./locales/de/about.json";

const en = { ...enCommon, ...enAuth, ...enShop, ...enCheckout, ...enAccount, ...enAbout };
const pt = { ...ptCommon, ...ptAuth, ...ptShop, ...ptCheckout, ...ptAccount, ...ptAbout };
const es = { ...esCommon, ...esAuth, ...esShop, ...esCheckout, ...esAccount, ...esAbout };
const fr = { ...frCommon, ...frAuth, ...frShop, ...frCheckout, ...frAccount, ...frAbout };
const de = { ...deCommon, ...deAuth, ...deShop, ...deCheckout, ...deAccount, ...deAbout };

i18n
    .use(initReactI18next)
    .init({
        resources: {
            de: { translation: de },
            en: { translation: en },
            es: { translation: es },
            fr: { translation: fr },
            pt: { translation: pt }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
