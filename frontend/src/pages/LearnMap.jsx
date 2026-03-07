import React, { useState } from 'react';

const chapterColors = {
    yellow: 'bg-[#EBB336]',
    blue: 'bg-[#7AC6ED]',
    purple: 'bg-[#8D46EE]',
    orange: 'bg-[#E16B3D]',
    lightOrange: 'bg-[#E06A3B]',
};

// Initial state data representing the chapters in the learning path
const initialChapters = [
    {
        id: 'cap1',
        chapterId: 'CHAPTER 01',
        title: 'Foundations of Logic',
        description: 'Propositional logic and truth tables.',
        status: 'completed', // completed, active, pending
        color: 'yellow',
    },
    {
        id: 'cap2',
        chapterId: 'CHAPTER 02',
        title: 'Set Theory Basics',
        description: 'Unions, intersections, and Venn diagrams.',
        status: 'completed',
        color: 'blue',
    },
    {
        id: 'cap3',
        chapterId: 'CHAPTER 03',
        title: 'Advanced Proof Techniques',
        description: 'Mastering induction, contradiction, and direct proof methodology.',
        status: 'active',
        progress: 42,
        color: 'orange', // though central card is white with orange border
    },
    {
        id: 'cap4',
        chapterId: 'CHAPTER 04',
        title: 'Number Theory',
        description: 'Modular arithmetic and prime factorization.',
        status: 'pending',
        color: 'purple',
    },
    {
        id: 'cap5',
        chapterId: 'CHAPTER 05',
        title: 'Combinatorics',
        description: 'Permutations and combination formulas.',
        status: 'pending',
        color: 'lightOrange',
    }
];

