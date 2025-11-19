import en from './locales/en';
import no from './locales/no';
import sv from './locales/sv';
import da from './locales/da';
import es from './locales/es';

const translations = {
    en,
    no,
    sv,
    da,
    es,
};

class I18nService {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.translations = translations;
    }

    /**
     * Detect user's preferred language
     */
    detectLanguage() {
        // Check localStorage first
        const saved = localStorage.getItem('language');
        if (saved && translations[saved]) {
            return saved;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            return browserLang;
        }

        // Default to English
        return 'en';
    }

    /**
     * Get translation for a key
     * @param {string} key - Dot-notation key (e.g., 'selection.title')
     * @param {Object} params - Parameters to replace in the translation
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (translation && typeof translation === 'object') {
                translation = translation[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return key;
            }
        }

        if (typeof translation !== 'string') {
            console.warn(`Translation for key "${key}" is not a string`);
            return key;
        }

        // Replace parameters
        return this.interpolate(translation, params);
    }

    /**
     * Replace parameters in translation string
     * @param {string} str - Translation string with placeholders
     * @param {Object} params - Parameters to replace
     */
    interpolate(str, params) {
        return str.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    /**
     * Set current language
     * @param {string} lang - Language code
     */
    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            return true;
        }
        return false;
    }

    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return Object.keys(translations);
    }

    /**
     * Get language name
     */
    getLanguageName(code) {
        const names = {
            en: 'English',
            no: 'Norsk',
            sv: 'Svenska',
            da: 'Dansk',
            es: 'Español',
        };
        return names[code] || code;
    }
}

// Export singleton instance
const i18n = new I18nService();
export default i18n;
