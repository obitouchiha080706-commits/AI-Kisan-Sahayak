import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { CROPS } from "../data/diseases";
import { useLang } from "../i18n/context";
import { analyzeCrop, isDemo } from "../services/api";
import "./scanner.css";

const MAX_BYTES = 10 * 1024 * 1024;
const HISTORY_KEY = "kisan-scan-history";
const HISTORY_LIMIT = 5;

const SEVERITY_TONE = { none: "good", mild: "warn", moderate: "alert", severe: "bad" };

function loadHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveHistory(items) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch {
    /* storage full or blocked: history is a convenience, so ignore */
  }
}

/** Small JPEG thumbnail so history stays light in storage. */
function makeThumb(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = 96 / Math.max(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.6));
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function HealthRing({ value, tone }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className={`ring ring-${tone}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} className="ring-track" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="ring-value"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <strong>{value}%</strong>
    </div>
  );
}

export default function CropScanner() {
  const { t, tr, lang } = useLang();
  const navigate = useNavigate();

  const [crop, setCrop] = useState("other");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | analyzing | done
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState("");
  const [history, setHistory] = useState(loadHistory);

  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  // Revokes the previous object URL whenever the preview changes or the page closes.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(id);
  }, [notice]);

  const cropName = (id) => tr(CROPS.find((c) => c.id === id)?.name ?? id);

  function acceptFile(next) {
    if (!next) return;
    if (!next.type.startsWith("image/")) {
      setError(t("scan.errType"));
      return;
    }
    if (next.size > MAX_BYTES) {
      setError(t("scan.errSize"));
      return;
    }
    setError("");
    setFile(next);
    setPreview(URL.createObjectURL(next));
    setResult(null);
    setStatus("idle");
  }

  function onPick(event) {
    acceptFile(event.target.files?.[0]);
    event.target.value = ""; // lets the same photo be chosen again
  }

  function onDrop(event) {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  }

  async function analyze() {
    if (!file) return;
    setStatus("analyzing");
    setError("");
    try {
      const data = await analyzeCrop({ file, crop, lang });
      setResult(data);
      setStatus("done");

      const thumb = await makeThumb(preview);
      const entry = {
        id: Date.now(),
        crop,
        name: data.name,
        severity: data.severity,
        health: data.health,
        thumb,
      };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, HISTORY_LIMIT);
        saveHistory(next);
        return next;
      });
    } catch {
      setError(t("scan.errGeneric"));
      setStatus("idle");
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setStatus("idle");
    setError("");
  }

  function clearHistory() {
    setHistory([]);
    saveHistory([]);
  }

  function askAboutResult() {
    const name = tr(result.name);
    const plant = cropName(result.crop ?? crop);
    const question =
      lang === "hi"
        ? `${plant} में ${name} हो तो मुझे क्या करना चाहिए?`
        : `My ${plant} may have ${name}. What should I do?`;
    navigate("/chat", { state: { ask: question } });
  }

  async function shareResult() {
    const lines = [
      `${t("brand")}`,
      `${t("scan.crop.label")}: ${cropName(result.crop ?? crop)}`,
      `${tr(result.name)} (${t(`scan.sev.${result.severity}`)})`,
      "",
      `${t("scan.actions")}:`,
      ...tr(result.actions).map((a) => `- ${a}`),
    ];
    const text = lines.join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: t("brand"), text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setNotice(t("scan.copied"));
    } catch {
      /* the person closed the share sheet, nothing to do */
    }
  }

  const tone = result ? SEVERITY_TONE[result.severity] ?? "warn" : "good";

  return (
    <section className="container scanner">
      <header className="page-head">
        <h1>{t("scan.title")}</h1>
        <p className="lead">{t("scan.sub")}</p>
      </header>

      {isDemo && (
        <p className="banner banner-demo" role="note">
          <Icon name="info" size={20} />
          {t("scan.demo")}
        </p>
      )}

      <div className="scanner-grid">
        <div className="panel">
          <h2 className="panel-title">{t("scan.step1")}</h2>
          <div className="chip-row" role="radiogroup" aria-label={t("scan.step1")}>
            {CROPS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={crop === c.id}
                className={`chip ${crop === c.id ? "chip-on" : ""}`}
                onClick={() => setCrop(c.id)}
              >
                {tr(c.name)}
              </button>
            ))}
          </div>

          <h2 className="panel-title">{t("scan.step2")}</h2>
          <div
            className={`dropzone ${dragging ? "dropzone-over" : ""} ${preview ? "dropzone-filled" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            {preview ? (
              <img src={preview} alt="" className="preview" />
            ) : (
              <div className="drop-empty">
                <Icon name="leaf" size={44} />
                <p>{t("scan.drop")}</p>
              </div>
            )}
            {status === "analyzing" && <div className="scan-sweep" aria-hidden="true" />}
          </div>

          <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={onPick} hidden />
          <input ref={galleryRef} type="file" accept="image/*" onChange={onPick} hidden />

          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={() => cameraRef.current?.click()}>
              <Icon name="scan" size={20} />
              {t("scan.takePhoto")}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => galleryRef.current?.click()}>
              <Icon name="image" size={20} />
              {t("scan.gallery")}
            </button>
          </div>

          {error && (
            <p className="banner banner-error" role="alert">
              <Icon name="alert" size={20} />
              {error}
            </p>
          )}

          {file && status !== "done" && (
            <button
              type="button"
              className="btn btn-accent btn-wide"
              onClick={analyze}
              disabled={status === "analyzing"}
            >
              {status === "analyzing" ? t("scan.analyzing") : t("scan.analyze")}
            </button>
          )}

          {status === "analyzing" && (
            <p className="muted" role="status">
              {t("scan.analyzingSub")}
            </p>
          )}
        </div>

        <div className="side">
          {result ? (
            <article className="panel result" aria-live="polite">
              <div className="result-head">
                <HealthRing value={result.health} tone={tone} />
                <div>
                  <p className="muted">{cropName(result.crop ?? crop)}</p>
                  <h2>{tr(result.name)}</h2>
                  <span className={`pill pill-${tone}`}>
                    {t("scan.severity")}: {t(`scan.sev.${result.severity}`)}
                  </span>
                </div>
              </div>

              <dl className="facts">
                <div>
                  <dt>{t("scan.health")}</dt>
                  <dd>{result.health}%</dd>
                </div>
                <div>
                  <dt>{t("scan.confidence")}</dt>
                  <dd>{result.confidence}%</dd>
                </div>
              </dl>

              <div className="bar" aria-hidden="true">
                <span style={{ width: `${result.confidence}%` }} />
              </div>

              {[
                ["scan.symptoms", "symptoms"],
                ["scan.actions", "actions"],
                ["scan.prevention", "prevention"],
              ].map(([title, field]) => (
                <section key={field} className="result-block">
                  <h3>{t(title)}</h3>
                  <ul>
                    {tr(result[field]).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </section>
              ))}

              <p className="banner banner-warn">
                <Icon name="alert" size={20} />
                {t("scan.disclaimer")}
              </p>

              <div className="btn-row">
                <button type="button" className="btn btn-primary" onClick={askAboutResult}>
                  <Icon name="chat" size={20} />
                  {t("scan.askAi")}
                </button>
                <button type="button" className="btn btn-outline" onClick={shareResult}>
                  <Icon name="share" size={20} />
                  {t("scan.share")}
                </button>
                <button type="button" className="btn btn-ghost" onClick={reset}>
                  <Icon name="refresh" size={20} />
                  {t("scan.newScan")}
                </button>
              </div>
              {notice && (
                <p className="muted" role="status">
                  {notice}
                </p>
              )}
            </article>
          ) : (
            <aside className="panel tips">
              <h2 className="panel-title">{t("scan.tips.title")}</h2>
              <ul>
                {[1, 2, 3, 4].map((n) => (
                  <li key={n}>
                    <Icon name="check" size={18} />
                    {t(`scan.tip${n}`)}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {history.length > 0 && (
            <aside className="panel history">
              <div className="history-head">
                <h2 className="panel-title">
                  <Icon name="history" size={20} />
                  {t("scan.history")}
                </h2>
                <button type="button" className="btn btn-ghost btn-small" onClick={clearHistory}>
                  <Icon name="trash" size={18} />
                  {t("scan.history.clear")}
                </button>
              </div>
              <ul>
                {history.map((h) => (
                  <li key={h.id}>
                    {h.thumb ? <img src={h.thumb} alt="" /> : <span className="thumb-empty" />}
                    <div>
                      <strong>{tr(h.name)}</strong>
                      <span className="muted">
                        {cropName(h.crop)}, {h.health}%
                      </span>
                    </div>
                    <span className={`dot dot-${SEVERITY_TONE[h.severity] ?? "warn"}`} aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
