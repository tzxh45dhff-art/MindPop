import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const Leaderboard = ({ user }) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const displayName = user?.username || user?.name || "Alex Rivera (You)";

    const cardBg = isDark ? 'bg-[#16213e]' : 'bg-white';
    const borderColor = isDark ? 'border-gray-600' : 'border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';
    const subText = isDark ? 'text-gray-400' : 'text-gray-500';

    const topLearners = [
        { rank: 1, name: 'khushi Bagga', quizzes: 56, score: '99.4%' },
        { rank: 2, name: 'Kamal Kaur', quizzes: 52, score: '97.2%' },
        { rank: 3, name: 'Harshika Dhir', quizzes: 49, score: '96.5%' },
        { rank: 4, name: 'daksh', quizzes: 45, score: '94.8%' },
    ];

    const currentUserStats = {
        rank: 12,
        name: displayName,
        quizzes: 42,
        score: '98.0%',
        level: 'PRO'
    };

    return (
        <div className={`p-8 w-full font-display max-w-5xl mx-auto pb-20 ${textColor}`}>
            {/* Header */}
            <h1 className={`text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 drop-shadow-sm ${isDark ? 'text-gray-100' : 'text-[#1e2336]'}`}>{t('leaderboard_title')}</h1>

            <div className="space-y-12">
                {/* YOUR PROGRESS SECTION */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[3px] w-8 bg-[#df6631]"></div>
                        <h2 className="text-xl font-bold uppercase tracking-widest">{t('your_progress')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`${cardBg} border-[4px] ${borderColor} p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center min-h-[140px]`}>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${subText}`}>{t('current_rank')}</p>
                            <p className="text-5xl font-black tracking-tighter">#{currentUserStats.rank}</p>
                        </div>

                        <div className="bg-[#e08e36] border-[4px] border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center min-h-[140px] transform md:-translate-y-2">
                            <p className="text-xs font-black text-black uppercase tracking-widest mb-1">{t('your_efficiency')}</p>
                            <p className="text-5xl font-black tracking-tighter text-black">{currentUserStats.score}</p>
                        </div>

                        <div className={`${cardBg} border-[4px] ${borderColor} p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center min-h-[140px]`}>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${subText}`}>{t('quizzes_completed')}</p>
                            <p className="text-5xl font-black tracking-tighter">{currentUserStats.quizzes}</p>
                        </div>
                    </div>
                </section>

                {/* TOP LEARNERS SECTION */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[3px] w-8 bg-[#df6631]"></div>
                        <h2 className="text-xl font-bold uppercase tracking-widest">{t('top_learners')}</h2>
                    </div>

                    <div className={`${cardBg} border-[4px] ${borderColor} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden`}>
                        {/* Table Header */}
                        <div className={`grid grid-cols-12 border-b-[4px] ${borderColor} ${cardBg}`}>
                            <div className={`col-span-2 p-5 border-r-[4px] ${borderColor} font-black uppercase text-xs tracking-widest flex items-center`}>{t('rank')}</div>
                            <div className={`col-span-4 p-5 border-r-[4px] ${borderColor} font-black uppercase text-xs tracking-widest flex items-center`}>{t('learner')}</div>
                            <div className={`col-span-3 p-5 border-r-[4px] ${borderColor} font-black uppercase text-xs tracking-widest flex items-center justify-center text-center`}>{t('quizzes_attempted')}</div>
                            <div className="col-span-3 p-5 font-black uppercase text-xs tracking-widest flex items-center justify-end text-right">{t('efficiency_score')}</div>
                        </div>

                        {/* Top 4 Rows */}
                        {topLearners.map((learner) => (
                            <div key={learner.rank} className={`grid grid-cols-12 border-b-[4px] ${borderColor} ${cardBg} ${isDark ? 'hover:bg-[#1a1a2e]' : 'hover:bg-gray-50'} transition-colors`}>
                                <div className={`col-span-2 p-5 border-r-[4px] ${borderColor} font-black text-xl flex items-center`}>{learner.rank}</div>
                                <div className={`col-span-4 p-5 border-r-[4px] ${borderColor} flex items-center gap-4`}>
                                    <div className="w-10 h-10 border-[3px] border-black bg-slate-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0">
                                        <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-xs font-bold">
                                            {learner.name.charAt(0)}
                                        </div>
                                    </div>
                                    <span className={`font-extrabold ${isDark ? 'text-gray-100' : 'text-[#1e2336]'}`}>{learner.name}</span>
                                </div>
                                <div className={`col-span-3 p-5 border-r-[4px] ${borderColor} font-bold flex items-center justify-center text-center`}>
                                    {learner.quizzes} {t('quizzes_word')}
                                </div>
                                <div className="col-span-3 p-5 font-black flex items-center justify-end text-right text-[#e08e36]">
                                    {learner.score}
                                </div>
                            </div>
                        ))}

                        {/* Current User Highlights Row */}
                        <div className={`grid grid-cols-12 border-[4px] border-[#df6631] relative -m-[4px] z-10 shadow-[4px_4px_0px_0px_rgba(223,102,49,0.3)] transition-colors ${isDark ? 'bg-[#3d2510] hover:bg-[#4a2d14]' : 'bg-[#ffeacc] hover:bg-[#ffe1b6]'}`}>
                            <div className={`col-span-2 p-5 border-r-[4px] border-[#df6631] font-black text-xl flex items-center ${isDark ? 'text-gray-100' : 'text-black'}`}>{currentUserStats.rank}</div>
                            <div className="col-span-4 p-5 border-r-[4px] border-[#df6631] flex flex-col justify-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 border-[3px] border-black bg-slate-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0">
                                        <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                                            You
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`font-extrabold block leading-tight ${isDark ? 'text-gray-100' : 'text-[#1e2336]'}`}>{currentUserStats.name}</span>
                                        <span className="text-[10px] font-black text-[#df6631] uppercase tracking-widest mt-1 inline-block">{t('current_level')}: {currentUserStats.level}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-span-3 p-5 border-r-[4px] border-[#df6631] font-bold flex items-center justify-center text-center ${isDark ? 'text-gray-100' : 'text-[#1e2336]'}`}>
                                {currentUserStats.quizzes} {t('quizzes_word')}
                            </div>
                            <div className="col-span-3 p-5 font-black flex items-center justify-end text-right text-[#df6631]">
                                {currentUserStats.score}
                            </div>
                        </div>
                    </div>
                </section>

                {/* VIEW MORE RANKINGS BUTTON */}
                <div className="flex justify-center pt-8">
                    <button className="bg-[#e08e36] text-black px-8 py-4 border-[4px] border-black text-sm font-black uppercase tracking-widest shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[5px] active:translate-x-[5px] active:shadow-none transition-all focus:outline-none">
                        {t('view_more_rankings')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
