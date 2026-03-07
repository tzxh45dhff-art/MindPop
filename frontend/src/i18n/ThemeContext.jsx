import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDarkState] = useState(() => {
        try {
            return localStorage.getItem('mindpop_theme') === 'dark';
        } catch {
            return false;
        }
    });

    const toggleTheme = useCallback(() => {
        setIsDarkState(prev => {
            const next = !prev;
            try { localStorage.setItem('mindpop_theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
            return next;
        });
    }, []);

    const setDark = useCallback((val) => {
        setIsDarkState(val);
        try { localStorage.setItem('mindpop_theme', val ? 'dark' : 'light'); } catch { /* ignore */ }
    }, []);

    // Apply dark class to document root
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
};

export default ThemeContext;
