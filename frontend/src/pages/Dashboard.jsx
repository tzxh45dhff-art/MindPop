import React from 'react';
import '../styles/global.css';

const Dashboard = ({ user }) => {
    return (
        <div className="p-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">

            {/* ────── LEFT COLUMN (Main Content) ────── */}
            <div className="lg:col-span-8 space-y-8 flex flex-col">

                {/* 1. CURRENT FOCUS */}
                <section>
                    <div className="bg-brutal-green p-6 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight mb-1">CURRENT FOCUS:</h2>
                            <div className="text-2xl sm:text-3xl font-black uppercase">PHYSICS</div>
                        </div>

                        <div className="flex items-center gap-4 flex-1 max-w-sm mr-4">
                            <span className="font-bold text-sm leading-tight w-24">MODERN<br />PHYSICS</span>
                            <div className="flex-1 h-5 border-[3px] border-black bg-white flex shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <div className="h-full bg-brutal-orange w-[85%] border-r-[3px] border-black"></div>
                            </div>
                            <span className="font-bold text-sm">85%</span>
                        </div>
                    </div>
                </section>

                {/* 2. TOPICS FOR YOU */}
                <section>
                    <h3 className="text-base font-bold mb-4 uppercase tracking-wider">TOPICS FOR YOU</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                        <div className="border-[4px] border-black bg-white p-5 h-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-bold leading-tight pt-2 px-1 text-[15px]">Quantum<br />Entanglement</p>
                            <button className="w-full border-[3px] border-black bg-brutal-orange text-black py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] font-black uppercase tracking-wider hover:bg-orange-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                RESUME
                            </button>
                        </div>

                        <div className="border-[4px] border-black bg-white p-5 h-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-bold leading-tight pt-2 px-1 text-[15px]">Wave-Particle<br />Duality</p>
                            <button className="w-full border-[3px] border-black bg-brutal-green text-black py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] font-black uppercase tracking-wider hover:bg-lime-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                START
                            </button>
                        </div>

                        <div className="border-[4px] border-black bg-white p-5 h-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-bold leading-tight pt-2 px-1 text-[15px]">Photoelectric<br />Effect</p>
                            <button className="w-full border-[3px] border-black bg-brutal-blue text-black py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] font-black uppercase tracking-wider hover:bg-blue-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                REVIEW
                            </button>
                        </div>

                    </div>
                </section>

                {/* 3. DOUBT SOLVER */}
                <section className="flex-1 mt-2">
                    <div className="border-[4px] border-black bg-white h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="bg-black text-white px-5 py-3 font-bold text-sm tracking-wider uppercase flex-shrink-0">
                            DOUBT SOLVER: RECENTLY WRONG QUESTIONS
                        </div>
                        <div className="p-6 flex flex-col justify-between h-full gap-6">

                            <div className="border-b-[3px] border-black border-dashed pb-5 relative">
                                <p className="font-medium text-black">"Calculate the de Broglie wavelength of an electron..."</p>
                                <span className="text-[10px] uppercase font-bold text-brutal-pink mt-3 inline-block">MISSED 2 HOURS AGO</span>
                            </div>

                            <div className="border-b-[3px] border-black border-dashed pb-5 relative">
                                <p className="font-medium text-black">"Explain the uncertainty principle in your own words..."</p>
                                <span className="text-[10px] uppercase font-bold text-brutal-pink mt-3 inline-block">MISSED YESTERDAY</span>
                            </div>

                            <div className="pt-2 mt-auto">
                                <button className="w-full py-4 border-[3px] border-black bg-brutal-yellow text-black text-[13px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none">
                                    REVIEW ALL MISTAKES
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. QUICK TUTOR */}
                <section className="mt-4">
                    <h3 className="text-base font-bold mb-4 uppercase tracking-wider">QUICK TUTOR</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div className="border-[4px] border-black bg-brutal-blue p-8 text-center flex flex-col justify-center items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-4xl mb-1 mt-2">🤖</div>
                            <h4 className="text-lg font-black uppercase">AI AGENT</h4>
                            <p className="text-xs font-medium mb-4 px-4 w-4/5 leading-snug">Instant answers to any subject query</p>
                            <button className="border-[3px] border-black bg-white px-4 py-3 w-4/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                ASK AI
                            </button>
                        </div>

                        <div className="border-[4px] border-black bg-brutal-green p-8 text-center flex flex-col justify-center items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-4xl mb-1 mt-2">👨‍🏫</div>
                            <h4 className="text-lg font-black uppercase">LIVE TUTOR</h4>
                            <p className="text-xs font-medium mb-4 px-4 w-4/5 leading-snug">Connect with a real expert now</p>
                            <button className="border-[3px] border-black bg-white px-4 py-3 w-4/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-widest active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
                                GET LIVE HELP
                            </button>
                        </div>

                    </div>
                </section>

            </div>

            {/* ────── RIGHT COLUMN (Sidebar Gadgets) ────── */}
            <div className="lg:col-span-4 space-y-6 flex flex-col pt-1">

                {/* A. GEN STATION */}
                <section>
                    <div className="border-[4px] border-black bg-white p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-sm font-black mb-5 uppercase tracking-wide">GEN STATION</h3>
                        <div className="h-[2px] w-full bg-black mb-6" />

                        <div className="space-y-4">

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className="w-12 h-12 border-[3px] border-black flex items-center justify-center font-bold text-lg bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all">
                                    M
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-pink decoration-4 underline-offset-4 decoration-skip-ink-none">MIND MAPS</span>
                            </div>

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className="w-12 h-12 border-[3px] border-black flex items-center justify-center font-bold text-lg bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all">
                                    Q
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-green decoration-4 underline-offset-4 decoration-skip-ink-none">QUIZZES</span>
                            </div>

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className="w-12 h-12 border-[3px] border-black flex items-center justify-center font-bold text-lg bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all">
                                    F
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-blue decoration-4 underline-offset-4 decoration-skip-ink-none">FLASHCARDS</span>
                            </div>

                            <div className="flex items-center gap-5 cursor-pointer group">
                                <div className="w-12 h-12 border-[3px] border-black flex items-center justify-center font-bold text-lg bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-y-[2px] group-active:translate-x-[2px] group-active:shadow-none transition-all">
                                    E
                                </div>
                                <span className="font-bold text-[13px] uppercase underline decoration-brutal-yellow decoration-4 underline-offset-4 decoration-skip-ink-none">EXPLANATIONS</span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* B. STUDY TIMER */}
                <section className="pt-2">
                    <div className="border-[4px] border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black uppercase tracking-wide">STUDY TIMER</h3>
                            <span className="text-xl -translate-y-1">🔥</span>
                        </div>

                        <div className="space-y-6">

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-black uppercase">
                                    <span>Focus Session</span><span>45M / 60M</span>
                                </div>
                                <div className="h-2.5 border-2 border-black bg-white w-full">
                                    <div className="h-full bg-brutal-purple border-r-2 border-black w-3/4"></div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-black uppercase">
                                    <span>Daily Goal</span><span>4H / 6H</span>
                                </div>
                                <div className="h-2.5 border-2 border-black bg-white w-full">
                                    <div className="h-full bg-brutal-pink border-r-2 border-black w-2/3"></div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-black uppercase">
                                    <span>Weekly Streak</span><span>5 DAYS</span>
                                </div>
                                <div className="h-2.5 border-2 border-black bg-white w-full">
                                    <div className="h-full bg-brutal-orange border-r-2 border-black w-[71%]"></div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-4 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-brutal-orange/50">
                                START NEW SESSION
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
                            <h3 className="font-bold text-[14px] mb-2 uppercase tracking-wide">WEEKLY STREAK ON FIRE!</h3>
                            <p className="text-[12px] font-medium mb-6 leading-relaxed bg-transparent opacity-80 max-w-[85%]">
                                You've studied 5 days in a row.<br />Keep going!!
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
