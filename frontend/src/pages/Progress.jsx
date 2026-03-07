import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Progress = ({ user }) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const displayName = user?.username || user?.name || "ALEX RIVERA";

    const cardBg = isDark ? 'bg-[#16213e]' : 'bg-white';
    const borderColor = isDark ? 'border-gray-600' : 'border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';
    const subText = isDark ? 'text-gray-400' : 'text-gray-500';
    const pageBg = isDark ? 'bg-[#1a1a2e]' : 'bg-[#F2F0E9]';

    return (
        <div className={`p-8 max-w-6xl mx-auto space-y-8 font-display ${pageBg} min-h-screen ${textColor}`}>
            {/* Top Page Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${cardBg} border-[3px] ${borderColor} flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                        <span className="text-xl">✨</span>
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">MINDPOP</h1>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold uppercase tracking-wider">{t('student_portal')}</p>
                    <p className="text-lg font-black uppercase">{displayName}</p>
                </div>
            </div>

            {/* Top Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Quote Card */}
                <div className="bg-[#ADD8E6] border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
                    <div className="text-2xl mb-4">✨</div>
                    <h2 className="text-2xl font-black uppercase leading-tight text-black">
                        {t('progress_quote')}
                    </h2>
                </div>

                {/* Motivation Card */}
                <div className={`${cardBg} border-[4px] ${borderColor} p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center`}>
                    <h2 className="text-2xl font-black uppercase mb-2">{t('excellent_work')}, {displayName}!</h2>
                    <p className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                        {t('dedication_msg')}
                    </p>
                </div>
            </div>

            {/* Main Progress Bar */}
            <div className={`${cardBg} border-[4px] ${borderColor} p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-2">{t('progress_title')}</h2>
                        <p className={`font-bold uppercase text-sm tracking-widest ${subText}`}>{t('mind_popping')}</p>
                    </div>
                    <div className="text-7xl font-black tracking-tighter">
                        75%
                    </div>
                </div>

                {/* Visual Bar */}
                <div className={`w-full h-8 border-[3px] ${borderColor} bg-white flex mt-6 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                    <div className="h-full bg-brutal-orange border-r-[3px] border-black" style={{ width: '75%' }}></div>
                </div>
                <p className={`font-bold text-xs uppercase tracking-widest mt-4 ${subText}`}>
                    {t('overall_completion')}
                </p>
            </div>

            {/* Two Column Layout: Subjects and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Subject Breakdown */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{t('subject_breakdown')}</h3>

                    {/* Math */}
                    <div className={`${cardBg} border-[4px] ${borderColor} p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-black uppercase">{t('mathematics')}</span>
                            <span className="text-xl font-black">88%</span>
                        </div>
                        <div className={`w-full h-4 border-[3px] ${borderColor} bg-white flex`}>
                            <div className="h-full bg-brutal-yellow border-r-[3px] border-black" style={{ width: '88%' }}></div>
                        </div>
                    </div>

                    {/* Science */}
                    <div className={`${cardBg} border-[4px] ${borderColor} p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-black uppercase">{t('science')}</span>
                            <span className="text-xl font-black">62%</span>
                        </div>
                        <div className={`w-full h-4 border-[3px] ${borderColor} bg-white flex`}>
                            <div className="h-full bg-brutal-orange border-r-[3px] border-black" style={{ width: '62%' }}></div>
                        </div>
                    </div>

                    {/* History */}
                    <div className={`${cardBg} border-[4px] ${borderColor} p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-black uppercase">{t('history')}</span>
                            <span className="text-xl font-black">45%</span>
                        </div>
                        <div className={`w-full h-4 border-[3px] ${borderColor} bg-white flex`}>
                            <div className="h-full bg-[#ADD8E6] border-r-[3px] border-black" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{t('stats')}</h3>

                    {/* Time Spent */}
                    <div className="bg-brutal-yellow border-[4px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center h-28 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-xl mb-1">⏱️</div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-black">{t('time_spent_weekly')}</p>
                        <p className="text-3xl font-black uppercase tracking-tighter text-black">24.5 HRS</p>
                    </div>

                    {/* Questions Solved */}
                    <div className="bg-[#ADD8E6] border-[4px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center h-28 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-xl mb-1">⚡</div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-black">{t('questions_solved')}</p>
                        <p className="text-3xl font-black uppercase tracking-tighter text-black">1,240</p>
                    </div>

                    {/* Quizzes Completed */}
                    <div className="bg-brutal-orange border-[4px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center h-28 transform transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-xl mb-1">🏆</div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-black">{t('quizzes_completed')}</p>
                        <p className="text-3xl font-black uppercase tracking-tighter text-black">42</p>
                    </div>
                </div>
            </div>

            {/* Bottom Banner */}
            <div className="bg-black text-white border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-center">
                    {t('keep_pushing')}
                </h2>
            </div>
        </div>
    );
};

export default Progress;
