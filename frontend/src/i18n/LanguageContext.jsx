import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        try {
            return localStorage.getItem('mindpop_language') || 'en';
        } catch {
            return 'en';
        }
    });

    const setLanguage = useCallback((lang) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('mindpop_language', lang);
        } catch { /* ignore */ }
    }, []);

    // Translation function: returns the string for the given key in the current language
    const t = useCallback((key) => {
        const entry = translations[key];
        if (!entry) return key; // fallback to key itself
        return entry[language] || entry['en'] || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
};

export default LanguageContext;
