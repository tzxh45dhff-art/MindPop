import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Profile = ({ user }) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const displayName = user?.username || user?.name || "ALEX JOHNSON";

    const cardBg = isDark ? 'bg-[#16213e] border-gray-600' : 'bg-white border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';

    return (
        <div className={`p-8 w-full font-display ${textColor}`}>
            {/* Top header: DASHBOARD */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tight">{t('dashboard')}</h1>
                <div className="flex items-center gap-4 text-right">
                    <div>
                        <div className="font-bold text-sm leading-tight">{displayName}</div>
                        <div className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('premium_scholar')}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-[3px] border-black bg-[#eeb08c] overflow-hidden flex items-center justify-center">
                        <span className="text-2xl text-black">🧑‍🎓</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative pb-20">
                {/* ────── LEFT COLUMN (Main Content) ────── */}
                <div className="lg:col-span-8 space-y-8 flex flex-col">

                    {/* 1. PROFILE INFO HEADER */}
                    <section>
                        <div className="bg-[#66b3fb] p-8 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center sm:items-stretch gap-8 relative">
                            <div className="w-32 h-32 bg-[#eeb08c] border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative shrink-0">
                                <div className="w-12 h-16 bg-white border-[3px] border-black flex flex-col justify-end p-2 relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-5 border-[3px] border-black border-b-0 rounded-t-sm bg-white z-0"></div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[4px] bg-black z-10"></div>
                                    <div className="h-[2px] w-full bg-slate-400 mb-[3px]"></div>
                                    <div className="h-[2px] w-full bg-slate-400 mb-[3px]"></div>
                                    <div className="h-[2px] w-2/3 bg-slate-400"></div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center gap-3 w-full">
                                <h2 className="text-4xl font-black uppercase tracking-tight text-black leading-none">{displayName}</h2>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="bg-black text-white px-3 py-[6px] text-xs font-black tracking-widest uppercase">{t('class_12')}</span>
                                    <span className="bg-white text-black px-3 py-[4px] border-[3px] border-black text-xs font-black tracking-widest uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">{t('science_stream')}</span>
                                </div>
                                <p className="font-bold text-sm mt-1 text-black">{t('profile_subjects')}</p>
                            </div>
                        </div>
                    </section>

                    {/* 2. MIND ARCHITECTURE TREE */}
                    <section className="flex-1 min-h-[450px]">
                        <div className={`border-[4px] ${cardBg} h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5`}>
                            <div className="flex justify-between items-center mb-5 mt-2 px-1">
                                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">{t('mind_arch_tree')}</h3>
                                <div className="flex gap-3">
                                    <div className="bg-[#f6ca56] border-[3px] border-black px-3 py-[4px] font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">BIO: 85%</div>
                                    <div className="bg-[#66b3fb] border-[3px] border-black px-3 py-[4px] font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">PHY: 72%</div>
                                </div>
                            </div>

                            <div className={`flex-1 relative flex items-center justify-center border-[4px] ${isDark ? 'border-gray-600 bg-[#1a1a2e]' : 'border-black bg-[#dce1e3]'} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1 overflow-hidden min-h-[350px]`}>
                                <img src="/tree.png" alt={t('mind_arch_tree')} className="w-full h-full object-cover mix-blend-multiply image-rendering-pixelated" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* ────── RIGHT COLUMN (Sidebar Gadgets) ────── */}
                <div className="lg:col-span-4 space-y-8 flex flex-col">

                    {/* A. CURRENT FOCUS */}
                    <section>
                        <div className="border-[4px] border-black bg-[#aee23f] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative min-h-[180px] flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-[11px] font-black mb-1 uppercase tracking-wider text-black">{t('current_focus')}</h3>
                                    <h4 className="text-lg font-bold text-black leading-tight">{t('organic_chemistry')}</h4>
                                </div>
                                <span className="text-3xl shrink-0">⏱️</span>
                            </div>

                            <div className="flex flex-wrap items-end justify-between mt-6 gap-4">
                                <span className="text-[44px] font-black tracking-tighter leading-none text-black shrink-0">25:00</span>
                                <button className="px-6 py-3 border-[3px] border-black bg-black text-white text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none shrink-0 mb-1">
                                    {t('start_session')}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* B. STUDY STREAK */}
                    <section>
                        <div className="border-[4px] border-black bg-[#df6631] p-6 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[140px] flex flex-col justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl -mt-2 shrink-0">🔥</span>
                                <div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-white drop-shadow-md">15 DAY</h3>
                                    <p className="text-[11px] font-black uppercase tracking-wider text-white">{t('study_streak')}</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="h-4 border-[3px] border-black bg-[#a24322] w-full flex shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="h-full bg-[#fde9e1] border-r-[3px] border-black w-[75%]"></div>
                                </div>
                                <p className="text-[10px] font-bold mt-2 text-white/90">{t('monthly_goal')}</p>
                            </div>
                        </div>
                    </section>

                    {/* C. MOTIVATION LEVEL */}
                    <section className="flex-1">
                        <div className={`border-[4px] ${cardBg} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col`}>
                            <div className="p-6 pb-0">
                                <h3 className="text-sm font-black uppercase tracking-wide">{t('motivation_level')}</h3>
                            </div>

                            <div className="flex-1 flex px-8 py-6 gap-8 relative items-center justify-center">
                                <div className={`w-28 sm:w-36 h-[250px] border-[4px] ${isDark ? 'border-gray-500 bg-[#1a1a2e]' : 'border-black bg-[#e3e8f0]'} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative shrink-0 overflow-hidden`}>
                                    <div className="bg-[#aee23f] w-full absolute bottom-0 border-t-[4px] border-black transition-all duration-1000 ease-out" style={{ height: '82%' }}>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center shrink-0">
                                    <span className="text-7xl sm:text-[100px] font-black tracking-tighter leading-none shrink-0">82</span>
                                    <span className={`text-lg font-black uppercase tracking-widest mt-2 shrink-0 ${isDark ? 'text-gray-400' : 'text-[#717b8e]'}`}>{t('points')}</span>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto flex flex-col gap-4">
                                <p className="text-[13px] font-bold flex items-center gap-2 pl-1">
                                    <span className="text-[#aee23f] text-lg -rotate-12 transform origin-center drop-shadow-sm font-black">⚡</span>
                                    {t('peak_performance')}
                                </p>
                                <button className="w-full py-4 border-[4px] border-black bg-[#f6ca56] text-black text-[13px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none">
                                    {t('boost_score')}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
