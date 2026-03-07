/**
 * AI Service — Gemini API integration for MindPop AI Agent
 *
 * Handles: text chat, vision/OCR, notes generation, image solutions.
 * API key read from VITE_GEMINI_API_KEY env var.
 * Maintains a sliding context window of the last 20 user-model exchanges.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

/** Maximum conversation turns (user+model pairs) to keep in context */
const MAX_CONTEXT_TURNS = 20;

let genAI = null;
let chatHistory = []; // Managed history for sliding window

/* ─── helpers ─── */

const getGenAI = () => {
    if (!API_KEY) throw new Error('GEMINI_API_KEY_MISSING');
    if (!genAI) genAI = new GoogleGenerativeAI(API_KEY);
    return genAI;
};

const SYSTEM_PROMPT = (displayName) => `You are MindPop AI — an enthusiastic, supportive study tutor for students. you are talking to ${displayName}.
RULES:
• Always be encouraging and motivational. End every response with a short motivational line.
• Keep explanations precise, clear, and easy to understand.
• Use bullet points, numbered steps, and examples.
• use the name ${displayName} in your responses.
• If the student shares a photo of handwritten work, read the handwriting carefully (OCR), then solve or explain.
• When solving math/science problems, show step-by-step working.
• Use simple language; define jargon when you must use it.
• If a subject & topic context is provided, keep answers within that scope.
• Use emojis sparingly to keep the tone friendly (max 2 per response).
• **Conversational Style**: Occasionally use natural conversational markers like "Hmm...", "Let's see...", "Aha!", or "Got it!" to make voice interactions feel more human.`;

const SYSTEM_HISTORY = [
    {
        role: 'user',
        parts: [{ text: 'System instructions: ' + SYSTEM_PROMPT }],
    },
    {
        role: 'model',
        parts: [{ text: "Got it! I'm MindPop AI, your study buddy. Ask me anything — let's crush it! 💪" }],
    },
];

let currentSubject = '';
let currentTopic = '';
let currentModel = null;

/* ─── public API ─── */

/**
 * Start (or restart) a chat session.
 * Clears the conversation history.
 */
export function initializeChat(subject, topic) {
    const ai = getGenAI();
    currentModel = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });
    currentSubject = subject || '';
    currentTopic = topic || '';
    chatHistory = []; // Reset conversation
    return true;
}

/**
 * Build context-aware history with sliding window of last MAX_CONTEXT_TURNS exchanges.
 */
function buildHistory() {
    let contextNote = '';
    if (currentSubject) contextNote += `\nThe student is currently studying: ${currentSubject}.`;
    if (currentTopic) contextNote += ` Focused topic: ${currentTopic}.`;

    const systemHistory = contextNote
        ? [
            { role: 'user', parts: [{ text: 'System instructions: ' + SYSTEM_PROMPT + contextNote }] },
            { role: 'model', parts: [{ text: "Got it! I'm MindPop AI, your study buddy. Ask me anything — let's crush it! 💪" }] },
        ]
        : SYSTEM_HISTORY;

    // Sliding window: keep last MAX_CONTEXT_TURNS * 2 entries (each turn = user + model)
    const maxEntries = MAX_CONTEXT_TURNS * 2;
    const trimmed = chatHistory.length > maxEntries
        ? chatHistory.slice(chatHistory.length - maxEntries)
        : chatHistory;

    return [...systemHistory, ...trimmed];
}

/**
 * Send a text message (optionally with an image for OCR / vision).
 * Maintains conversation context for the last 20 exchanges.
 */
export async function sendMessage(text, imageBase64, mimeType) {
    if (!currentModel) initializeChat();

    const history = buildHistory();
    const chat = currentModel.startChat({ history });

    const parts = [];
    if (imageBase64) {
        parts.push({
            inlineData: { data: imageBase64, mimeType: mimeType || 'image/jpeg' },
        });
        const ocrHint =
            text && text.trim()
                ? text
                : 'Please read the handwritten/printed text in this image, then explain or solve it step by step.';
        parts.push({ text: ocrHint });
    } else {
        parts.push({ text });
    }

    const result = await chat.sendMessage(parts);
    const response = await result.response;
    const replyText = response.text();

    // Add to managed history (text-only parts for context, skip inline image data)
    chatHistory.push(
        { role: 'user', parts: [{ text: text || '(Image uploaded for analysis)' }] },
        { role: 'model', parts: [{ text: replyText }] }
    );

    return replyText;
}

