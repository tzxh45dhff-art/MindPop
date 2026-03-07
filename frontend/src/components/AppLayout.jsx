import React from 'react';
import '../styles/global.css';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const NAV_ITEMS = [
    { id: 'home', labelKey: 'nav_home', icon: '🏠' },
    { id: 'subjects', labelKey: 'nav_subjects', icon: '📚' },
    { id: 'schedule', labelKey: 'nav_schedule', icon: '📅' },
    { id: 'learnmap', labelKey: 'nav_learnmap', icon: '🗺️' },
    { id: 'leaderboard', labelKey: 'nav_leaderboard', icon: '🏆' },
    { id: 'progress', labelKey: 'nav_progress', icon: '📈' },
];

const AppLayout = ({ children, currentPage, onNavigate }) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();

    return (
        <div className={`min-h-screen flex font-display overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#1a1a2e] text-gray-100' : 'bg-white text-black'}`}>
            {/* ─── SIDEBAR ─── */}
            <aside className={`w-[280px] border-r-[4px] border-black flex flex-col h-screen shrink-0 sticky top-0 transition-colors duration-300 ${isDark ? 'bg-[#16213e] border-r-gray-600' : 'bg-white'}`}>
                {/* Logo Area */}
                <div className={`p-6 border-b-[4px] flex items-center gap-4 ${isDark ? 'border-b-gray-600' : 'border-b-black'}`}>
                    <div className="w-10 h-10 bg-brutal-orange border-[3px] border-black" />
                    <span className="text-2xl font-black tracking-tighter uppercase">MINDPOP</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-8 px-6 flex flex-col gap-3">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate && onNavigate(item.id)}
                            className={`flex items-center gap-4 px-4 py-3 font-bold transition-all w-full text-left ${currentPage === item.id
                                ? `bg-brutal-orange border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none text-black`
                                : `border-[3px] border-transparent ${isDark ? 'hover:border-gray-500 hover:bg-[#1a1a2e]' : 'hover:border-black hover:bg-gray-100'}`
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span> {t(item.labelKey)}
                        </button>
                    ))}
                </nav>

                {/* Bottom Links */}
                <div className={`p-6 border-t-[4px] flex flex-col gap-3 ${isDark ? 'border-t-gray-600 bg-[#0f3460]' : 'border-t-black bg-slate-50'}`}>
                    <button
                        onClick={() => onNavigate && onNavigate('settings')}
                        className={`flex items-center gap-4 font-bold hover:underline w-full text-left ${currentPage === 'settings' ? 'text-brutal-orange' : ''}`}
                    >
                        <span className={`text-lg rounded-full p-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>⚙️</span> {t('nav_settings')}
                    </button>
                    <button
                        onClick={() => onNavigate && onNavigate('profile')}
                        className={`flex items-center gap-4 font-bold hover:underline w-full text-left ${currentPage === 'profile' ? 'text-brutal-orange' : ''}`}
                    >
                        <span className={`text-lg rounded-full p-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>👤</span> {t('nav_profile')}
                    </button>
                </div>
            </aside>

            {/* ─── MAIN CONTENT ─── */}
            <main className={`flex-1 flex flex-col h-screen overflow-y-auto relative transition-colors duration-300 ${isDark ? 'bg-[#1a1a2e]' : 'bg-gray-100'}`}>
                {!isDark && <div className="absolute inset-0 bg-white opacity-40 mix-blend-overlay pointer-events-none"></div>}

                {/* ── Header ── */}
                <header className={`px-8 py-5 flex justify-between items-center border-b-[4px] sticky top-0 z-20 transition-colors duration-300 ${isDark ? 'border-b-gray-600 bg-[#16213e]' : 'border-b-black bg-white'}`}>
                    <div className="w-[60%] lg:w-[45%]">
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-slate-400 font-bold text-xl">🔍</span>
                            <input
                                className={`w-full border-[4px] py-3 pl-12 pr-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all uppercase text-sm tracking-wide ${isDark ? 'border-gray-500 bg-[#1a1a2e] text-gray-100 placeholder-gray-500' : 'border-black bg-white placeholder-slate-500'}`}
                                placeholder={t('search_placeholder')}
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className={`w-12 h-12 border-[3px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ${isDark ? 'border-gray-500 bg-[#16213e]' : 'border-black bg-white'}`}>
                            <span className="relative">
                                🔔<span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brutal-orange rounded-full border border-black"></span>
                            </span>
                        </button>
                        <button className={`w-12 h-12 border-[3px] border-black bg-orange-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none overflow-hidden`}>
                            <span className="text-xl">👩‍🚀</span>
                        </button>
                    </div>
                </header>

                {/* ── Page Content ── */}
                <div className="relative z-10 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppLayout;