const LearnMap = ({ onNavigate }) => {
    const [chapters, setChapters] = useState(initialChapters);

    // Filter chapters based on status
    const completedChapters = chapters.filter(c => c.status === 'completed');
    const activeChapter = chapters.find(c => c.status === 'active');
    const pendingChapters = chapters.filter(c => c.status === 'pending');

    const handleContinueLesson = () => {
        if (!activeChapter) return;

        let newProgress = activeChapter.progress + 20;

        if (newProgress >= 100) {
            // Chapter complete! Move next pending to active
            setChapters(prev => {
                const nextChapters = prev.map(c => ({ ...c }));

                // Mark current as completed
                const currentIdx = nextChapters.findIndex(c => c.id === activeChapter.id);
                nextChapters[currentIdx].status = 'completed';
                delete nextChapters[currentIdx].progress;

                // Mark next pending as active
                const nextPendingIdx = nextChapters.findIndex(c => c.status === 'pending');
                if (nextPendingIdx !== -1) {
                    nextChapters[nextPendingIdx].status = 'active';
                    nextChapters[nextPendingIdx].progress = 0;
                }

                return nextChapters;
            });
        } else {
            // Just update progress
            setChapters(prev => {
                const nextChapters = prev.map(c => ({ ...c }));
                const currentIdx = nextChapters.findIndex(c => c.id === activeChapter.id);
                nextChapters[currentIdx].progress = newProgress;
                return nextChapters;
            });
        }
    };

    // Calculate total progress
    const totalCompleted = chapters.filter(c => c.status === 'completed').length;
    const totalChapters = chapters.length;
    const overallProgress = Math.round((totalCompleted / totalChapters) * 100);

    return (
        <div className="min-h-full bg-[#FAF4EA] font-display flex flex-col relative overflow-x-hidden">

            {/* Background Watermarks */}
            <div className="absolute top-[15%] left-[5%] text-[15rem] leading-none text-black/[0.03] select-none pointer-events-none">💡</div>
            <div className="absolute bottom-[25%] left-[10%] text-[15rem] leading-none text-black/[0.03] select-none pointer-events-none">🎓</div>
            <div className="absolute bottom-[40%] right-[10%] text-[15rem] leading-none text-black/[0.03] select-none pointer-events-none">🧮</div>

            {/* Top Page Sub-Header */}
            <div className="w-full bg-white border-b-[4px] border-black flex flex-col sm:flex-row items-start sm:items-center justify-between px-8 py-5 z-20 sticky top-0">

                <div className="flex flex-col items-start text-left mb-4 sm:mb-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest leading-none">SUBJECT LEARNING PATH</h1>
                    <p className="text-xs sm:text-sm font-bold text-gray-500 mt-2 tracking-wide">Mathematics & Logic Foundation</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="font-black text-sm uppercase tracking-widest">{overallProgress}% COMPLETE</span>
                        <div className="w-32 md:w-48 h-5 border-[3px] border-black bg-white p-[2px]">
                            <div className="h-full bg-[#E16B3D] transition-all duration-500 ease-in-out" style={{ width: `${overallProgress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area - 3 Column Layout */}
            <div className="flex-1 w-full max-w-[1400px] mx-auto p-8 flex flex-col lg:flex-row items-start lg:items-center justify-center gap-12 z-10 relative">

                {/* Column 1: Topics Covered */}
                <div className="flex flex-col gap-6 w-full lg:w-[320px]">
                    <div className="bg-black text-white px-4 py-2 self-start transform -rotate-2">
                        <h2 className="font-black text-lg tracking-widest uppercase">TOPICS COVERED</h2>
                    </div>

                    <div className="flex flex-col gap-5 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[30px] top-4 bottom-4 w-[4px] bg-black -z-10"></div>

                        {completedChapters.map((chapter) => (
                            <div key={chapter.id} className={`${chapterColors[chapter.color]} border-[4px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative transition-transform hover:-translate-y-1`}>
                                {/* Checkmark block */}
                                <div className="absolute -top-3 -left-3 w-6 h-6 bg-black flex items-center justify-center text-white font-black text-xs rotate-12">
                                    ✓
                                </div>
                                <h3 className="font-black text-xs uppercase tracking-widest opacity-70 mb-1">{chapter.chapterId}</h3>
                                <h4 className="font-black text-xl leading-tight mb-2 tracking-wide">{chapter.title}</h4>
                                <p className="font-bold text-sm tracking-wide leading-snug">{chapter.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Current Focus */}
                <div className="flex flex-col items-center w-full lg:w-[420px] relative z-20">
                    <div className="bg-[#E16B3D] text-white px-6 py-2 border-t-[4px] border-l-[4px] border-r-[4px] border-black">
                        <h2 className="font-black text-xl tracking-widest uppercase">CURRENT FOCUS</h2>
                    </div>

                    {activeChapter ? (
                        <div className="bg-white border-[6px] border-[#E16B3D] w-full p-8 shadow-[12px_12px_0px_0px_rgba(225,107,61,0.2)]">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-black text-sm uppercase tracking-widest text-[#E16B3D]">{activeChapter.chapterId}</h3>
                                <div className="w-8 h-8 rounded-full border-[3px] border-[#E16B3D] flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-[#E16B3D]"></div>
                                </div>
                            </div>

                            <h4 className="font-black text-4xl leading-[1.1] mb-4 tracking-tight text-gray-900">{activeChapter.title}</h4>
                            <p className="font-bold text-lg text-gray-700 leading-relaxed tracking-wide mb-10">
                                {activeChapter.description}
                            </p>

                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-black text-xs uppercase tracking-widest">CURRENT PROGRESS</span>
                                    <span className="font-black text-lg">{activeChapter.progress}%</span>
                                </div>
                                <div className="w-full h-5 border-[3px] border-black bg-white mb-6 p-[2px]">
                                    <div
                                        className="h-full bg-[#E16B3D] transition-all duration-500 ease-in-out"
                                        style={{ width: `${activeChapter.progress}%` }}
                                    ></div>
                                </div>
                                <button
                                    onClick={handleContinueLesson}
                                    className="w-full bg-black text-white font-black text-xl py-4 tracking-widest uppercase hover:bg-gray-800 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-black"
                                >
                                    CONTINUE LESSON
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border-[6px] border-[#E16B3D] w-full p-12 text-center">
                            <h4 className="font-black text-3xl leading-[1.1] mb-4 tracking-tight">Path Completed!</h4>
                            <p className="font-bold text-lg text-gray-700">You've finished all current topics.</p>
                        </div>
                    )}
                </div>

                {/* Column 3: Topics To Cover */}
                <div className="flex flex-col gap-6 w-full lg:w-[320px]">
                    <div className="bg-[#D6DEE5] text-black px-4 py-2 self-end transform rotate-2">
                        <h2 className="font-black text-lg tracking-widest uppercase">TOPICS TO COVER</h2>
                    </div>

                    <div className="flex flex-col gap-5 relative">
                        {/* Connecting Line */}
                        <div className="absolute right-[30px] top-4 bottom-4 w-[4px] border-l-[4px] border-dashed border-gray-400 -z-10"></div>

                        {pendingChapters.map((chapter) => (
                            <div key={chapter.id} className={`${chapterColors[chapter.color]} border-[4px] border-dashed border-black p-5 relative`}>
                                <h3 className="font-black text-xs uppercase tracking-widest text-black/60 mb-1">{chapter.chapterId}</h3>
                                <h4 className="font-black text-xl text-black/80 leading-tight mb-2 tracking-wide">{chapter.title}</h4>
                                <p className="font-bold text-sm text-black/70 tracking-wide leading-snug">{chapter.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Stats Footer */}
            <div className="w-full bg-white border-t-[4px] border-black grid grid-cols-2 md:grid-cols-4 z-10">
                <div className="p-6 border-r-[4px] border-b-[4px] md:border-b-0 border-black flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-4xl text-[#E16B3D]">⏱️</span>
                    <div>
                        <div className="font-black text-[10px] uppercase tracking-widest text-black mb-0.5">STUDY TIME</div>
                        <div className="font-black text-xl tracking-tight leading-none">12.5 Hours</div>
                    </div>
                </div>
                <div className="p-6 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-4xl text-[#7AC6ED]">🏅</span>
                    <div>
                        <div className="font-black text-[10px] uppercase tracking-widest text-black mb-0.5">ACHIEVEMENTS</div>
                        <div className="font-black text-xl tracking-tight leading-none">8 Badges</div>
                    </div>
                </div>
                <div className="p-6 border-r-[4px] border-black flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-4xl text-[#EBB336]">⚡</span>
                    <div>
                        <div className="font-black text-[10px] uppercase tracking-widest text-black mb-0.5">CURRENT STREAK</div>
                        <div className="font-black text-xl tracking-tight leading-none">5 Days</div>
                    </div>
                </div>
                <div className="p-6 flex items-center justify-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-4xl text-[#8D46EE]">📚</span>
                    <div>
                        <div className="font-black text-[10px] uppercase tracking-widest text-black mb-0.5">QUESTIONS SOLVED</div>
                        <div className="font-black text-xl tracking-tight leading-none">142</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LearnMap;
