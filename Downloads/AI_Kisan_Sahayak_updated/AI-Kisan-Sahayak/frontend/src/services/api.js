import { answerQuestion, demoAnalyze } from "./local";

/**
 * Backend switch. Leave VITE_API_URL empty to run on built-in demo data.
 * Set it (see .env.example) to send requests to your own server.
 *
 * Expected responses
 *   POST /api/analyze  (multipart: image, crop, lang)
 *     -> { name, severity: "none|mild|moderate|severe", health: 0-100,
 *          confidence: 0-100, symptoms: string[], actions: string[],
 *          prevention: string[] }
 *   POST /api/chat     (json: { message, lang })
 *     -> { reply: string, link?: { label, url } }
 */
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const isDemo = API_URL === "";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeCrop({ file, crop, lang }) {
  if (!isDemo) {
    const body = new FormData();
    body.append("image", file);
    body.append("crop", crop);
    body.append("lang", lang);
    const res = await fetch(`${API_URL}/api/analyze`, { method: "POST", body });
    if (!res.ok) throw new Error(`Analyze failed with status ${res.status}`);
    const data = await res.json();
    return { ...data, crop, demo: false };
  }
  await sleep(1800);
  return demoAnalyze(file, crop);
}

export async function askAssistant(message, lang) {
  if (!isDemo) {
    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lang }),
    });
    if (!res.ok) throw new Error(`Chat failed with status ${res.status}`);
    const data = await res.json();
    return { text: data.reply, link: data.link ?? null, lang };
  }
  await sleep(700);
  return answerQuestion(message, lang);
}
