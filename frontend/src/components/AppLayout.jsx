import React from 'react';
import '../styles/global.css';

const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'subjects', label: 'Subjects', icon: '📚' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'learnmap', label: 'Learn Map', icon: '🗺️' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'progress', label: 'Progress', icon: '📈' },
];

const AppLayout = ({ children, currentPage, onNavigate }) => {
    return (
        <div className="min-h-screen flex font-display bg-white text-black overflow-hidden">
            {/* ─── SIDEBAR ─── */}
            <aside className="w-[280px] border-r-[4px] border-black flex flex-col h-screen shrink-0 bg-white sticky top-0">
                {/* Logo Area */}
                <div className="p-6 border-b-[4px] border-black flex items-center gap-4">
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
                                    ? 'bg-brutal-orange border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none'
                                    : 'border-[3px] border-transparent hover:border-black hover:bg-gray-100'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span> {item.label}
                        </button>
                    ))}
                </nav>

                {/* Bottom Links */}
                <div className="p-6 border-t-[4px] border-black flex flex-col gap-3 bg-slate-50">
                    <a className="flex items-center gap-4 font-bold hover:underline" href="#">
                        <span className="text-lg bg-gray-200 rounded-full p-1">⚙️</span> Settings
                    </a>
                    <a className="flex items-center gap-4 font-bold hover:underline" href="#">
                        <span className="text-lg bg-gray-200 rounded-full p-1">👤</span> Profile
                    </a>
                </div>
            </aside>

            {/* ─── MAIN CONTENT ─── */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-gray-100 relative">
                <div className="absolute inset-0 bg-white opacity-40 mix-blend-overlay pointer-events-none"></div>

                {/* ── Header ── */}
                <header className="px-8 py-5 flex justify-between items-center border-b-[4px] border-black bg-white sticky top-0 z-20">
                    <div className="w-[60%] lg:w-[45%]">
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-slate-400 font-bold text-xl">🔍</span>
                            <input
                                className="w-full border-[4px] border-black py-3 pl-12 pr-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all uppercase placeholder-slate-500 text-sm tracking-wide"
                                placeholder="SEARCH TOPICS..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-12 h-12 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
                            <span className="relative">
                                🔔<span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brutal-orange rounded-full border border-black"></span>
                            </span>
                        </button>
                        <button className="w-12 h-12 border-[3px] border-black bg-orange-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none overflow-hidden">
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
