import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/enTranslation.json";
import es from "./locales/esTranslation.json";
import fr from "./locales/frTranslation.json";
import pt from "./locales/ptTranslation.json";
import de from "./locales/deTranslation.json"

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