import React, { useState } from 'react';
import { useTheme } from '../i18n/ThemeContext';

const initialCalendarData = [
    { date: null }, { date: null }, { date: null }, { date: null }, { date: null },
    { date: 1, chips: [{ label: 'MATHS', color: 'orange' }, { label: 'ENGLISH', color: 'blue' }] },
    { date: 2, chips: [{ label: 'SCIENCE', color: 'yellow' }] },

    { date: 3, isSun: true, isRest: true, chips: [] },
    { date: 4, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 5, chips: [{ label: 'SCIENCE', color: 'yellow' }, { label: 'HISTORY', color: 'red' }] },
    { date: 6, chips: [{ label: 'LIBRARY', color: 'blue' }], bg: '#D6EEFB', dateColor: '#E16B3D' },
    { date: 7, chips: [{ label: 'HISTORY', color: 'red' }] },
    { date: 8, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 9, chips: [{ label: 'SPORTS', color: 'blue' }] },

    { date: 10, isSun: true, isRest: true, chips: [] },
    { date: 11, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 12, chips: [{ label: 'SCIENCE', color: 'yellow' }] },
    { date: 13, chips: [{ label: 'HISTORY', color: 'red' }] },
    { date: 14, chips: [{ label: 'ENGLISH', color: 'blue' }] },
    { date: 15, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 16, chips: [{ label: 'SCIENCE', color: 'yellow' }] },

    { date: 17, isSun: true, isRest: true, chips: [] },
    { date: 18, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 19, chips: [{ label: 'SCIENCE', color: 'yellow' }] },
    { date: 20, chips: [{ label: 'EXAM DAY', color: 'red' }], dateColor: '#CF3A3A' },
    { date: 21, chips: [{ label: 'ENGLISH', color: 'blue' }] },
    { date: 22, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 23, chips: [{ label: 'SCIENCE', color: 'yellow' }] },

    { date: 24, isSun: true, isRest: true, chips: [] },
    { date: 25, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 26, chips: [{ label: 'SCIENCE', color: 'yellow' }] },
    { date: 27, chips: [{ label: 'HISTORY', color: 'red' }] },
    { date: 28, chips: [{ label: 'ENGLISH', color: 'blue' }] },
    { date: 29, chips: [{ label: 'MATHS', color: 'orange' }] },
    { date: 30, chips: [{ label: 'SCIENCE', color: 'yellow' }] }
];

const chipColors = {
    orange: 'bg-[#E16B3D] border-black text-white',
    yellow: 'bg-[#EBB336] border-black text-white',
    blue: 'bg-[#7AC6ED] border-black text-white',
    red: 'bg-[#CF3A3A] border-black text-white',
};

