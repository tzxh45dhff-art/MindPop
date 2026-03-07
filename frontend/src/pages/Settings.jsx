import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';
import { LANGUAGES } from '../i18n/translations';

const Settings = ({ user, onLogout }) => {
    const { t, language, setLanguage } = useLanguage();
    const { isDark, toggleTheme } = useTheme();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    const cardBg = isDark ? 'bg-[#16213e] border-gray-600' : 'bg-white border-black';
    const hoverBg = isDark ? 'hover:bg-[#1a1a2e]' : 'hover:bg-gray-100';
    const textColor = isDark ? 'text-gray-100' : 'text-black';
    const borderColor = isDark ? 'border-gray-600' : 'border-black';

    return (
        <div className={`p-8 w-full font-display max-w-4xl mx-auto pb-20 ${textColor}`}>
            {/* Header Box */}
            <div className="bg-[#df6631] text-white border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10">
                <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{t('settings_title')}</h1>
                <p className="font-bold text-sm">{t('settings_subtitle')}</p>
            </div>

            <div className="space-y-8">
                {/* ACCOUNT SETTINGS */}
                <section>
                    <div className="inline-block bg-[#f6ca56] border-[4px] border-black px-4 py-2 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-lg font-black uppercase tracking-wider text-black">{t('account_settings')}</h2>
                    </div>
                    <div className={`${cardBg} border-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                        <button className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor} ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span> {t('change_name')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                        <button className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor} ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span> {t('change_email')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                        <button className={`flex items-center justify-between p-5 ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span> {t('change_password')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                    </div>
                </section>

                {/* EDUCATIONAL PROFILE */}
                <section>
                    <div className="inline-block bg-[#66b3fb] border-[4px] border-black px-4 py-2 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-lg font-black uppercase tracking-wider text-black drop-shadow-md">{t('educational_profile')}</h2>
                    </div>
                    <div className={`${cardBg} border-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                        <button className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor} ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></span> {t('change_grade')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                        <button className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor} ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></span> {t('update_subjects')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                        <button className={`flex items-center justify-between p-5 ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg></span> {t('select_learning_level')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </button>
                    </div>
                </section>

                {/* PREFERENCES */}
                <section>
                    <div className="inline-block bg-[#df6631] border-[4px] border-black px-4 py-2 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-lg font-black uppercase tracking-wider text-black drop-shadow-md">{t('preferences')}</h2>
                    </div>
                    <div className={`${cardBg} border-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                        <div className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor}`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></span> {t('notification_settings')}
                            </div>
                            <button
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                className={`w-16 h-8 border-[3px] ${borderColor} bg-white relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none transition-all focus:outline-none p-0 overflow-hidden`}
                            >
                                <div className={`absolute inset-0 transition-colors ${notificationsEnabled ? 'bg-black' : 'bg-white'}`}></div>
                                <div className={`absolute top-0 bottom-0 w-7 border-[3px] border-black bg-white transition-all duration-200 ${notificationsEnabled ? 'right-0' : 'left-0'}`}></div>
                            </button>
                        </div>
                        <div className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor}`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span> {t('dark_mode')}
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`w-16 h-8 border-[3px] ${borderColor} bg-white relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none transition-all focus:outline-none p-0 overflow-hidden`}
                            >
                                <div className={`absolute inset-0 transition-colors ${isDark ? 'bg-[#df6631]' : 'bg-white'}`}></div>
                                <div className={`absolute top-0 bottom-0 w-7 border-[3px] border-black bg-white transition-all duration-200 ${isDark ? 'right-0' : 'left-0'}`}></div>
                            </button>
                        </div>

                        {/* LANGUAGE SELECTION — Interactive Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                className={`flex items-center justify-between p-5 ${hoverBg} transition-colors text-left w-full focus:outline-none`}
                            >
                                <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                    <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></span> {t('language_selection')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-md font-bold text-[#df6631]">{currentLang.flag} {currentLang.label}</span>
                                    <span className={`text-xl font-black transition-transform duration-200 ${langDropdownOpen ? 'rotate-90' : ''}`}>›</span>
                                </div>
                            </button>

                            {/* Dropdown */}
                            {langDropdownOpen && (
                                <div className={`border-t-[3px] ${borderColor} ${isDark ? 'bg-[#0f3460]' : 'bg-[#faf8f5]'}`}>
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-8 py-4 text-left font-bold text-base transition-all ${isDark ? 'hover:bg-[#1a1a2e]' : 'hover:bg-[#f6ca56]/30'} ${language === lang.code
                                                ? `${isDark ? 'bg-[#1a1a2e]' : 'bg-[#f6ca56]/50'} border-l-[6px] border-[#df6631]`
                                                : 'border-l-[6px] border-transparent'
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-2xl">{lang.flag}</span>
                                                <span>{lang.label}</span>
                                            </span>
                                            {language === lang.code && (
                                                <span className="text-[#df6631] font-black text-xl">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* SUPPORT */}
                <section>
                    <div className="inline-block bg-[#0f172a] border-[4px] border-black px-4 py-2 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-lg font-black uppercase tracking-wider text-white">{t('support')}</h2>
                    </div>
                    <div className={`${cardBg} border-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                        <a href="#" className={`flex items-center justify-between p-5 border-b-[3px] ${borderColor} ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span> {t('help_center')}
                            </div>
                            <span className="text-xl font-black group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">↗</span>
                        </a>
                        <a href="#" className={`flex items-center justify-between p-5 ${hoverBg} transition-colors text-left group focus:outline-none`}>
                            <div className={`flex items-center gap-4 font-bold text-lg ${textColor}`}>
                                <span className="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span> {t('privacy_policy')}
                            </div>
                            <span className="text-xl font-black group-hover:translate-x-1 transition-transform">›</span>
                        </a>
                    </div>
                </section>

                {/* LOG OUT BUTTON */}
                <div className="pt-2">
                    <button
                        onClick={onLogout}
                        className="w-full bg-[#0f172a] text-white py-4 border-[4px] border-black text-xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all focus:outline-none"
                    >
                        {t('log_out')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
