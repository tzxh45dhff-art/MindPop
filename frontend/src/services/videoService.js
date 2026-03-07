/**
 * Video Generation Service
 * Orchestrates Gemini (script) -> JSON2Video API (render) -> MP4 URL
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const JSON2VIDEO_API_KEY = import.meta.env.VITE_JSON2VIDEO_API_KEY || 'rAN9nTNLPZ0dccn81G80ZJscDCsFeJ4T7BIhUa2H'; // Fallback to provided key

// Helper to delay polling
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Step 1: Generate the Script/Payload using Gemini
 * We instruct Gemini to output EXACTLY the JSON schema required by JSON2Video.
 */
export async function generateVideoScript(subject, topic, customTopic) {
  if (!GEMINI_API_KEY) throw new Error("Gemini API Key missing");

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const promptTopic = customTopic || `${subject || 'General'} — ${topic || 'Overview'}`;

  const prompt = `You are an educational video producer. 
Create a short, engaging 3-scene video lesson about: "${promptTopic}".

Output EXACTLY a valid JSON object following the JSON2Video API schema. 
DO NOT wrap the JSON in markdown blocks (e.g. no \`\`\`json). Just the raw JSON object.

Requirements:
- resolution: "vertical"
- quality: "low" (for faster rendering)
- Keep the voiceover short and engaging.
- Use a solid background color for the scenes.

Follow this exact JSON structure outline:
{
  "resolution": "vertical",
  "quality": "low",
  "scenes": [
    {
      "comment": "Scene 1: Intro",
      "background-color": "#1a1a2e",
      "elements": [
        {
          "type": "text",
          "text": "Topic Title Here",
          "style": "title",
          "settings": { "font-size": "80px", "color": "#a855f7", "y": "30vh" }
        },
        {
          "type": "voice",
          "voice": "en-US-JennyNeural",
          "extra": {
             "text": "Welcome to MindPop! Today we are learning about..."
          }
        }
      ]
    },
    {
      "comment": "Scene 2: Concept",
      "background-color": "#16213e",
      "elements": [
        {
          "type": "text",
          "text": "Key Concept Here",
          "settings": { "font-size": "60px", "color": "#ffffff", "y": "40vh" }
        },
        {
          "type": "voice",
          "voice": "en-US-JennyNeural",
          "extra": {
             "text": "The main idea is that..."
          }
        }
      ]
    },
    {
      "comment": "Scene 3: Outro",
      "background-color": "#0f3460",
      "elements": [
        {
          "type": "text",
          "text": "Keep Learning!",
          "settings": { "font-size": "70px", "color": "#f97316", "y": "40vh" }
        },
        {
          "type": "voice",
          "voice": "en-US-JennyNeural",
          "extra": {
             "text": "Keep practicing and you'll master this in no time."
          }
        }
      ]
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text().trim();

  // Strip markdown code fences if Gemini wraps them
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

  try {
    const payload = JSON.parse(text);
    if (!payload.scenes) {
      throw new Error("Missing scenes array in generated JSON");
    }
    return payload;
  } catch (e) {
    console.error('Video script parse error:', e, 'Raw text:', text);
    throw new Error("AI generated invalid script format. Please try again.");
  }
}

/**
 * Step 2: Push JSON to JSON2Video API to start rendering
 */
export async function createVideoProject(jsonPayload) {
  const response = await fetch('/api/json2video/v2/movies', {
    method: 'POST',
    headers: {
      'x-api-key': JSON2VIDEO_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonPayload)
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to start video rendering");
  }

  return data.project; // Returns the Project ID needed for polling
}

/**
 * Step 3: Poll the API until the video is 'done' or 'error'
 */
export async function pollVideoStatus(projectId, progressCallback) {
  const maxAttempts = 60; // Max 5 minutes (60 * 5s)
  let attempts = 0;

  while (attempts < maxAttempts) {
    attempts++;

    const response = await fetch(`/api/json2video/v2/movies?project=${projectId}`, {
      headers: {
        'x-api-key': JSON2VIDEO_API_KEY
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to poll video status");
    }

    const movie = data.movie;

    if (progressCallback) {
      progressCallback(movie.status, attempts); // Optional callback to update UI
    }

    if (movie.status === 'done') {
      return movie.url; // The final MP4 URL
    }

    if (movie.status === 'error') {
      throw new Error(movie.message || "Video rendering failed on the server.");
    }

    // Wait 5 seconds before checking again
    await delay(5000);
  }

  throw new Error("Video rendering timed out. Please check your JSON2Video dashboard.");
}