const Schedule = ({ user }) => {
    const { isDark } = useTheme();
    const [focusGoals, setFocusGoals] = useState([
        { id: 1, text: 'Maths: Calculus', color: '#7AC6ED', completed: false },
        { id: 2, text: 'Science: Physics Lab', color: '#E16B3D', completed: false },
        { id: 3, text: 'History: Modern Era', color: '#EBB336', completed: false },
    ]);

    const [selectedDay, setSelectedDay] = useState(null);

    const toggleGoal = (id) => {
        setFocusGoals(goals => goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const pageBg = isDark ? 'bg-[#1a1a2e]' : 'bg-[#FAF4EA]';
    const cardBg = isDark ? 'bg-[#16213e]' : 'bg-white';
    const borderColor = isDark ? 'border-gray-600' : 'border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';

    return (
        <div className={`min-h-full ${pageBg} font-display p-8 flex flex-col items-center relative animate-fadeIn ${textColor}`}>

            {/* Main Content Layout */}
            <div className="w-full max-w-[1240px] flex flex-col lg:flex-row gap-8 items-start">

                {/* Left Sidebar */}
                <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">

                    {/* MARCH 2026 Block */}
                    <div className="bg-[#E16B3D] border-[4px] border-black p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between min-h-[220px] hover:-translate-y-[2px] hover:-translate-x-[2px] transition-transform">
                        <h2 className="text-5xl font-black text-white leading-[1.05] tracking-tight">MARCH<br />2026</h2>
                        <div className="mt-8 leading-tight">
                            <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-1">Monthly Study Target:</p>
                            <p className="text-white text-lg font-black uppercase tracking-wide">120 Hours</p>
                        </div>
                    </div>

                    {/* WEEKLY FOCUS Block */}
                    <div className={`${cardBg} border-[4px] ${borderColor} p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6">Weekly Focus</h3>
                        <div className="flex flex-col gap-5">
                            {focusGoals.map(goal => (
                                <button
                                    key={goal.id}
                                    onClick={() => toggleGoal(goal.id)}
                                    className="flex items-center gap-4 text-left group hover:opacity-80 transition-opacity"
                                >
                                    <div
                                        className={`w-6 h-6 border-[3px] shrink-0 flex items-center justify-center transition-colors`}
                                        style={{ backgroundColor: goal.completed ? goal.color : 'transparent', borderColor: goal.color }}
                                    >
                                        {goal.completed && <span className="text-black font-black text-[10px] leading-none mb-0.5">✓</span>}
                                    </div>
                                    <span className={`font-bold text-sm tracking-wide transition-all ${goal.completed ? `line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}` : ''}`}>
                                        {goal.text}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PRO TIP Block */}
                    <div className="bg-[#8D46EE] border-[4px] border-black p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:-translate-x-[2px] transition-transform">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-4">Pro Tip</h3>
                        <p className="text-white text-sm font-bold leading-relaxed tracking-wide">
                            "Don't forget to take a 5-min break every 25 mins! Stay hydrated."
                        </p>
                    </div>

                </div>

                {/* Right Calendar Grid */}
                <div className={`flex-1 w-full ${cardBg} border-[4px] ${borderColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                    {/* Days Header */}
                    <div className={`grid grid-cols-7 border-b-[4px] ${borderColor} ${cardBg}`}>
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (
                            <div
                                key={day}
                                className={`py-4 text-center font-black text-xs uppercase tracking-widest ${idx !== 6 ? `border-r-[2px] ${borderColor}` : ''}`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid Cells */}
                    <div className="grid grid-cols-7 grid-rows-5 flex-1">
                        {initialCalendarData.map((cell, index) => {
                            const isLastCol = (index + 1) % 7 === 0;
                            const isLastRow = index >= 28;

                            let cellBg = cardBg;
                            if (cell.bg && !isDark) cellBg = '';
                            else if (cell.isSun || cell.isRest) cellBg = isDark ? 'bg-[#0f3460]' : 'bg-[#F9EFEF]';

                            return (
                                <button
                                    key={index}
                                    onClick={() => cell.date && setSelectedDay(cell)}
                                    disabled={!cell.date}
                                    className={`
                                        ${cellBg} 
                                        min-h-[110px] p-2 flex flex-col gap-1.5 relative text-left
                                        ${!isLastCol ? `border-r-[2px] ${borderColor}` : ''}
                                        ${!isLastRow ? `border-b-[2px] ${borderColor}` : ''}
                                        ${cell.date ? `${isDark ? 'hover:bg-[#1a1a2e]' : 'hover:bg-gray-100'} cursor-pointer ${isDark ? 'active:bg-[#0f3460]' : 'active:bg-gray-200'} transition-colors` : 'cursor-default'}
                                    `}
                                    style={cell.bg && !isDark ? { backgroundColor: cell.bg } : {}}
                                >
                                    {/* Date Number inside cell */}
                                    {cell.date && (
                                        <div
                                            className="font-black text-lg ml-1 mt-1 leading-none"
                                            style={{ color: cell.dateColor || (isDark ? '#e5e7eb' : '#000') }}
                                        >
                                            {cell.date}
                                        </div>
                                    )}

                                    {/* Rest Day Label */}
                                    {cell.isRest && (
                                        <div className={`text-[10px] font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'} ml-1 mt-0`}>
                                            Rest Day
                                        </div>
                                    )}

                                    {/* Event Chips */}
                                    <div className="mt-1 flex flex-col gap-1.5 w-full">
                                        {cell.chips && cell.chips.map((chip, cIdx) => (
                                            <div
                                                key={cIdx}
                                                className={`
                                                    px-2 py-1 text-[9px] font-black uppercase tracking-widest 
                                                    border-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                                    truncate w-full
                                                    ${chipColors[chip.color]}
                                                `}
                                            >
                                                {chip.label}
                                            </div>
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Legend */}
            <div className="w-full max-w-[1240px] mt-10 mb-8 flex flex-wrap justify-center lg:justify-end gap-4 lg:pr-2">
                {[
                    { label: 'MATHEMATICS', color: '#E16B3D' },
                    { label: 'PHYSICAL SCIENCE', color: '#EBB336' },
                    { label: 'WORLD HISTORY', color: '#CF3A3A' },
                    { label: 'ENGLISH LIT', color: '#7AC6ED' }
                ].map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-3 ${cardBg} border-[3px] ${borderColor} px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                        <div className={`w-3.5 h-3.5 border-[2px] ${borderColor}`} style={{ backgroundColor: item.color }}></div>
                        <span className="font-black text-[11px] tracking-widest uppercase mt-0.5">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Interactive Day Modal */}
            {selectedDay && (
                <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-6 animate-fadeIn">
                    <div className={`${cardBg} border-[4px] ${borderColor} shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-md animate-slideUp`}>
                        <div className={`bg-[#EBB336] border-b-[4px] ${borderColor} px-6 py-4 flex justify-between items-center`}>
                            <h2 className="text-xl font-black uppercase tracking-widest text-black">March {selectedDay.date}, 2026</h2>
                            <button
                                onClick={() => setSelectedDay(null)}
                                className="text-2xl font-black hover:scale-110 transition-transform active:scale-90 text-black"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            {selectedDay.isRest ? (
                                <div className="text-center py-6">
                                    <div className="text-5xl mb-4">🌴</div>
                                    <h3 className="text-xl font-black uppercase tracking-widest mb-2">Rest Day</h3>
                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-bold`}>Take it easy and recharge!</p>
                                </div>
                            ) : selectedDay.chips?.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    <h3 className={`text-sm font-black ${isDark ? 'text-gray-400' : 'text-gray-400'} uppercase tracking-widest mb-2`}>Scheduled Classes</h3>
                                    {selectedDay.chips.map((chip, idx) => (
                                        <div key={idx} className={`flex items-center gap-4 ${chipColors[chip.color]} p-4 border-[3px]`}>
                                            <span className="text-2xl">📚</span>
                                            <div>
                                                <div className="font-black text-xs uppercase tracking-widest opacity-80">Subject</div>
                                                <div className="font-bold text-lg">{chip.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="text-5xl mb-4">📓</div>
                                    <h3 className="text-xl font-black uppercase tracking-widest mb-2">Free Schedule</h3>
                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-bold mb-6`}>No classes scheduled for today.</p>
                                    <button className={`w-full ${isDark ? 'bg-gray-100 text-black' : 'bg-black text-white'} font-black py-3 uppercase tracking-widest hover:opacity-90 transition-colors`}>
                                        + Add Event
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Schedule;