/**
 * Generate structured study notes for a subject + topic.
 * Returns markdown string suitable for PDF rendering.
 */
export async function generateNotes(subject, topic) {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Generate comprehensive, well-structured study notes for:
Subject: ${subject || 'General'}
Topic: ${topic || 'Overview'}

FORMAT REQUIREMENTS:
• Use Markdown with clear headings (##, ###).
• Start with a brief introduction.
• Include key concepts with clear definitions.
• Add important formulas / rules (if applicable).
• Include 2-3 solved examples.
• End with "Quick Revision Points" as bullet list.
• Keep it concise but thorough — target 800-1200 words.
• Add a motivational closing line.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

/**
 * Ask Gemini to generate a diagram / visual solution.
 * Uses the conversation context.
 */
export async function generateImageSolution(prompt) {
    if (!currentModel) initializeChat();

    const history = buildHistory();
    const chat = currentModel.startChat({ history });

    const enhancedPrompt = `${prompt}

Please provide a detailed visual/diagrammatic explanation. Describe the diagram step-by-step so it can be visualized. Use ASCII art or structured layout if helpful.`;

    const result = await chat.sendMessage(enhancedPrompt);
    const response = await result.response;
    const replyText = response.text();

    chatHistory.push(
        { role: 'user', parts: [{ text: prompt }] },
        { role: 'model', parts: [{ text: replyText }] }
    );

    return replyText;
}

/**
 * Quick health-check — returns true if API key is configured.
 */
export function isConfigured() {
    return Boolean(API_KEY);
}

/**
 * Reset conversation history without re-initializing.
 */
export function clearHistory() {
    chatHistory = [];
}

/* ─── Quiz Generation ─── */

/**
 * Generate an interactive quiz (5 MCQ questions) via Gemini.
 * Returns an array of { question, options, correct, explanation }.
 */
export async function generateQuiz(subject, topic, customTopic) {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const quizTopic = customTopic || `${subject || 'General Knowledge'}${topic ? ' — ' + topic : ''}`;

    const prompt = `Generate exactly 5 multiple-choice quiz questions on the topic: "${quizTopic}".

RULES:
• Each question must have exactly 4 options (A, B, C, D).
• The "correct" field is the 0-based index of the correct option.
• The "explanation" should be 1-2 sentences explaining WHY the correct answer is right.
• Make questions progressively harder (easy → medium → hard).
• Keep language clear and student-friendly.

RESPOND WITH ONLY a valid JSON array, no markdown fences, no extra text. Example format:
[{"question":"What is 2+2?","options":["3","4","5","6"],"correct":1,"explanation":"2+2 equals 4, a basic addition fact."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Strip markdown code fences if Gemini wraps them
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

    try {
        const questions = JSON.parse(text);
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('Invalid quiz format');
        }
        return questions;
    } catch (e) {
        console.error('Quiz parse error:', e, 'Raw text:', text);
        throw new Error('Failed to generate quiz. Please try again.');
    }
}

/* ─── ElevenLabs Voice ─── */

const ELEVENLABS_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // "Rachel" — natural female voice

/**
 * Check if ElevenLabs is configured.
 */
export function isElevenLabsConfigured() {
    return Boolean(ELEVENLABS_API_KEY);
}

/**
 * Speak text using ElevenLabs Text-to-Speech API.
 * Returns an audio Blob that can be played.
 * Falls back to browser SpeechSynthesis if ElevenLabs key is missing.
 */
export async function speakWithElevenLabs(text) {
    if (!ELEVENLABS_API_KEY) {
        // Fallback to browser speech
        return null;
    }

    const cleanText = text
        .replace(/[#*_`~>\-|]/g, '')
        .replace(/\n+/g, '. ')
        .slice(0, 4000); // ElevenLabs has char limits

    const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: cleanText,
                model_id: 'eleven_turbo_v2_5',
                voice_settings: {
                    stability: 0.4,
                    similarity_boost: 0.8,
                    style: 0.0,
                    use_speaker_boost: true,
                },
            }),
        }
    );

    if (!response.ok) {
        console.error('ElevenLabs TTS error:', response.status);
        return null;
    }

    const blob = await response.blob();
    return blob;
}
