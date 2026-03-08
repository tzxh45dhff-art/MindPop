import React, { useState, useEffect } from 'react';
import { fetchProfileOptions } from '../services/api';
import { useTheme } from '../i18n/ThemeContext';

// Icon map – simple colored SVG-style boxes matching the mockup
const SUBJECT_ICONS = {
    Physics: { emoji: '🚀', bg: 'bg-pink-200' },
    Chemistry: { emoji: '⚗️', bg: 'bg-green-200' },
    Mathematics: { emoji: '📐', bg: 'bg-purple-200' },
    Biology: { emoji: '🧬', bg: 'bg-pink-200' },
    History: { emoji: '📜', bg: 'bg-yellow-200' },
    ComputerScience: { emoji: '💻', bg: 'bg-blue-200' },
    Math: { emoji: '📐', bg: 'bg-purple-200' },
    Science: { emoji: '🔬', bg: 'bg-green-200' },
    English: { emoji: '📖', bg: 'bg-yellow-200' },
    SocialStudies: { emoji: '🌍', bg: 'bg-orange-200' },
    Art: { emoji: '🎨', bg: 'bg-pink-200' },
    PE: { emoji: '🏃', bg: 'bg-green-200' },
    ForeignLanguage: { emoji: '🌐', bg: 'bg-blue-200' },
    Geometry: { emoji: '📐', bg: 'bg-purple-200' },
    WorldHistory: { emoji: '📜', bg: 'bg-yellow-200' },
    English10: { emoji: '📖', bg: 'bg-yellow-200' },
    Economics: { emoji: '📊', bg: 'bg-green-200' },
    Calculus: { emoji: '∫', bg: 'bg-purple-200' },
    USHistory: { emoji: '🗽', bg: 'bg-yellow-200' },
    Literature: { emoji: '📖', bg: 'bg-yellow-200' },
    Psychology: { emoji: '🧠', bg: 'bg-pink-200' },
    Statistics: { emoji: '📊', bg: 'bg-blue-200' },
    APPhysics: { emoji: '🚀', bg: 'bg-pink-200' },
    APCalcBC: { emoji: '∫', bg: 'bg-purple-200' },
    APBiology: { emoji: '🧬', bg: 'bg-pink-200' },
    APChemistry: { emoji: '⚗️', bg: 'bg-green-200' },
    Philosophy: { emoji: '🧠', bg: 'bg-purple-200' },
    APLiterature: { emoji: '📖', bg: 'bg-yellow-200' },
    Government: { emoji: '⚖️', bg: 'bg-blue-200' },
    APCompSci: { emoji: '💻', bg: 'bg-blue-200' },
};

// Fallback subjects when backend is unavailable
const FALLBACK_SUBJECTS = [
    { id: 'Physics', title: 'Physics', desc: 'Explore the laws governing our universe from motion to quantum mechanics.', lessons: 32 },
    { id: 'Chemistry', title: 'Chemistry', desc: 'Understand the building blocks of matter and chemical reactions.', lessons: 28 },
    { id: 'Mathematics', title: 'Mathematics', desc: 'Master advanced calculus, geometry, and problem-solving techniques.', lessons: 45 },
    { id: 'Biology', title: 'Biology', desc: 'From cellular structures to complex ecosystems and human anatomy.', lessons: 25 },
    { id: 'History', title: 'History', desc: 'Analyze past civilizations and the events that shaped our modern world.', lessons: 18 },
    { id: 'ComputerScience', title: 'Computer Science', desc: 'Coding, algorithms, and the architecture of modern technology.', lessons: 40 },
];

const Subjects = ({ user }) => {
    const { isDark } = useTheme();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const cardBg = isDark ? 'bg-[#16213e] border-gray-600' : 'bg-white border-black';
    const textColor = isDark ? 'text-gray-100' : 'text-black';
    const subText = isDark ? 'text-gray-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-gray-600' : 'border-black';

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const data = await fetchProfileOptions();
                const userGrade = user?.grade;

                if (data.grade_subjects_details && userGrade && data.grade_subjects_details[userGrade]) {
                    const gradeSubjects = data.grade_subjects_details[userGrade];

                    // If user has selected specific subjects during onboarding, filter to those
                    const userSelectedSubjects = user?.subjects;
                    let filteredSubjects = gradeSubjects;
                    if (userSelectedSubjects && userSelectedSubjects.length > 0) {
                        filteredSubjects = gradeSubjects.filter(s => userSelectedSubjects.includes(s.id));
                    }

                    const mapped = filteredSubjects.map((s, i) => ({
                        id: s.id,
                        title: s.title,
                        desc: s.desc,
                        lessons: [32, 28, 45, 25, 18, 40, 35, 22][i % 8],
                    }));
                    setSubjects(mapped);
                } else {
                    setSubjects(FALLBACK_SUBJECTS);
                }
            } catch (err) {
                console.warn('Backend unavailable, using fallback subjects:', err.message);
                setSubjects(FALLBACK_SUBJECTS);
            } finally {
                setLoading(false);
            }
        };

        loadSubjects();
    }, [user]);

    const getIcon = (id) => SUBJECT_ICONS[id] || { emoji: '📘', bg: 'bg-gray-200' };

    return (
        <div className={`px-10 py-10 ${textColor}`}>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-black uppercase leading-tight tracking-tight mb-3">
                WHAT WOULD YOU LIKE<br />TO LEARN TODAY?
            </h1>
            <div className="flex items-start gap-3 mb-10">
                <div className="w-1 h-5 bg-brutal-orange mt-0.5 shrink-0"></div>
                <p className={`text-sm font-medium ${subText}`}>Your personalized curriculum is ready for exploration.</p>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <div className={`w-10 h-10 border-[4px] ${borderColor} border-t-brutal-orange animate-spin`}></div>
                </div>
            )}

            {/* Subject Cards Grid */}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject) => {
                        const icon = getIcon(subject.id);
                        return (
                            <div
                                key={subject.id}
                                className={`border-[3px] ${cardBg} p-6 flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all group`}
                            >
                                {/* Icon */}
                                <div>
                                    <div className={`w-14 h-14 ${icon.bg} border-[3px] ${borderColor} flex items-center justify-center text-2xl mb-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                        {icon.emoji}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-black uppercase tracking-tight mb-2">{subject.title}</h3>

                                    {/* Description */}
                                    <p className={`text-sm ${subText} font-medium leading-relaxed mb-6`}>{subject.desc}</p>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-auto">
                                    <span className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>{subject.lessons} LESSONS</span>
                                    <button className="bg-brutal-orange border-[3px] border-black px-5 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-400 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-black">
                                        EXPLORE
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!loading && subjects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl font-black uppercase mb-2">No subjects found</p>
                    <p className={`text-sm ${subText} font-medium`}>Try adjusting your search or check your profile settings.</p>
                </div>
            )}
        </div>
    );
};

export default Subjects;
