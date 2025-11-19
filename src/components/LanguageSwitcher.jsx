import React, { useState, useRef, useEffect } from 'react';
import i18n from '../i18n/i18n';

const LanguageSwitcher = () => {
    const [currentLang, setCurrentLang] = useState(i18n.getLanguage());
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const languages = i18n.getAvailableLanguages();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (lang) => {
        i18n.setLanguage(lang);
        setCurrentLang(lang);
        setIsOpen(false);
        // Force re-render of parent components
        window.location.reload();
    };

    return (
        <div className="language-switcher" ref={dropdownRef}>
            <button
                className="globe-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change language"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            className={`lang-option ${currentLang === lang ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(lang)}
                        >
                            <span className="lang-name">{i18n.getLanguageName(lang)}</span>
                            {currentLang === lang && <span className="checkmark">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
