// File: src/i18n.js
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

/**
 * @summary Vue I18n configuration with English as default language and Spanish support.
 * @author John Doe
 */
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, es }
});

export default i18n;