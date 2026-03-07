import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/* ── Grade color themes ── */
const GRADE_THEMES = {
  '9': { bg: 'bg-lime-300', ring: 'ring-lime-400', accent: 'bg-lime-100', text: 'text-lime-700', fill: 'bg-lime-400', label: 'Freshman' },
  '10': { bg: 'bg-sky-300', ring: 'ring-sky-400', accent: 'bg-sky-100', text: 'text-sky-700', fill: 'bg-sky-400', label: 'Sophomore' },
  '11': { bg: 'bg-amber-300', ring: 'ring-amber-400', accent: 'bg-amber-100', text: 'text-amber-700', fill: 'bg-amber-400', label: 'Junior' },
  '12': { bg: 'bg-rose-400 text-white', ring: 'ring-rose-400', accent: 'bg-rose-100', text: 'text-rose-700', fill: 'bg-rose-400', label: 'Senior' },
};

const Onboarding = ({ user, onComplete }) => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [subjectsForGrade, setSubjectsForGrade] = useState([]);
  const [learningStyles, setLearningStyles] = useState([]);
  const [allGradeSubjects, setAllGradeSubjects] = useState({});
  const [loadingOptions, setLoadingOptions] = useState(true);

  const theme = selectedGrade ? GRADE_THEMES[selectedGrade] : null;

  useEffect(() => {
    fetch(`${API_BASE}/profile/options`)
      .then(res => res.json())
      .then(data => {
        setAllGradeSubjects(data.grade_subjects_details || {});
        setLearningStyles(data.learning_style_details || []);
        setLoadingOptions(false);
      })
      .catch(() => setLoadingOptions(false));
  }, []);

  useEffect(() => {
    if (selectedGrade && allGradeSubjects[selectedGrade]) {
      setSubjectsForGrade(allGradeSubjects[selectedGrade]);
      setSelectedSubjects([]);
      setSelectedStyle(null);
    } else {
      setSubjectsForGrade([]);
    }
  }, [selectedGrade, allGradeSubjects]);

  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(s => s !== subjectId) : [...prev, subjectId]
    );
  };

  const canSubmit = selectedGrade && selectedSubjects.length > 0 && selectedStyle;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError('');
    setSaving(true);
    const username = user?.username || JSON.parse(localStorage.getItem('mindpop_user') || '{}').username;
    if (!username) { setError('User session not found. Please log in again.'); setSaving(false); return; }

    try {
      const res = await fetch(`${API_BASE}/profile/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, grade: selectedGrade, subjects: selectedSubjects, learning_style: selectedStyle }),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.detail || 'Failed to save profile'); }
      onComplete();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  if (loadingOptions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="border-[4px] border-black bg-white p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="text-6xl mb-4 animate-bounce">🎨</div>
          <p className="text-2xl font-black uppercase tracking-tight">Setting things up...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light font-display text-slate-900 min-h-screen flex items-center justify-center p-4">
      <main className="w-full">
        <div className="max-w-4xl mx-auto p-6 md:p-12 w-full border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white my-8">

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tight">Personalize Your Journey</h1>
            <p className="text-base md:text-lg font-bold text-slate-500">Tailor MindPop to your academic goals and learning preferences.</p>
          </header>

          {error && (
            <div className="bg-red-100 border-[3px] border-red-500 px-4 py-3 mb-8 font-bold text-red-700 text-sm shadow-[3px_3px_0px_0px_rgba(239,68,68,0.5)] flex items-center gap-2">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          {/* ─────────── STEP 1 · GRADE ─────────── */}
          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-black mb-5 flex items-center gap-3">
              <span className={`w-8 h-8 ${selectedGrade ? 'bg-green-500' : 'bg-black'} text-white rounded-full flex items-center justify-center text-sm font-black transition-colors`}>
                {selectedGrade ? '✓' : '1'}
              </span>
              Choose Your Grade
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {Object.entries(GRADE_THEMES).map(([grade, t]) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`aspect-square ${t.bg} border-[3px] border-black flex flex-col items-center justify-center group transition-all ${selectedGrade === grade
                      ? `translate-x-[2px] translate-y-[2px] shadow-none ring-4 ${t.ring}`
                      : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                >
                  <span className="text-4xl font-black group-hover:scale-110 transition-transform">{grade}</span>
                  <span className="text-xs font-bold uppercase mt-2">{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* ─────────── STEP 2 · SUBJECTS (grade-colored) ─────────── */}
          {selectedGrade && theme && (
            <section className="mb-10" style={{ animation: 'slideUp 0.3s ease-out' }}>
              <h2 className="text-xl md:text-2xl font-black mb-5 flex items-center gap-3">
                <span className={`w-8 h-8 ${selectedSubjects.length > 0 ? 'bg-green-500' : 'bg-black'} text-white rounded-full flex items-center justify-center text-sm font-black transition-colors`}>
                  {selectedSubjects.length > 0 ? '✓' : '2'}
                </span>
                Choose Subjects for Grade {selectedGrade}
                {selectedSubjects.length > 0 && (
                  <span className="text-sm font-bold text-slate-400 ml-1">({selectedSubjects.length} selected)</span>
                )}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subjectsForGrade.map((subj) => {
                  const isSelected = selectedSubjects.includes(subj.id);
                  return (
                    <div
                      key={subj.id}
                      onClick={() => handleSubjectToggle(subj.id)}
                      className={`${isSelected ? theme.accent : 'bg-white'} border-[3px] border-black p-5 cursor-pointer transition-all relative ${isSelected
                          ? `translate-x-[2px] translate-y-[2px] shadow-none ring-4 ${theme.ring}`
                          : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                    >
                      {isSelected && (
                        <div className={`absolute top-2 right-2 w-6 h-6 ${theme.fill} border-2 border-black flex items-center justify-center`}>
                          <span className="text-white text-xs font-black">✓</span>
                        </div>
                      )}
                      <span className={`material-symbols-outlined text-3xl mb-3 font-bold block ${isSelected ? theme.text : 'text-slate-700'}`}>
                        {subj.icon}
                      </span>
                      <h3 className="text-base font-black leading-tight">{subj.title}</h3>
                      <p className="text-xs font-bold mt-1 text-slate-500">{subj.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ─────────── STEP 3 · LEARNING STYLE (grade-colored) ─────────── */}
          {selectedSubjects.length > 0 && theme && (
            <section className="mb-12" style={{ animation: 'slideUp 0.3s ease-out' }}>
              <h2 className="text-xl md:text-2xl font-black mb-5 flex items-center gap-3">
                <span className={`w-8 h-8 ${selectedStyle ? 'bg-green-500' : 'bg-black'} text-white rounded-full flex items-center justify-center text-sm font-black transition-colors`}>
                  {selectedStyle ? '✓' : '3'}
                </span>
                How Do You Learn Best?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningStyles.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`flex items-center gap-4 ${isSelected ? theme.accent : 'bg-white'} border-[3px] border-black p-4 md:p-5 cursor-pointer transition-all ${isSelected
                          ? `translate-x-[2px] translate-y-[2px] shadow-none ring-4 ${theme.ring}`
                          : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                    >
                      <div className={`w-12 h-12 ${isSelected ? theme.fill : 'bg-slate-100'} border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0 transition-colors`}>
                        <span className={`material-symbols-outlined text-2xl font-bold ${isSelected ? 'text-white' : ''}`}>{style.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-black uppercase text-black">{style.title}</h3>
                        <p className="font-bold text-slate-600 text-xs">{style.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ─────────── FOOTER ─────────── */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t-[3px] border-black">
            <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400">
              <span>Progress</span>
              <div className="flex gap-1">
                <div className={`w-8 h-3 border-2 border-black ${selectedGrade ? (theme?.fill || 'bg-primary') : 'bg-slate-200'} transition-colors`}></div>
                <div className={`w-8 h-3 border-2 border-black ${selectedSubjects.length > 0 ? (theme?.fill || 'bg-primary') : 'bg-slate-200'} transition-colors`}></div>
                <div className={`w-8 h-3 border-2 border-black ${selectedStyle ? (theme?.fill || 'bg-primary') : 'bg-slate-200'} transition-colors`}></div>
              </div>
              <span className="text-xs">{[selectedGrade, selectedSubjects.length > 0, selectedStyle].filter(Boolean).length}/3</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || saving}
              className={`w-full sm:w-auto px-10 py-4 text-lg font-black border-[3px] border-black transition-all flex items-center justify-center gap-3 ${canSubmit && !saving
                  ? `${theme?.fill || 'bg-primary'} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                }`}
            >
              {saving ? <>⏳ Saving...</> : <>Let's Go! <span className="material-symbols-outlined font-bold">rocket_launch</span></>}
            </button>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default Onboarding;
