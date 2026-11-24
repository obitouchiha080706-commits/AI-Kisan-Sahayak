import { pickText } from "../i18n/context";
import { DISEASES, HEALTHY } from "../data/diseases";
import { FALLBACK, GREETING, GREETING_KEYWORDS, TOPICS } from "../data/knowledge";

/* ---------- Chat: keyword matching over the built-in guide ---------- */

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isPlainLatin = (s) => /^[a-z0-9 \-]+$/i.test(s);

/** Latin keywords match whole words, Devanagari keywords match anywhere. */
function compile(keywords) {
  return keywords.map((k) => {
    const key = k.toLowerCase();
    return isPlainLatin(key) ? new RegExp(`(^|[^a-z0-9])${escapeRegex(key)}([^a-z0-9]|$)`, "i") : key;
  });
}

const compiledTopics = TOPICS.map((topic) => ({ topic, matchers: compile(topic.keywords) }));
const greetingMatchers = compile(GREETING_KEYWORDS);

function score(matchers, text) {
  let n = 0;
  for (const m of matchers) {
    if (typeof m === "string" ? text.includes(m) : m.test(text)) n += 1;
  }
  return n;
}

export const hasDevanagari = (text) => /[\u0900-\u097F]/.test(text);

/** Replies in Hindi when the question is written in Devanagari, else in the UI language. */
export function answerQuestion(question, uiLang) {
  const lang = hasDevanagari(question) ? "hi" : uiLang;
  const text = question.toLowerCase();

  let best = null;
  let bestScore = 0;
  for (const entry of compiledTopics) {
    const s = score(entry.matchers, text);
    if (s > bestScore) {
      best = entry.topic;
      bestScore = s;
    }
  }

  if (best) {
    return {
      text: pickText(best.answer, lang),
      link: best.link ? { label: pickText(best.link.label, lang), url: best.link.url } : null,
      lang,
    };
  }
  if (score(greetingMatchers, text) > 0) return { text: pickText(GREETING, lang), link: null, lang };
  return { text: pickText(FALLBACK, lang), link: null, lang };
}

/* ---------- Scanner: deterministic demo result ---------- */

function hashFile(file) {
  let h = 7;
  const seed = `${file.name}|${file.size}|${file.lastModified}`;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Picks a sample result for the chosen crop. The same photo always gives the
 * same result, so the demo does not look random. This is NOT a diagnosis.
 */
export function demoAnalyze(file, cropId) {
  const h = hashFile(file);
  const pool = cropId === "other" ? DISEASES : DISEASES.filter((d) => d.crop === cropId);
  const options = [...pool, HEALTHY];
  const pick = options[h % options.length];
  const confidence = 72 + (h % 19); // 72 to 90
  const health = Math.max(20, Math.min(98, pick.health + ((h >> 3) % 9) - 4));

  return {
    diseaseId: pick.id,
    crop: cropId,
    name: pick.name,
    severity: pick.severity,
    health,
    confidence,
    symptoms: pick.symptoms,
    actions: pick.actions,
    prevention: pick.prevention,
    demo: true,
  };
}
