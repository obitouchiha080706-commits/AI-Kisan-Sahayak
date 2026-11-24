import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { useLang } from "../i18n/context";
import { askAssistant, isDemo } from "../services/api";
import "./chat.css";

const SpeechRecognition =
  typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : undefined;
const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

const SUGGESTIONS = ["home.q1", "home.q2", "home.q3", "home.q4"];

/** Lines that start with a bullet become list items, other lines stay paragraphs. */
function Formatted({ text }) {
  const blocks = [];
  let list = [];
  const flush = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };
  text.split("\n").forEach((line) => {
    if (line.startsWith("• ")) list.push(line.slice(2));
    else {
      flush();
      if (line.trim()) blocks.push({ type: "p", text: line });
    }
  });
  flush();

  return blocks.map((b, i) =>
    b.type === "list" ? (
      <ul key={i}>
        {b.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p key={i}>{b.text}</p>
    ),
  );
}

export default function Chat() {
  const { t, lang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  // A question sent from another page (home chips, scanner) arrives in router state.
  const [initialAsk] = useState(() => location.state?.ask?.trim() || "");
  const [messages, setMessages] = useState(() =>
    initialAsk ? [{ id: 1, role: "user", text: initialAsk }] : [],
  );
  const [thinking, setThinking] = useState(Boolean(initialAsk));
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const nextId = useRef(2);
  const listRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!initialAsk) return undefined;
    let cancelled = false;
    askAssistant(initialAsk, lang)
      .then((reply) => {
        if (cancelled) return;
        setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", ...reply }]);
      })
      .catch(() => {
        if (cancelled) return;
        setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", text: t("chat.error") }]);
      })
      .finally(() => {
        if (!cancelled) setThinking(false);
      });
    navigate(location.pathname, { replace: true, state: null });
    return () => {
      cancelled = true;
    };
    // Runs once for the question that opened this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAsk]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (canSpeak) window.speechSynthesis.cancel();
    };
  }, []);

  async function send(raw) {
    const text = raw.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((prev) => [...prev, { id: nextId.current++, role: "user", text }]);
    setThinking(true);
    try {
      const reply = await askAssistant(text, lang);
      setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", ...reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", text: t("chat.error") }]);
    } finally {
      setThinking(false);
    }
  }

  function toggleMic() {
    if (!SpeechRecognition) return;
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
    rec.interimResults = false;
    rec.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${spoken}` : spoken));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }

  function speak(text, replyLang) {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/•/g, ""));
    utterance.lang = replyLang === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  }

  function clearChat() {
    if (canSpeak) window.speechSynthesis.cancel();
    setMessages([]);
  }

  return (
    <section className="container narrow chat-page">
      <header className="page-head">
        <h1>{t("chat.title")}</h1>
        <p className="lead">{t("chat.sub")}</p>
      </header>

      {isDemo && (
        <p className="banner banner-demo" role="note">
          <Icon name="info" size={20} />
          {t("chat.demo")}
        </p>
      )}

      <div className="chat-card">
        <div className="chat-list" ref={listRef} role="log" aria-live="polite" aria-label={t("chat.title")}>
          <div className="msg msg-bot">
            <div className="bubble">
              <p>{t("chat.greeting")}</p>
            </div>
          </div>

          {messages.length === 0 && (
            <div className="suggest">
              <p className="muted">{t("chat.suggest")}</p>
              <div className="chip-row">
                {SUGGESTIONS.map((key) => (
                  <button key={key} type="button" className="chip" onClick={() => send(t(key))}>
                    {t(key)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`msg ${m.role === "user" ? "msg-user" : "msg-bot"}`}>
              <div className="bubble">
                {m.role === "user" ? <p>{m.text}</p> : <Formatted text={m.text} />}
                {m.role === "bot" && (m.link || canSpeak) && (
                  <div className="bubble-actions">
                    {m.link && (
                      <a href={m.link.url} target="_blank" rel="noopener noreferrer" className="text-link">
                        {m.link.label}
                        <Icon name="external" size={16} />
                      </a>
                    )}
                    {canSpeak && (
                      <button type="button" className="text-link" onClick={() => speak(m.text, m.lang ?? lang)}>
                        <Icon name="volume" size={16} />
                        {t("chat.listen")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="msg msg-bot" role="status">
              <div className="bubble typing">
                <span className="sr-only">{t("chat.thinking")}</span>
                <i />
                <i />
                <i />
              </div>
            </div>
          )}
        </div>

        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          {SpeechRecognition && (
            <button
              type="button"
              className={`icon-btn ${listening ? "icon-btn-on" : ""}`}
              onClick={toggleMic}
              aria-pressed={listening}
              aria-label={listening ? t("chat.micStop") : t("chat.mic")}
            >
              <Icon name="mic" size={22} />
            </button>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? t("chat.listening") : t("chat.placeholder")}
            aria-label={t("chat.placeholder")}
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary" disabled={!input.trim() || thinking}>
            <Icon name="send" size={20} />
            <span className="send-label">{t("chat.send")}</span>
          </button>
        </form>
      </div>

      {messages.length > 0 && (
        <button type="button" className="btn btn-ghost btn-small clear-chat" onClick={clearChat}>
          <Icon name="trash" size={18} />
          {t("chat.clear")}
        </button>
      )}
    </section>
  );
}
