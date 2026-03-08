import React from 'react';
import '../styles/global.css';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Dashboard = ({ user, onNavigate }) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();

    const cardBg = isDark ? 'bg-[#16213e] border-gray-600' : 'bg-white border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';

    return (
        <div className={`p-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 ${textColor}`}>

            {/* ────── LEFT COLUMN (Main Content) ────── */}
            <div className="lg:col-span-8 space-y-8 flex flex-col">

                {/* 1. CURRENT FOCUS */}
                <section>
                    <div className="bg-brutal-green p-6 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight mb-1 text-black">{t('current_focus')}</h2>
                            <div className="text-2xl sm:text-3xl font-black uppercase text-black">{t('physics')}</div>
                        </div>

                        <div className="flex items-center gap-4 flex-1 max-w-sm mr-4">
                            <span className="font-bold text-sm leading-tight w-24 text-black">{t('modern_physics')}</span>
                            <div className="flex-1 h-5 border-[3px] border-black bg-white flex shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <div className="h-full bg-brutal-orange w-[85%] border-r-[3px] border-black"></div>
                            </div>
                            <span className="font-bold text-sm text-black">85%</span>
                        </div>
                    </div>
                </section>

                {/* 2. TOPICS FOR YOU */}
                <section>
                    <h3 className="text-base font-bold mb-4 uppercase tracking-wider">{t('topics_for_you')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                        <div className={`border-[4px] ${cardBg} p-5 h-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                            <p className="font-bold leading-tight pt-2 px-1 text-[15px]">{t('quantum_entanglement')}</p>
                            <button className="w-full border-[3px] border-black bg-brutal-orange text-black py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] font-black uppercase tracking-wider hover:bg-orange-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                {t('resume')}
                            </button>
                        </div>

                        <div className={`border-[4px] ${cardBg} p-5 h-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                            <p className="font-bold leading-tight pt-2 px-1 text-[15px]">{t('wave_particle_duality')}</p>
                            <button className="w-full border-[3px] border-black bg-brutal-green text-black py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] font-black uppercase tracking-wider hover:bg-lime-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                {t('start')}
                            </button>
                        </div>

                        <div className={`border-[4px] ${cardBg} p-5 h-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                            <p className="font-bold leading-tight pt-2 px-1 text-[15px]">{t('photoelectric_effect')}</p>
                            <button className="w-full border-[3px] border-black bg-brutal-blue text-black py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] font-black uppercase tracking-wider hover:bg-blue-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                {t('review')}
                            </button>
                        </div>

                    </div>
                </section>

                {/* 3. DOUBT SOLVER */}
                <section className="flex-1 mt-2">
                    <div className={`border-[4px] ${isDark ? 'border-gray-600' : 'border-black'} ${isDark ? 'bg-[#16213e]' : 'bg-white'} h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="bg-black text-white px-5 py-3 font-bold text-sm tracking-wider uppercase flex-shrink-0">
                            {t('doubt_solver')}
                        </div>
                        <div className="p-6 flex flex-col justify-between h-full gap-6">

                            <div className={`border-b-[3px] ${isDark ? 'border-gray-600' : 'border-black'} border-dashed pb-5 relative`}>
                                <p className="font-medium">{t('de_broglie_q')}</p>
                                <span className="text-[10px] uppercase font-bold text-brutal-pink mt-3 inline-block">{t('missed_2hrs')}</span>
                            </div>

                            <div className={`border-b-[3px] ${isDark ? 'border-gray-600' : 'border-black'} border-dashed pb-5 relative`}>
                                <p className="font-medium">{t('uncertainty_q')}</p>
                                <span className="text-[10px] uppercase font-bold text-brutal-pink mt-3 inline-block">{t('missed_yesterday')}</span>
                            </div>

                            <div className="pt-2 mt-auto">
                                <button className="w-full py-4 border-[3px] border-black bg-brutal-yellow text-black text-[13px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none">
                                    {t('review_all_mistakes')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. QUICK TUTOR */}
                <section className="mt-4">
                    <h3 className="text-base font-bold mb-4 uppercase tracking-wider">{t('quick_tutor')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div className="border-[4px] border-black bg-brutal-blue p-8 text-center flex flex-col justify-center items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-4xl mb-1 mt-2">🤖</div>
                            <h4 className="text-lg font-black uppercase text-black">{t('ai_agent')}</h4>
                            <p className="text-xs font-medium mb-4 px-4 w-4/5 leading-snug text-black">{t('ai_agent_desc')}</p>
                            <button
                                onClick={() => onNavigate && onNavigate('ai-agent')}
                                className="border-[3px] border-black bg-white px-4 py-3 w-4/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-brutal-blue text-black">
                                {t('ask_ai')}
                            </button>
                        </div>

                        <div className="border-[4px] border-black bg-brutal-green p-8 text-center flex flex-col justify-center items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-4xl mb-1 mt-2">👨‍🏫</div>
                            <h4 className="text-lg font-black uppercase text-black">{t('live_tutor')}</h4>
                            <p className="text-xs font-medium mb-4 px-4 w-4/5 leading-snug text-black">{t('live_tutor_desc')}</p>
                            <button className="border-[3px] border-black bg-white px-4 py-3 w-4/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-black">
                                {t('get_live_help')}
                            </button>
                        </div>

                    </div>
                </section>

            </div>

            {/* ────── RIGHT COLUMN (Sidebar Gadgets) ────── */}
            <div className="lg:col-span-4 space-y-6 flex flex-col pt-1">

                {/* A. GEN STATION */}
                <section>
                    <div className={`border-[4px] ${cardBg} p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <h3 className="text-sm font-black mb-5 uppercase tracking-wide">{t('gen_station')}</h3>
                        <div className={`h-[2px] w-full ${isDark ? 'bg-gray-500' : 'bg-black'} mb-6`} />

                        <div className="space-y-4">

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className={`w-12 h-12 border-[3px] ${isDark ? 'border-gray-500 bg-[#1a1a2e]' : 'border-black bg-white'} flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all`}>
                                    M
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-pink decoration-4 underline-offset-4 decoration-skip-ink-none">{t('mind_maps')}</span>
                            </div>

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className={`w-12 h-12 border-[3px] ${isDark ? 'border-gray-500 bg-[#1a1a2e]' : 'border-black bg-white'} flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all`}>
                                    Q
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-green decoration-4 underline-offset-4 decoration-skip-ink-none">{t('quizzes')}</span>
                            </div>

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className={`w-12 h-12 border-[3px] ${isDark ? 'border-gray-500 bg-[#1a1a2e]' : 'border-black bg-white'} flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all`}>
                                    F
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-blue decoration-4 underline-offset-4 decoration-skip-ink-none">{t('flashcards')}</span>
                            </div>

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className={`w-12 h-12 border-[3px] ${isDark ? 'border-gray-500 bg-[#1a1a2e]' : 'border-black bg-white'} flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all`}>
                                    E
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-yellow decoration-4 underline-offset-4 decoration-skip-ink-none">{t('explanations')}</span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* B. STUDY TIMER */}
                <section className="pt-2">
                    <div className={`border-[4px] ${cardBg} p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black uppercase tracking-wide">{t('study_timer')}</h3>
                            <span className="text-xl -translate-y-1">🔥</span>
                        </div>

                        <div className="space-y-6">

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-black uppercase">
                                    <span>{t('focus_session')}</span><span>45M / 60M</span>
                                </div>
                                <div className="h-2.5 border-2 border-black bg-white w-full">
                                    <div className="h-full bg-brutal-purple border-r-2 border-black w-3/4"></div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-black uppercase">
                                    <span>{t('daily_goal')}</span><span>4H / 6H</span>
                                </div>
                                <div className="h-2.5 border-2 border-black bg-white w-full">
                                    <div className="h-full bg-brutal-pink border-r-2 border-black w-2/3"></div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-black uppercase">
                                    <span>{t('weekly_streak')}</span><span>5 DAYS</span>
                                </div>
                                <div className="h-2.5 border-2 border-black bg-white w-full">
                                    <div className="h-full bg-brutal-orange border-r-2 border-black w-[71%]"></div>
                                </div>
                            </div>

                            <button
                                onClick={() => onNavigate && onNavigate('focus-session')}
                                className="w-full mt-6 py-4 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-brutal-orange/50">
                                {t('start_new_session')}
                            </button>

                        </div>
                    </div>
                </section>

                {/* C. WEEKLY STREAK CARD */}
                <section className="pt-2">
                    <div className="border-[4px] border-black bg-brutal-orange p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute right-[-10px] top-[10px] text-8xl opacity-[0.15] rotate-12 pointer-events-none">
                            🔥
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-[14px] mb-2 uppercase tracking-wide text-black">{t('weekly_streak_fire')}</h3>
                            <p className="text-[12px] font-medium mb-6 leading-relaxed bg-transparent opacity-80 max-w-[85%] text-black">
                                {t('streak_msg')}<br />{t('keep_going')}
                            </p>

                            <div className="flex gap-[6px] h-4">
                                <div className="flex-1 bg-black"></div>
                                <div className="flex-1 bg-black"></div>
                                <div className="flex-1 bg-black"></div>
                                <div className="flex-1 bg-black"></div>
                                <div className="flex-1 bg-black relative"></div>
                                <div className="flex-1 border-2 border-black bg-white"></div>
                                <div className="flex-1 border-2 border-black bg-white"></div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Dashboard;
