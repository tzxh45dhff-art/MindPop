import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/global.css';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../i18n/ThemeContext';

const DURATION_PRESETS = [25, 45, 60];
const BREAK_DURATION = 5;
const LONG_BREAK_DURATION = 15;
const SESSIONS_BEFORE_LONG_BREAK = 4;

const SUBJECTS = [
    { id: 'physics', emoji: '⚛️', labelKey: 'physics' },
    { id: 'mathematics', emoji: '📐', labelKey: 'mathematics' },
    { id: 'science', emoji: '🔬', labelKey: 'science' },
    { id: 'history', emoji: '📜', labelKey: 'history' },
];

const FocusSession = ({ user, onNavigate }) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();

    // Timer state
    const [durationMinutes, setDurationMinutes] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [timerState, setTimerState] = useState('idle'); // idle | running | paused | completed
    const [isBreak, setIsBreak] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);

    const intervalRef = useRef(null);

    const totalSeconds = isBreak
        ? (sessionsCompleted > 0 && sessionsCompleted % SESSIONS_BEFORE_LONG_BREAK === 0 ? LONG_BREAK_DURATION : BREAK_DURATION) * 60
        : durationMinutes * 60;

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Timer tick
    useEffect(() => {
        if (timerState === 'running') {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        handleTimerComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [timerState]);

    const handleTimerComplete = useCallback(() => {
        setTimerState('completed');
        if (!isBreak) {
            setSessionsCompleted((prev) => prev + 1);
        }
    }, [isBreak]);

    const startTimer = () => {
        setTimerState('running');
    };

    const pauseTimer = () => {
        setTimerState('paused');
    };

    const resumeTimer = () => {
        setTimerState('running');
    };

    const resetTimer = () => {
        setTimerState('idle');
        setIsBreak(false);
        setTimeLeft(durationMinutes * 60);
    };

    const startBreak = () => {
        setIsBreak(true);
        const breakDur = (sessionsCompleted % SESSIONS_BEFORE_LONG_BREAK === 0 && sessionsCompleted > 0)
            ? LONG_BREAK_DURATION
            : BREAK_DURATION;
        setTimeLeft(breakDur * 60);
        setTimerState('running');
    };

    const skipBreak = () => {
        setIsBreak(false);
        setTimeLeft(durationMinutes * 60);
        setTimerState('idle');
    };

    const startNextFocus = () => {
        setIsBreak(false);
        setTimeLeft(durationMinutes * 60);
        setTimerState('idle');
    };

    const changeDuration = (mins) => {
        if (timerState !== 'idle') return;
        setDurationMinutes(mins);
        setTimeLeft(mins * 60);
    };

    // Format time
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // SVG ring progress
    const radius = 130;
    const circumference = 2 * Math.PI * radius;
    const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 1;
    const strokeDashoffset = circumference * (1 - progress);

    const cardBg = isDark ? 'bg-[#16213e] border-gray-600' : 'bg-white border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';

    // Ring color based on state
    const getRingColor = () => {
        if (isBreak) return '#A3E635'; // brutal-green
        if (timerState === 'completed') return '#FB923C'; // brutal-orange
        return '#A855F7'; // brutal-purple
    };

    // Background accent
    const getBgAccent = () => {
        if (isBreak) return 'bg-brutal-green';
        if (timerState === 'completed') return 'bg-brutal-orange';
        return 'bg-brutal-purple';
    };

    return (
        <div className={`p-8 w-full pb-20 ${textColor}`}>

            {/* ── HEADER ── */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate && onNavigate('home')}
                        className={`w-12 h-12 border-[3px] ${isDark ? 'border-gray-500 bg-[#16213e]' : 'border-black bg-white'} flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all`}
                    >
                        ←
                    </button>
                    <h1 className="text-2xl font-black uppercase tracking-tight">{t('focus_session_title')}</h1>
                </div>
                <button
                    onClick={() => onNavigate && onNavigate('home')}
                    className="border-[3px] border-black bg-brutal-yellow px-5 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-yellow-300 text-black"
                >
                    {t('back_to_dashboard')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ── LEFT: Timer ── */}
                <div className="lg:col-span-8 flex flex-col items-center gap-8">

                    {/* Status Badge */}
                    <div className={`${getBgAccent()} border-[3px] border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black`}>
                        <span className="font-black text-sm uppercase tracking-widest">
                            {isBreak
                                ? (sessionsCompleted % SESSIONS_BEFORE_LONG_BREAK === 0 && sessionsCompleted > 0 ? t('long_break') : t('break_time'))
                                : t('focus_time')
                            }
                        </span>
                    </div>

                    {/* Circular Timer */}
                    <div className={`relative border-[4px] ${cardBg} p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center`}>
                        <svg width="300" height="300" className="transform -rotate-90">
                            {/* Background circle */}
                            <circle
                                cx="150"
                                cy="150"
                                r={radius}
                                fill="none"
                                stroke={isDark ? '#2a2a4a' : '#e5e7eb'}
                                strokeWidth="12"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="150"
                                cy="150"
                                r={radius}
                                fill="none"
                                stroke={getRingColor()}
                                strokeWidth="12"
                                strokeLinecap="square"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                style={{ transition: timerState === 'running' ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease' }}
                            />
                        </svg>

                        {/* Timer display (centered over SVG) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-7xl font-black tabular-nums tracking-tight ${timerState === 'completed' ? 'timer-pulse' : ''}`}>
                                {displayTime}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest mt-2 opacity-60">
                                {isBreak ? t('break_time') : t('focus_time')}
                            </span>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {timerState === 'idle' && (
                            <button
                                onClick={startTimer}
                                className="border-[3px] border-black bg-brutal-green px-10 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-lime-300 text-black"
                            >
                                {t('session_start')}
                            </button>
                        )}

                        {timerState === 'running' && (
                            <button
                                onClick={pauseTimer}
                                className="border-[3px] border-black bg-brutal-orange px-10 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-orange-300 text-black"
                            >
                                {t('session_pause')}
                            </button>
                        )}

                        {timerState === 'paused' && (
                            <>
                                <button
                                    onClick={resumeTimer}
                                    className="border-[3px] border-black bg-brutal-green px-10 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-lime-300 text-black"
                                >
                                    {t('session_resume')}
                                </button>
                                <button
                                    onClick={resetTimer}
                                    className={`border-[3px] ${isDark ? 'border-gray-500 bg-[#16213e]' : 'border-black bg-white'} px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all`}
                                >
                                    {t('session_reset')}
                                </button>
                            </>
                        )}

                        {timerState === 'completed' && !isBreak && (
                            <>
                                <button
                                    onClick={startBreak}
                                    className="border-[3px] border-black bg-brutal-blue px-10 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-blue-300 text-black"
                                >
                                    {t('break_time')}
                                </button>
                                <button
                                    onClick={skipBreak}
                                    className={`border-[3px] ${isDark ? 'border-gray-500 bg-[#16213e]' : 'border-black bg-white'} px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all`}
                                >
                                    {t('session_skip')}
                                </button>
                            </>
                        )}

                        {timerState === 'completed' && isBreak && (
                            <button
                                onClick={startNextFocus}
                                className="border-[3px] border-black bg-brutal-purple px-10 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all hover:bg-purple-400 text-white"
                            >
                                {t('session_start')} {t('focus_time')}
                            </button>
                        )}
                    </div>

                    {/* Motivational Message */}
                    <div className={`border-[4px] ${cardBg} w-full max-w-lg p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center`}>
                        <p className="font-black text-sm uppercase tracking-wider">
                            {timerState === 'completed'
                                ? (isBreak ? t('stay_focused') : t('great_job'))
                                : t('stay_focused')
                            }
                        </p>
                    </div>

                </div>

                {/* ── RIGHT: Sidebar ── */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Subject Selector */}
                    <div className={`border-[4px] ${cardBg} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="bg-black text-white px-5 py-3 font-bold text-sm tracking-wider uppercase flex-shrink-0">
                            {t('select_subject')}
                        </div>
                        <div className="p-5 space-y-3">
                            {SUBJECTS.map((subj) => (
                                <button
                                    key={subj.id}
                                    onClick={() => timerState === 'idle' && setSelectedSubject(subj)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 border-[3px] font-bold text-sm uppercase transition-all ${selectedSubject.id === subj.id
                                            ? 'border-black bg-brutal-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black'
                                            : `${isDark ? 'border-gray-600 bg-[#1a1a2e] hover:border-gray-400' : 'border-black bg-white hover:bg-gray-100'}`
                                        } ${timerState !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px] active:translate-x-[2px] active:shadow-none'}`}
                                >
                                    <span className="text-xl">{subj.emoji}</span>
                                    {t(subj.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration Selector */}
                    <div className={`border-[4px] ${cardBg} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <div className="bg-black text-white px-5 py-3 font-bold text-sm tracking-wider uppercase flex-shrink-0">
                            {t('select_duration')}
                        </div>
                        <div className="p-5 flex gap-3">
                            {DURATION_PRESETS.map((mins) => (
                                <button
                                    key={mins}
                                    onClick={() => changeDuration(mins)}
                                    className={`flex-1 py-4 border-[3px] font-black text-lg transition-all ${durationMinutes === mins
                                            ? 'border-black bg-brutal-purple shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white'
                                            : `${isDark ? 'border-gray-600 bg-[#1a1a2e] hover:border-gray-400' : 'border-black bg-white hover:bg-gray-100'}`
                                        } ${timerState !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px] active:translate-x-[2px] active:shadow-none'}`}
                                >
                                    {mins}
                                    <span className="text-[10px] block font-bold uppercase tracking-wider mt-0.5">
                                        {t('minutes_abbr')}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sessions Progress */}
                    <div className={`border-[4px] ${cardBg} p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <h3 className="text-sm font-black uppercase tracking-wide mb-4">{t('sessions_completed')}</h3>
                        <div className="flex items-center gap-3 mb-4">
                            {[...Array(SESSIONS_BEFORE_LONG_BREAK)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 h-5 border-[3px] border-black ${i < sessionsCompleted % SESSIONS_BEFORE_LONG_BREAK || (sessionsCompleted > 0 && sessionsCompleted % SESSIONS_BEFORE_LONG_BREAK === 0)
                                            ? 'bg-brutal-green'
                                            : isDark ? 'bg-[#1a1a2e]' : 'bg-white'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-black text-3xl">{sessionsCompleted}</span>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                                / {SESSIONS_BEFORE_LONG_BREAK} {t('focus_session')}
                            </span>
                        </div>
                    </div>

                    {/* Current Subject Card */}
                    <div className="border-[4px] border-black bg-brutal-pink p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute right-[-10px] top-[10px] text-8xl opacity-[0.15] rotate-12 pointer-events-none">
                            {selectedSubject.emoji}
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-[14px] mb-2 uppercase tracking-wide text-black">
                                {t('current_focus')}
                            </h3>
                            <p className="text-2xl font-black uppercase text-black">
                                {t(selectedSubject.labelKey)}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FocusSession;
