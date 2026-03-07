import React, { useState } from 'react';
import '../styles/global.css'; // Ensure we have the global styles

const Onboarding = ({ onComplete }) => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject) 
        : [...prev, subject]
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
      <main className="w-full">
        <div className="max-w-4xl mx-auto p-4 md:p-12 w-full border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white mt-10 mb-10">
          
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">Personalize Your Journey</h1>
            <p className="text-lg font-bold text-slate-600">Tailor MindPop to your academic goals and learning preferences.</p>
          </header>

          {/* Section 1: Choose Grade */}
          <section className="mb-12">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
              Choose Grade
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { grade: '9', label: 'Freshman', color: 'bg-white' },
                { grade: '10', label: 'Sophomore', color: 'bg-accent-lime' },
                { grade: '11', label: 'Junior', color: 'bg-white' },
                { grade: '12', label: 'Senior', color: 'bg-white' }
              ].map((item) => (
                <button 
                  key={item.grade}
                  onClick={() => setSelectedGrade(item.grade)}
                  className={`aspect-square ${item.color} ${selectedGrade === item.grade ? 'border-[4px] border-primary translate-x-[2px] translate-y-[2px] shadow-none' : 'border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'} transition-all flex flex-col items-center justify-center group`}
                >
                  <span className="text-4xl font-black group-hover:scale-110 transition-transform">{item.grade}</span>
                  <span className="text-xs font-bold uppercase mt-2">{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Section 2: Choose Subjects */}
          <section className="mb-12">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
              Choose Subjects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { id: 'physics', icon: 'science', title: 'Physics', desc: 'Mechanics & Energy', bg: 'bg-accent-blue' },
                { id: 'biology', icon: 'science', title: 'Biology', desc: 'Genetics & Systems', iconColor: 'text-primary' },
                { id: 'calculus', icon: 'functions', title: 'Calculus', desc: 'Limits & Derivatives', iconColor: 'text-accent-lime' },
                { id: 'literature', icon: 'menu_book', title: 'Literature', desc: 'Analysis & Comp', iconColor: 'text-blue-500' },
                { id: 'history', icon: 'history_edu', title: 'History', desc: 'World Events', bg: 'bg-primary text-white' },
                { id: 'philosophy', icon: 'psychology', title: 'Philosophy', desc: 'Logic & Ethics', iconColor: 'text-purple-500' },
              ].map((subj) => {
                const isSelected = selectedSubjects.includes(subj.id);
                return (
                  <div 
                    key={subj.id}
                    onClick={() => handleSubjectToggle(subj.id)}
                    className={`${subj.bg || 'bg-white'} border-[3px] border-black p-6 cursor-pointer transition-all ${isSelected ? 'translate-x-[2px] translate-y-[2px] shadow-none ring-4 ring-black/20' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
                  >
                    <span className={`material-symbols-outlined text-4xl mb-4 font-bold block ${subj.iconColor || ''}`}>{subj.icon}</span>
                    <h3 className="text-xl font-black">{subj.title}</h3>
                    <p className={`text-sm font-bold mt-1 ${subj.bg ? 'opacity-90' : 'text-slate-500'}`}>{subj.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Learning Style */}
          <section className="mb-16">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
              Learning Style
            </h2>
            <div className="space-y-4">
              {[
                { id: 'visual', iconClass: 'bg-accent-lime', icon: 'visibility', title: 'Visual', desc: 'Infographics, video lectures, and mind maps.' },
                { id: 'interactive', iconClass: 'bg-white', icon: 'touch_app', title: 'Interactive', desc: 'Quizzes, flashcards, and group challenges.', wrapperClass: 'bg-accent-blue' },
                { id: 'theoretical', iconClass: 'bg-primary/20', iconColor: 'text-primary', icon: 'menu_book', title: 'Theoretical', desc: 'In-depth readings, case studies, and papers.' },
              ].map((style) => (
                <div 
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`flex items-center gap-4 md:gap-6 ${style.wrapperClass || 'bg-white'} border-[3px] border-black p-4 md:p-6 cursor-pointer transition-all ${selectedStyle === style.id ? 'translate-x-[2px] translate-y-[2px] shadow-none ring-4 ring-black/20' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${style.iconClass} border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className={`material-symbols-outlined text-2xl md:text-3xl font-bold ${style.iconColor || ''}`}>{style.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black uppercase text-black">{style.title}</h3>
                    <p className="font-bold text-slate-600 text-xs md:text-sm">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Action */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t-[3px] border-black">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400">
              Step 1 of 3 
              <div className="w-24 h-4 bg-slate-200 rounded-full border-2 border-black overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full bg-primary w-1/3"></div>
              </div>
            </div>
            <button 
              onClick={onComplete}
              className="w-full sm:w-auto px-12 py-5 bg-primary text-white text-xl font-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-3"
            >
              Continue <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default Onboarding;
