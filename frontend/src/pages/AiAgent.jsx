import React, { useState, useRef, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import { useTheme } from '../i18n/ThemeContext';
import {
    initializeChat,
    sendMessage,
    generateNotes,
    generateImageSolution,
    generateQuiz,
    isConfigured,
    clearHistory,
    isElevenLabsConfigured,
    speakWithElevenLabs,
} from '../services/aiService';
import { saveVideoLesson, getUserVideoLessons, deleteVideoLesson } from '../services/firebaseService';
import { generateVideoScript, createVideoProject, pollVideoStatus } from '../services/videoService';
import '../styles/global.css';

/* ─── Constants ─── */
const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History', 'Computer Science'];

const TOPIC_MAP = {
    Physics: ['Modern Physics', 'Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism'],
    Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
    Mathematics: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics', 'Geometry'],
    Biology: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Evolution'],
    English: ['Grammar', 'Literature', 'Writing Skills', 'Comprehension', 'Vocabulary'],
    History: ['Ancient History', 'Medieval History', 'Modern History', 'World Wars'],
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Databases', 'Networking'],
};

const MOTIVATIONAL_TIPS = [
    "💡 Tip: Break big problems into small steps!",
    "🎯 Focus on understanding, not memorizing.",
    "🚀 Every expert was once a beginner. Keep going!",
    "🧠 Take 5-min breaks every 25 mins for peak focus.",
    "⭐ You're doing amazing — consistency is key!",
];

/* ─── Component ─── */
const AiAgent = ({ user, onNavigate }) => {
    const { isDark } = useTheme();
    /* State */
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [outputMode, setOutputMode] = useState('text'); // text | voice | both
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [notesContent, setNotesContent] = useState('');
    const [notesLoading, setNotesLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageMime, setImageMime] = useState(null);
    const [tipIndex] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_TIPS.length));
    const [isSpeaking, setIsSpeaking] = useState(false);

    /* Quiz state */
    const [quizActive, setQuizActive] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizTopicInput, setQuizTopicInput] = useState('');
    const [quizLoading, setQuizLoading] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    /* Video Lessons State */
    const [videoLibraryActive, setVideoLibraryActive] = useState(false);
    const [videoLessons, setVideoLessons] = useState([]);
    const [videoLibraryLoading, setVideoLibraryLoading] = useState(false);

    // Video Generation State
    const [videoGenActive, setVideoGenActive] = useState(false);
    const [videoTopicInput, setVideoTopicInput] = useState('');
    const [videoGenStep, setVideoGenStep] = useState(0); // 0: input, 1: generating script, 2: rendering, 3: done
    const [videoGenProgress, setVideoGenProgress] = useState({ status: '', attempts: 0 });
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);
    const inputRef = useRef(null);
    const audioRef = useRef(null);

    const apiReady = isConfigured();
    const elevenLabsReady = isElevenLabsConfigured();

    /* Auto-scroll ONLY inside the chat container */
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    /* Initialize chat when subject/topic changes */
    useEffect(() => {
        if (apiReady) {
            try {
                initializeChat(selectedSubject, selectedTopic);
            } catch {
                // API key issue
            }
        }
    }, [selectedSubject, selectedTopic, apiReady]);

    /* Speech recognition setup */
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText((prev) => (prev ? prev + ' ' + transcript : transcript));
                setIsListening(false);
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);

            recognitionRef.current = recognition;
        }
        return () => recognitionRef.current?.abort();
    }, []);

    /* Cleanup audio on unmount */
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            speechSynthesis.cancel();
        };
    }, []);

    /* ─── Handlers ─── */

    const speakText = useCallback(async (text) => {
        if (outputMode === 'text') return;

        // Try ElevenLabs first
        if (elevenLabsReady) {
            setIsSpeaking(true);
            try {
                const blob = await speakWithElevenLabs(text);
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    audioRef.current = audio;
                    audio.onended = () => {
                        setIsSpeaking(false);
                        URL.revokeObjectURL(url);
                    };
                    audio.onerror = () => {
                        setIsSpeaking(false);
                        URL.revokeObjectURL(url);
                    };
                    await audio.play();
                    return;
                }
            } catch (err) {
                console.error('ElevenLabs error, falling back to browser TTS:', err);
            }
        }

        // Fallback: browser SpeechSynthesis
        setIsSpeaking(true);
        const clean = text.replace(/[#*_`~>\-|]/g, '').replace(/\n+/g, '. ');
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }, [outputMode, elevenLabsReady]);

    const stopSpeaking = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const handleSend = async () => {
        const text = inputText.trim();
        if (!text && !imageData) return;
        if (!apiReady) {
            setMessages((prev) => [
                ...prev,
                { role: 'user', text: text || '📷 Image uploaded' },
                { role: 'model', text: '⚠️ **API key not configured.** Please add your Gemini API key to the `.env` file as `VITE_GEMINI_API_KEY=your_key_here` and restart the dev server.' },
            ]);
            setInputText('');
            setImagePreview(null);
            setImageData(null);
            return;
        }

        const userMsg = {
            role: 'user',
            text: text || '📷 Uploaded an image for analysis',
            image: imagePreview || null,
        };
        setMessages((prev) => [...prev, userMsg]);
        setInputText('');
        const currentImage = imageData;
        const currentMime = imageMime;
        setImagePreview(null);
        setImageData(null);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        // --- NEW: Detect Video Generation Request ---
        const videoKeywords = ['video', 'generate video', 'make a video', 'create a video', 'video lesson', 'show me a video'];
        const isVideoRequest = videoKeywords.some(kw => text.toLowerCase().includes(kw));

        if (isVideoRequest) {
            // If user asks for a video, we trigger the video generation flow instead of normal chat
            setVideoTopicInput(text.replace(/generate|video|lesson|make|create|a|show|me|/gi, '').trim());
            setVideoLibraryActive(true);
            setVideoGenActive(true);
            // We still send the message to chat so the AI acknowledges it
        }

        setIsLoading(true);

        try {
            const reply = await sendMessage(text, currentImage, currentMime);
            const aiMsg = { role: 'model', text: reply };
            setMessages((prev) => [...prev, aiMsg]);
            stopSpeaking(); // Stop any ongoing speech before speaking the new reply
            if (outputMode !== 'text') { // Only speak if outputMode is not 'text'
                speakText(reply);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'model', text: `❌ Oops! Something went wrong: ${err.message}. Don't worry — let's try again! 💪` },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64Full = reader.result;
            const mime = file.type || 'image/jpeg';
            const base64Data = base64Full.split(',')[1];
            setImagePreview(base64Full);
            setImageData(base64Data);
            setImageMime(mime);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleGenerateNotes = async () => {
        if (!apiReady) return;
        setNotesLoading(true);
        setShowNotesModal(true);
        try {
            const notes = await generateNotes(selectedSubject, selectedTopic);
            setNotesContent(notes);
        } catch (err) {
            setNotesContent(`❌ Error generating notes: ${err.message}`);
        } finally {
            setNotesLoading(false);
        }
    };

    const handlePrintNotes = () => {
        const printWindow = window.open('', '_blank');
        const htmlContent = marked.parse(notesContent);
        printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>MindPop Study Notes</title>
      <style>
        body { font-family: 'Inter', 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #111; line-height: 1.7; }
        h1 { border-bottom: 4px solid #000; padding-bottom: 8px; text-transform: uppercase; }
        h2 { border-left: 6px solid #FB923C; padding-left: 12px; margin-top: 28px; }
        h3 { color: #333; margin-top: 20px; }
        code { background: #f3f4f6; padding: 2px 6px; border: 1px solid #ddd; font-size: 0.9em; }
        pre { background: #f3f4f6; padding: 16px; border: 2px solid #000; overflow-x: auto; }
        ul, ol { padding-left: 24px; }
        li { margin-bottom: 6px; }
        blockquote { border-left: 4px solid #A855F7; padding: 8px 16px; background: #faf5ff; margin: 16px 0; }
        .header { text-align: center; margin-bottom: 32px; }
        .header small { color: #666; }
        @media print { body { margin: 20px; } }
      </style></head><body>
      <div class="header">
        <h1>📚 MindPop Study Notes</h1>
        <small>${selectedSubject || 'General'} — ${selectedTopic || 'Overview'}</small>
      </div>
      ${htmlContent}
      <hr style="border:2px solid #000;margin-top:32px"/>
      <p style="text-align:center;font-size:12px;color:#888">Generated by MindPop AI Agent</p>
      </body></html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    };

    const handleImageSolution = async () => {
        if (!inputText.trim()) return;
        if (!apiReady) return;

        const prompt = inputText.trim();
        const userMsg = { role: 'user', text: `🎨 Diagram request: ${prompt}` };
        setMessages((prev) => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const reply = await generateImageSolution(prompt);
            setMessages((prev) => [...prev, { role: 'model', text: reply }]);
            speakText(reply);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'model', text: `❌ Could not generate diagram: ${err.message}` },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        setMessages([]);
        stopSpeaking();
        clearHistory();
        if (apiReady) {
            initializeChat(selectedSubject, selectedTopic);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageData(null);
        setImageMime(null);
    };

    /* ─── Quiz Handlers ─── */

    const handleStartQuiz = async () => {
        if (!quizTopicInput.trim() && !selectedSubject) return;
        setQuizLoading(true);
        try {
            const questions = await generateQuiz(selectedSubject, selectedTopic, quizTopicInput.trim());
            setQuizData(questions);
            setQuizIndex(0);
            setQuizSelected(null);
            setQuizAnswered(false);
            setQuizScore(0);
            setQuizFinished(false);
        } catch (err) {
            alert(err.message || 'Failed to generate quiz');
        } finally {
            setQuizLoading(false);
        }
    };

    const handleQuizAnswer = (optionIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optionIdx);
        setQuizAnswered(true);
        if (optionIdx === quizData[quizIndex].correct) {
            setQuizScore((s) => s + 1);
        }
    };

    const handleQuizNext = () => {
        if (quizIndex + 1 >= quizData.length) {
            setQuizFinished(true);
        } else {
            setQuizIndex((i) => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        }
    };

    const handleQuizClose = () => {
        setQuizActive(false);
        setQuizData(null);
        setQuizIndex(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizScore(0);
        setQuizTopicInput('');
        setQuizLoading(false);
        setQuizFinished(false);
    };

    const getScoreMessage = () => {
        const pct = (quizScore / quizData.length) * 100;
        if (pct === 100) return { emoji: '🏆', msg: 'PERFECT SCORE! You absolutely crushed it!' };
        if (pct >= 80) return { emoji: '🌟', msg: 'Amazing work! You really know your stuff!' };
        if (pct >= 60) return { emoji: '💪', msg: 'Good job! A little more practice and you\'ll ace it!' };
        if (pct >= 40) return { emoji: '📚', msg: 'Not bad! Review the explanations and try again!' };
        return { emoji: '🔥', msg: 'Keep going! Every mistake is a learning opportunity!' };
    };

    /* ─── Video Lesson Handlers ─── */

    const handleOpenVideoLibrary = async () => {
        setVideoLibraryActive(true);
        setVideoLibraryLoading(true);
        try {
            const lessons = await getUserVideoLessons();
            setVideoLessons(lessons);
        } catch (err) {
            console.error(err);
        } finally {
            setVideoLibraryLoading(false);
        }
    };

    const handleDeleteVideo = async (docId) => {
        if (!window.confirm("Delete this video lesson?")) return;
        try {
            await deleteVideoLesson(docId);
            setVideoLessons(prev => prev.filter(v => v.id !== docId));
        } catch (err) {
            alert("Failed to delete video.");
        }
    };

    const handleStartVideoGeneration = async () => {
        if (!videoTopicInput.trim() && !selectedSubject) return;
        setVideoGenStep(1); // Script generation
        try {
            // 1. Generate Script
            const payload = await generateVideoScript(selectedSubject, selectedTopic, videoTopicInput.trim());

            // 2. Start Project
            setVideoGenStep(2); // Rendering
            const projectId = await createVideoProject(payload);

            // 3. Poll
            const finalUrl = await pollVideoStatus(projectId, (status, attempts) => {
                setVideoGenProgress({ status, attempts });
            });

            // 4. Save to Firebase
            const title = videoTopicInput.trim() || `${selectedSubject || 'General'} Lesson`;
            await saveVideoLesson(selectedTopic || selectedSubject || 'General', title, finalUrl, projectId);

            // 5. Show Video
            setCurrentVideoUrl(finalUrl);
            setVideoGenStep(3); // Done

            // Refresh library in background
            const lessons = await getUserVideoLessons();
            setVideoLessons(lessons);

        } catch (err) {
            alert(err.message || 'Failed to generate video.');
            setVideoGenStep(0);
        }
    };

    const handleCloseVideoGen = () => {
        setVideoGenActive(false);
        setVideoGenStep(0);
        setVideoTopicInput('');
        setCurrentVideoUrl(null);
        setVideoGenProgress({ status: '', attempts: 0 });
    };

    /* ─── Quiz Overlay Renderer ─── */

    const renderQuizOverlay = () => {
        if (!quizActive) return null;

        // Step 1: Topic Input
        if (!quizData && !quizLoading) {
            return (
                <div className="fixed inset-0 bg-gray-950/95 z-[200] flex items-center justify-center p-6" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="w-full max-w-lg animate-slideUp">
                        <div className="bg-gray-900 border-[4px] border-purple-500 p-8 shadow-[8px_8px_0px_0px_rgba(168,85,247,0.5)]">
                            <button onClick={handleQuizClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">✕</button>
                            <div className="text-center mb-6">
                                <div className="text-5xl mb-3">🧠</div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-widest">QUIZ MODE</h2>
                                <p className="text-purple-300 text-sm mt-2 font-medium">Test your knowledge with 5 interactive questions</p>
                            </div>
                            <div className="space-y-4">
                                <input
                                    value={quizTopicInput}
                                    onChange={(e) => setQuizTopicInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleStartQuiz()}
                                    placeholder={selectedSubject ? `Topic (or leave blank for ${selectedSubject})` : 'Enter a topic e.g. Photosynthesis'}
                                    className="w-full border-[3px] border-purple-500 bg-gray-800 text-white py-3 px-4 font-bold text-sm uppercase tracking-wide placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                                    autoFocus
                                />
                                <button
                                    onClick={handleStartQuiz}
                                    disabled={!quizTopicInput.trim() && !selectedSubject}
                                    className="w-full py-4 border-[3px] border-purple-500 bg-purple-600 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] hover:bg-purple-500 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    🚀 START QUIZ
                                </button>
                                <button
                                    onClick={handleQuizClose}
                                    className="w-full py-2 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-wider transition-colors"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Step 2: Loading
        if (quizLoading) {
            return (
                <div className="fixed inset-0 bg-gray-950/95 z-[200] flex items-center justify-center" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="text-center animate-slideUp">
                        <div className="text-6xl mb-4 quiz-pulse-anim">🧠</div>
                        <p className="text-white font-black text-lg uppercase tracking-widest">Generating Quiz...</p>
                        <p className="text-purple-300 text-sm mt-2">Preparing 5 questions for you</p>
                        <div className="mt-6 flex gap-2 justify-center">
                            <span className="w-3 h-3 bg-purple-500 rounded-full" style={{ animation: 'quizDot 1.4s infinite ease-in-out', animationDelay: '0s' }}></span>
                            <span className="w-3 h-3 bg-purple-500 rounded-full" style={{ animation: 'quizDot 1.4s infinite ease-in-out', animationDelay: '0.2s' }}></span>
                            <span className="w-3 h-3 bg-purple-500 rounded-full" style={{ animation: 'quizDot 1.4s infinite ease-in-out', animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                </div>
            );
        }

        // Step 3: Results
        if (quizFinished && quizData) {
            const { emoji, msg } = getScoreMessage();
            return (
                <div className="fixed inset-0 bg-gray-950/95 z-[200] flex items-center justify-center p-6" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="w-full max-w-lg animate-slideUp">
                        <div className="bg-gray-900 border-[4px] border-purple-500 p-8 shadow-[8px_8px_0px_0px_rgba(168,85,247,0.5)] text-center">
                            <div className="text-6xl mb-4">{emoji}</div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-2">QUIZ COMPLETE</h2>
                            <div className="my-6">
                                <div className="text-6xl font-black text-purple-400">{quizScore}/{quizData.length}</div>
                                <p className="text-gray-400 text-sm font-bold uppercase mt-2">Questions Correct</p>
                            </div>
                            {/* Score bar */}
                            <div className="w-full h-4 bg-gray-800 border-[2px] border-gray-600 mb-4">
                                <div
                                    className="h-full transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${(quizScore / quizData.length) * 100}%`,
                                        background: quizScore === quizData.length ? '#22c55e' : quizScore >= 3 ? '#a855f7' : '#f97316',
                                    }}
                                />
                            </div>
                            <p className="text-purple-200 font-bold text-sm mb-6">{msg}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setQuizData(null);
                                        setQuizIndex(0);
                                        setQuizSelected(null);
                                        setQuizAnswered(false);
                                        setQuizScore(0);
                                        setQuizFinished(false);
                                    }}
                                    className="flex-1 py-3 border-[3px] border-purple-500 bg-purple-600 text-white text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] hover:bg-purple-500 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                >
                                    🔄 RETRY
                                </button>
                                <button
                                    onClick={handleQuizClose}
                                    className="flex-1 py-3 border-[3px] border-gray-600 bg-gray-800 text-gray-300 text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(75,85,99,0.5)] hover:bg-gray-700 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                >
                                    ✓ DONE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Step 4: Question Card
        if (quizData && quizData[quizIndex]) {
            const q = quizData[quizIndex];
            const progress = ((quizIndex + 1) / quizData.length) * 100;
            const labels = ['A', 'B', 'C', 'D'];

            return (
                <div className="fixed inset-0 bg-gray-950/95 z-[200] flex items-center justify-center p-6" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="w-full max-w-2xl animate-slideUp">
                        <div className="bg-gray-900 border-[4px] border-purple-500 shadow-[8px_8px_0px_0px_rgba(168,85,247,0.5)]">
                            {/* Header */}
                            <div className="bg-purple-900/50 px-6 py-4 border-b-[3px] border-purple-500 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">🧠</span>
                                    <span className="text-white font-black text-sm uppercase tracking-widest">Question {quizIndex + 1} of {quizData.length}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-300 text-xs font-bold">Score: {quizScore}</span>
                                    <button onClick={handleQuizClose} className="text-gray-400 hover:text-white text-lg font-bold transition-colors">✕</button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-gray-800">
                                <div className="h-full bg-purple-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                            </div>

                            {/* Question */}
                            <div className="px-6 py-6">
                                <p className="text-white text-lg font-bold leading-relaxed mb-6">{q.question}</p>

                                {/* Options */}
                                <div className="space-y-3">
                                    {q.options.map((opt, idx) => {
                                        let optionStyle = 'border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:border-purple-400';
                                        if (quizAnswered) {
                                            if (idx === q.correct) {
                                                optionStyle = 'border-green-500 bg-green-900/50 text-green-300';
                                            } else if (idx === quizSelected && idx !== q.correct) {
                                                optionStyle = 'border-red-500 bg-red-900/50 text-red-300';
                                            } else {
                                                optionStyle = 'border-gray-700 bg-gray-800/50 text-gray-500';
                                            }
                                        }
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(idx)}
                                                disabled={quizAnswered}
                                                className={`w-full flex items-center gap-4 px-5 py-4 border-[3px] font-bold text-sm text-left transition-all ${optionStyle} ${!quizAnswered ? 'active:translate-y-[1px] active:translate-x-[1px] cursor-pointer' : 'cursor-default'}`}
                                            >
                                                <span className={`w-8 h-8 flex items-center justify-center border-[2px] font-black text-xs shrink-0 ${quizAnswered && idx === q.correct ? 'border-green-400 bg-green-500 text-white' :
                                                    quizAnswered && idx === quizSelected && idx !== q.correct ? 'border-red-400 bg-red-500 text-white' :
                                                        'border-current'
                                                    }`}>
                                                    {quizAnswered && idx === q.correct ? '✓' : quizAnswered && idx === quizSelected && idx !== q.correct ? '✕' : labels[idx]}
                                                </span>
                                                <span>{opt}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Explanation */}
                                {quizAnswered && (
                                    <div className={`mt-5 p-4 border-[3px] ${quizSelected === q.correct
                                        ? 'border-green-500 bg-green-900/30'
                                        : 'border-orange-500 bg-orange-900/30'
                                        } animate-slideUp`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">{quizSelected === q.correct ? '✅' : '💡'}</span>
                                            <span className="font-black text-xs uppercase tracking-widest" style={{ color: quizSelected === q.correct ? '#86efac' : '#fdba74' }}>
                                                {quizSelected === q.correct ? 'CORRECT!' : 'NOT QUITE — HERE\'S WHY:'}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm font-medium leading-relaxed">{q.explanation}</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {quizAnswered && (
                                <div className="px-6 pb-6">
                                    <button
                                        onClick={handleQuizNext}
                                        className="w-full py-3 border-[3px] border-purple-500 bg-purple-600 text-white text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] hover:bg-purple-500 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                    >
                                        {quizIndex + 1 >= quizData.length ? '📊 SEE RESULTS' : '→ NEXT QUESTION'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    /* ─── Video Library Overlay Renderer ─── */

    const renderVideoOverlay = () => {
        if (videoLibraryActive && !videoGenActive) {
            return (
                <div className="fixed inset-0 bg-gray-950/95 z-[200] flex flex-col p-6 animate-fadeIn" style={{ backdropFilter: 'blur(8px)' }}>
                    {/* Header */}
                    <div className="w-full max-w-5xl mx-auto flex items-center justify-between space-x-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                                <span>🎥</span> MY VIDEO LESSONS
                            </h2>
                            <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-wider">AI-Generated Personalized Micro-Lessons</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setVideoGenActive(true)}
                                className="px-6 py-3 border-[3px] border-orange-500 bg-orange-500 hover:bg-orange-400 text-black text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(249,115,22,0.5)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                            >
                                ✨ GENERATE NEW LESSON
                            </button>
                            <button
                                onClick={() => setVideoLibraryActive(false)}
                                className="w-12 h-12 flex items-center justify-center border-[3px] border-gray-600 bg-gray-800 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-gray-700 transition-all font-bold text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Library Grid */}
                    <div className="w-full max-w-5xl mx-auto flex-1 overflow-y-auto pr-2 pb-8">
                        {videoLibraryLoading ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4 animate-pulse">
                                <div className="text-4xl">⏳</div>
                                <p className="text-white font-bold uppercase tracking-widest">Loading Library...</p>
                            </div>
                        ) : videoLessons.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4 bg-gray-900 border-[4px] border-gray-700 border-dashed">
                                <div className="text-4xl opacity-50">📂</div>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Your library is empty. Generate your first lesson!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {videoLessons.map((lesson) => (
                                    <div key={lesson.id} className="bg-gray-900 border-[4px] border-gray-700 hover:border-orange-500 flex flex-col transition-colors group shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)]">
                                        <div className="aspect-video bg-black relative border-b-[4px] border-gray-700 group-hover:border-orange-500 transition-colors">
                                            <video
                                                src={lesson.videoUrl}
                                                controls
                                                className="w-full h-full object-cover"
                                                preload="metadata"
                                            />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">{lesson.topic}</div>
                                            <h3 className="text-white font-bold text-lg mb-4 line-clamp-2 leading-snug flex-1">{lesson.title}</h3>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-gray-500 text-[10px] uppercase font-bold">
                                                    {lesson.createdAt ? new Date(lesson.createdAt.toDate?.() || Date.now()).toLocaleDateString() : 'Just now'}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteVideo(lesson.id)}
                                                    className="w-8 h-8 flex items-center justify-center border-[2px] border-red-900 bg-red-950 text-red-500 hover:bg-red-900 hover:text-red-300 transition-colors tooltip"
                                                    title="Delete Video"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (videoGenActive) {
            return (
                <div className="fixed inset-0 bg-gray-950/95 z-[210] flex items-center justify-center p-6 animate-fadeIn" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="w-full max-w-lg animate-slideUp">
                        {/* Step 0: Input */}
                        {videoGenStep === 0 && (
                            <div className="bg-gray-900 border-[4px] border-orange-500 p-8 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.5)] relative">
                                <button onClick={handleCloseVideoGen} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold z-10">✕</button>
                                <div className="text-center mb-6">
                                    <div className="text-5xl mb-3">🎬</div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">NEW VIDEO LESSON</h2>
                                    <p className="text-orange-300 text-sm mt-2 font-medium">AI will write a script and render a narrated video</p>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        value={videoTopicInput}
                                        onChange={(e) => setVideoTopicInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleStartVideoGeneration()}
                                        placeholder={selectedSubject ? `Topic (or leave blank for ${selectedSubject})` : 'Enter a topic e.g. Mitochondria'}
                                        className="w-full border-[3px] border-orange-500 bg-gray-800 text-white py-3 px-4 font-bold text-sm uppercase tracking-wide placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleStartVideoGeneration}
                                        disabled={!videoTopicInput.trim() && !selectedSubject}
                                        className="w-full py-4 border-[3px] border-orange-500 bg-orange-600 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(249,115,22,0.5)] hover:bg-orange-500 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        🚀 GENERATE VIDEO
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 1 & 2: Generating */}
                        {(videoGenStep === 1 || videoGenStep === 2) && (
                            <div className="bg-gray-900 border-[4px] border-orange-500 p-10 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.5)] text-center relative overflow-hidden">
                                {/* Animated scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent h-20 w-full animate-scanline pointer-events-none" />

                                <div className="text-6xl mb-6 animate-pulse">⚙️</div>
                                <h2 className="text-xl font-black text-white uppercase tracking-widest mb-4">
                                    {videoGenStep === 1 ? 'Writing Script...' : 'Rendering Video...'}
                                </h2>

                                <div className="w-full bg-gray-800 h-2 mb-6 border border-gray-700">
                                    <div className="h-full bg-orange-500 animate-pulse" style={{ width: videoGenStep === 1 ? '30%' : '80%' }}></div>
                                </div>

                                <p className="text-orange-300 text-sm font-bold uppercase tracking-wider mb-2">
                                    {videoGenStep === 1 ? 'Gemini is drafting the scenes' : 'JSON2Video is rendering the MP4'}
                                </p>

                                {videoGenStep === 2 && (
                                    <p className="text-gray-400 text-[10px] uppercase font-bold mt-4">
                                        This usually takes 1-3 minutes. Please do not close this window.
                                        <br /><br />
                                        Status: {videoGenProgress.status || 'starting...'} (Polled {videoGenProgress.attempts}x)
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Step 3: Done */}
                        {videoGenStep === 3 && (
                            <div className="bg-gray-900 border-[4px] border-green-500 p-6 shadow-[8px_8px_0px_0px_rgba(34,197,94,0.5)] -mt-10">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-black text-white uppercase tracking-widest text-green-400">✅ LESSON READY</h2>
                                </div>
                                <div className="border-[4px] border-green-500 bg-black aspect-video mb-6 relative">
                                    {currentVideoUrl ? (
                                        <video src={currentVideoUrl} controls autoPlay className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-red-500">Video failed to load URL.</div>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        handleCloseVideoGen();
                                    }}
                                    className="w-full py-4 border-[3px] border-green-500 bg-green-600 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] hover:bg-green-500 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                >
                                    BACK TO LIBRARY
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return null;
    };

    /* ─── Render helpers ─── */

    const renderMessage = (msg, idx) => {
        const isUser = msg.role === 'user';
        const htmlContent = !isUser ? marked.parse(msg.text) : null;

        return (
            <div
                key={idx}
                className={`message-slide-in flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div
                    className={`max-w-[80%] border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isUser
                        ? 'bg-brutal-blue'
                        : 'bg-brutal-green'
                        }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{isUser ? '🧑‍🎓' : '🤖'}</span>
                        <span className="text-[11px] font-black uppercase tracking-wider">
                            {isUser ? 'YOU' : 'MINDPOP AI'}
                        </span>
                    </div>
                    {msg.image && (
                        <img
                            src={msg.image}
                            alt="Uploaded"
                            className="max-w-full max-h-48 border-[2px] border-black mb-3 object-contain"
                        />
                    )}
                    {isUser ? (
                        <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    ) : (
                        <div
                            className="text-sm font-medium leading-relaxed prose-brutal"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    )}
                </div>
            </div>
        );
    };

    /* ─── JSX ─── */
    return (
        <div className={`w-full h-full flex overflow-hidden ${isDark ? 'bg-[#1a1a2e]' : ''}`} style={{ height: 'calc(100vh - 85px)' }}>
            {/* ────── LEFT: Chat Area (fills full height) ────── */}
            <div className="flex-1 flex flex-col min-w-0 p-4 lg:p-6 gap-3">
                {/* Header Bar */}
                <div className="bg-black text-white px-5 py-3 flex items-center justify-between border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onNavigate && onNavigate('home')}
                            className="text-white hover:text-brutal-orange transition-colors font-bold text-sm flex items-center gap-2"
                        >
                            ← BACK
                        </button>
                        <div className="w-px h-6 bg-gray-600" />
                        <span className="text-lg">🤖</span>
                        <h2 className="font-black text-sm uppercase tracking-widest">MINDPOP AI AGENT</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        {!apiReady && (
                            <span className="text-[10px] bg-brutal-pink text-black px-2 py-1 font-bold border border-black">
                                NO API KEY
                            </span>
                        )}
                        {elevenLabsReady && (
                            <span className="text-[10px] bg-brutal-green text-black px-2 py-1 font-bold border border-black">
                                ELEVENLABS ✓
                            </span>
                        )}
                        <button
                            onClick={handleClearChat}
                            className="text-[11px] font-bold uppercase bg-gray-700 hover:bg-gray-600 px-3 py-1.5 transition-colors tracking-wider"
                        >
                            CLEAR
                        </button>
                    </div>
                </div>

                {/* Motivational Tip */}
                <div className="bg-brutal-yellow border-[3px] border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between shrink-0">
                    <span className="text-xs font-bold">{MOTIVATIONAL_TIPS[tipIndex]}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                        {selectedSubject || 'ALL SUBJECTS'}
                    </span>
                </div>

                {/* Messages Area — scrolls ONLY here */}
                <div
                    ref={chatContainerRef}
                    className={`flex-1 border-[4px] ${isDark ? 'border-gray-600 bg-[#16213e]' : 'border-black bg-white'} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-y-auto p-5`}
                    style={{ minHeight: 0 }}
                >
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-70">
                            <div className="text-6xl">🤖</div>
                            <h3 className={`text-xl font-black uppercase tracking-wide ${isDark ? 'text-gray-100' : ''}`}>Hey{user?.name ? `, ${user.name}` : ''}! I'm MindPop AI</h3>
                            <p className={`text-sm font-medium max-w-md leading-relaxed ${isDark ? 'text-gray-300' : ''}`}>
                                Your personal study assistant. Ask me anything — text a question,
                                upload a photo of your notes, or use voice input. I'll help you understand
                                any topic with clear, step-by-step explanations!
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-4 max-w-sm w-full">
                                {['Explain quantum entanglement', 'Solve this integral', 'Help me with organic chem', 'What is Newton\'s 3rd law?'].map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setInputText(q); inputRef.current?.focus(); }}
                                        className={`border-[3px] ${isDark ? 'border-gray-600 bg-[#0f3460] text-gray-200 hover:bg-[#1a1a2e]' : 'border-black bg-gray-50 hover:bg-brutal-blue'} p-3 text-[11px] font-bold text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase tracking-wide`}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map(renderMessage)}
                            {isLoading && (
                                <div className="flex justify-start mb-4">
                                    <div className="bg-brutal-green border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm">🤖</span>
                                            <span className="text-[11px] font-black uppercase tracking-wider">MINDPOP AI</span>
                                        </div>
                                        <div className="typing-dots flex gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                                            <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                                            <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className={`border-[3px] ${isDark ? 'border-gray-600 bg-[#16213e] text-gray-200' : 'border-black bg-white'} p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 shrink-0`}>
                        <img src={imagePreview} alt="Preview" className="h-14 w-14 object-cover border-[2px] border-black" />
                        <span className="text-xs font-bold flex-1">Image attached — will be analyzed with your message</span>
                        <button
                            onClick={removeImage}
                            className="text-xs font-black bg-brutal-pink border-[2px] border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-400 active:translate-y-[1px] active:translate-x-[1px] active:shadow-none transition-all"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Input Bar */}
                <div className="flex gap-2 items-stretch shrink-0">
                    {/* Voice Button */}
                    <button
                        onClick={toggleListening}
                        disabled={!recognitionRef.current}
                        className={`w-11 h-11 border-[3px] ${isDark ? 'border-gray-600' : 'border-black'} flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all shrink-0 ${isListening
                            ? 'bg-brutal-pink pulse-mic'
                            : isDark ? 'bg-[#16213e] hover:bg-[#1a1a2e]' : 'bg-white hover:bg-gray-100'
                            } ${!recognitionRef.current ? 'opacity-40 cursor-not-allowed' : ''}`}
                        title={recognitionRef.current ? 'Voice input' : 'Speech recognition not supported'}
                    >
                        🎤
                    </button>

                    {/* Photo Button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-11 h-11 border-[3px] ${isDark ? 'border-gray-600 bg-[#16213e] hover:bg-[#1a1a2e]' : 'border-black bg-white hover:bg-gray-100'} flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all shrink-0`}
                        title="Upload image (photo of handwritten notes, diagrams, etc.)"
                    >
                        📷
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />

                    {/* Diagram Button */}
                    <button
                        onClick={handleImageSolution}
                        disabled={!inputText.trim() || isLoading}
                        className={`w-11 h-11 border-[3px] ${isDark ? 'border-gray-600 bg-[#16213e] hover:bg-[#1a1a2e]' : 'border-black bg-white hover:bg-gray-100'} flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed`}
                        title="Generate diagram / visual solution"
                    >
                        🎨
                    </button>

                    {/* Text Input */}
                    <input
                        ref={inputRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="ASK ANYTHING..."
                        className={`flex-1 border-[4px] ${isDark ? 'border-gray-600 bg-[#16213e] text-gray-100 placeholder-gray-500' : 'border-black bg-white placeholder-slate-400'} py-2.5 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm tracking-wide uppercase focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all min-w-0`}
                        disabled={isLoading}
                    />

                    {/* Send Button */}
                    <button
                        onClick={handleSend}
                        disabled={(!inputText.trim() && !imageData) || isLoading}
                        className="px-5 border-[3px] border-black bg-brutal-orange text-black font-black text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                        SEND
                    </button>
                </div>
            </div>

            {/* ────── RIGHT: Controls Sidebar ────── */}
            <div className={`w-[320px] shrink-0 border-l-[4px] ${isDark ? 'border-gray-600 bg-[#0f3460]' : 'border-black bg-gray-50'} overflow-y-auto p-4 space-y-4 hidden lg:block`}>

                {/* Subject & Topic Selector */}
                <section className={`border-[4px] ${isDark ? 'border-gray-600 bg-[#16213e] text-gray-100' : 'border-black bg-white'} p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                    <h3 className="text-sm font-black mb-3 uppercase tracking-wide">📚 STUDY CONTEXT</h3>
                    <div className={`h-[2px] w-full ${isDark ? 'bg-gray-600' : 'bg-black'} mb-4`} />

                    <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTopic(''); }}
                        className={`w-full border-[3px] ${isDark ? 'border-gray-600 bg-[#0f3460] text-gray-100' : 'border-black bg-white'} py-2 px-3 font-bold text-sm uppercase mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:outline-none`}
                    >
                        <option value="">All Subjects</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Topic</label>
                    <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        disabled={!selectedSubject}
                        className={`w-full border-[3px] ${isDark ? 'border-gray-600 bg-[#0f3460] text-gray-100' : 'border-black bg-white'} py-2 px-3 font-bold text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <option value="">All Topics</option>
                        {(TOPIC_MAP[selectedSubject] || []).map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </section>

                {/* Output Mode */}
                <section className={`border-[4px] ${isDark ? 'border-gray-600 bg-[#16213e] text-gray-100' : 'border-black bg-white'} p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                    <h3 className="text-sm font-black mb-3 uppercase tracking-wide">🔊 OUTPUT MODE</h3>
                    <div className={`h-[2px] w-full ${isDark ? 'bg-gray-600' : 'bg-black'} mb-4`} />
                    <div className="flex gap-2">
                        {[
                            { id: 'text', label: '📝 TEXT', color: 'bg-brutal-blue' },
                            { id: 'voice', label: '🔊 VOICE', color: 'bg-brutal-purple' },
                            { id: 'both', label: '📝+🔊', color: 'bg-brutal-orange' },
                        ].map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => {
                                    setOutputMode(mode.id);
                                    if (mode.id === 'text') stopSpeaking();
                                }}
                                className={`flex-1 py-2 border-[3px] border-black text-[10px] font-black uppercase tracking-wider transition-all ${outputMode === mode.id
                                    ? `${mode.color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                                    : `${isDark ? 'bg-[#0f3460] hover:bg-[#1a1a2e]' : 'bg-white hover:bg-gray-100'} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                                    } active:translate-y-[2px] active:translate-x-[2px] active:shadow-none`}
                            >
                                {mode.label}
                            </button>
                        ))}
                    </div>
                    {outputMode !== 'text' && (
                        <>
                            <button
                                onClick={stopSpeaking}
                                className={`w-full mt-3 py-2 border-[2px] border-black text-[10px] font-bold uppercase tracking-wider active:translate-y-[1px] active:translate-x-[1px] transition-all ${isSpeaking ? 'bg-brutal-pink hover:bg-pink-400' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                {isSpeaking ? '⏹ STOP SPEAKING' : '⏹ STOP'}
                            </button>
                            <p className="text-[9px] font-medium mt-2 text-gray-500 uppercase">
                                {elevenLabsReady ? '🎙️ Using ElevenLabs (realistic voice)' : '🔊 Using browser voice (add ElevenLabs key for realistic voice)'}
                            </p>
                        </>
                    )}
                </section>

                {/* PDF Notes Generator */}
                <section className="border-[4px] border-black bg-brutal-purple text-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-sm font-black mb-2 uppercase tracking-wide">📄 PDF NOTES</h3>
                    <p className="text-[11px] font-medium mb-4 leading-relaxed opacity-90">
                        Generate study notes for any subject & topic. Save as PDF!
                    </p>
                    <button
                        onClick={handleGenerateNotes}
                        disabled={notesLoading || !apiReady}
                        className="w-full py-3 border-[3px] border-black bg-white text-black text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {notesLoading ? 'GENERATING...' : '📝 GENERATE NOTES'}
                    </button>
                </section>

                {/* 🎥 Video Lessons Section */}
                <section className="border-[4px] border-black bg-gradient-to-br from-orange-500 to-amber-600 text-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-sm font-black mb-2 uppercase tracking-wide">🎥 VIDEO LESSONS</h3>
                    <p className="text-[11px] font-medium mb-4 leading-relaxed opacity-90">
                        AI-generated video lessons on any topic with voiceover.
                    </p>
                    <div className="space-y-2">
                        <button
                            onClick={handleOpenVideoLibrary}
                            disabled={!apiReady}
                            className="w-full py-3 border-[3px] border-black bg-white text-black text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            📂 MY VIDEO LIBRARY
                        </button>
                        <button
                            onClick={() => { setVideoLibraryActive(true); setVideoGenActive(true); }}
                            disabled={!apiReady}
                            className="w-full py-3 border-[3px] border-black bg-black text-white text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:bg-gray-900 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ✨ GENERATE NEW VIDEO
                        </button>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className={`border-[4px] ${isDark ? 'border-gray-600 bg-[#16213e] text-gray-100' : 'border-black bg-white'} p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                    <h3 className="text-sm font-black mb-3 uppercase tracking-wide">⚡ QUICK ACTIONS</h3>
                    <div className={`h-[2px] w-full ${isDark ? 'bg-gray-600' : 'bg-black'} mb-4`} />
                    <div className="space-y-2">
                        {[
                            { icon: '📖', label: 'EXPLAIN A CONCEPT', prompt: 'Explain the concept of ' },
                            { icon: '🧮', label: 'SOLVE A PROBLEM', prompt: 'Solve step-by-step: ' },
                            { icon: '📋', label: 'SUMMARIZE A CHAPTER', prompt: 'Summarize the chapter on ' },
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => { setInputText(action.prompt); inputRef.current?.focus(); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 border-[3px] ${isDark ? 'border-gray-600 bg-[#0f3460] hover:bg-[#1a1a2e]' : 'border-black bg-gray-50 hover:bg-brutal-yellow'} font-bold text-[10px] uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-left`}
                            >
                                <span className="text-base">{action.icon}</span>
                                {action.label}
                            </button>
                        ))}
                        {/* Quiz Me — opens the quiz overlay */}
                        <button
                            onClick={() => setQuizActive(true)}
                            disabled={!apiReady}
                            className="w-full flex items-center gap-3 px-3 py-2.5 border-[3px] border-purple-700 bg-purple-100 hover:bg-purple-200 font-bold text-[10px] uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(88,28,135,0.6)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-left disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span className="text-base">❓</span>
                            QUIZ ME
                        </button>

                    </div>
                </section>

                {/* Input Guide */}
                <section className="border-[4px] border-black bg-brutal-green p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-sm font-black mb-2 uppercase tracking-wide">🎯 HOW TO USE</h3>
                    <ul className="text-[10px] font-bold space-y-1.5 leading-relaxed">
                        <li>📝 Type your question in the input box</li>
                        <li>🎤 Click mic for voice input</li>
                        <li>📷 Upload a photo of handwritten notes</li>
                        <li>🎨 Type a topic + click palette for diagrams</li>
                        <li>📄 Use PDF generator for study notes</li>
                        <li>🔊 Switch output mode for voice replies</li>
                    </ul>
                </section>
            </div>

            {/* ────── NOTES MODAL ────── */}
            {showNotesModal && (
                <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-6 animate-fadeIn">
                    <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl max-h-[85vh] flex flex-col animate-slideUp">
                        {/* Modal Header */}
                        <div className="bg-brutal-purple text-white px-6 py-4 flex items-center justify-between border-b-[4px] border-black">
                            <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                                <span>📄</span> Study Notes: {selectedSubject || 'General'} — {selectedTopic || 'Overview'}
                            </h3>
                            <button
                                onClick={() => setShowNotesModal(false)}
                                className="text-white hover:text-brutal-yellow font-black text-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8 bg-white selection:bg-purple-200">
                            {notesLoading ? (
                                <div className="flex flex-col items-center justify-center h-64 gap-4">
                                    <div className="typing-dots flex gap-2">
                                        <span className="w-4 h-4 bg-brutal-purple rounded-full"></span>
                                        <span className="w-4 h-4 bg-brutal-purple rounded-full"></span>
                                        <span className="w-4 h-4 bg-brutal-purple rounded-full"></span>
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-wider text-black">Generating your notes...</p>
                                </div>
                            ) : (
                                <div
                                    className="prose-brutal text-sm leading-relaxed max-w-none"
                                    dangerouslySetInnerHTML={{ __html: marked.parse(notesContent) }}
                                />
                            )}
                        </div>

                        {/* Modal Footer */}
                        {!notesLoading && notesContent && (
                            <div className="px-6 py-5 border-t-[4px] border-black flex flex-wrap gap-4 bg-gray-50">
                                <button
                                    onClick={handlePrintNotes}
                                    className="flex-1 min-w-[200px] py-4 border-[3px] border-black bg-brutal-orange text-black text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-300 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                >
                                    🖨️ PRINT / SAVE AS PDF
                                </button>
                                <button
                                    onClick={() => {
                                        setVideoTopicInput(`Summary of ${selectedTopic || selectedSubject || 'these notes'}`);
                                        setVideoLibraryActive(true);
                                        setVideoGenActive(true);
                                        setShowNotesModal(false);
                                    }}
                                    className="flex-1 min-w-[200px] py-4 border-[3px] border-black bg-black text-white text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:bg-gray-800 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                >
                                    🎥 CREATE VIDEO LESSON
                                </button>
                                <button
                                    onClick={() => setShowNotesModal(false)}
                                    className="px-8 py-4 border-[3px] border-black bg-white text-[12px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
                                >
                                    CLOSE
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ────── QUIZ OVERLAY ────── */}
            {renderQuizOverlay()}

            {/* ────── VIDEO LIBRARY & GEN OVERLAY ────── */}
            {renderVideoOverlay()}
        </div>
    );
};

export default AiAgent;
