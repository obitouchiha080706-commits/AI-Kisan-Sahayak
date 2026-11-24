import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import ScanIllustration from "../components/ScanIllustration";
import { getSeason } from "../data/season";
import { useLang } from "../i18n/context";
import "./home.css";

const POPULAR = ["home.q1", "home.q2", "home.q3", "home.q4"];

export default function Home() {
  const { t, tr, lang } = useLang();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const season = getSeason();
  const tips = season.tips[lang];

  const ask = (text) => {
    const q = text.trim();
    if (q) navigate("/chat", { state: { ask: q } });
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{t("home.title")}</h1>
          <p className="hero-sub">{t("home.sub")}</p>

          <form
            className="ask-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(question);
            }}
          >
            <label htmlFor="home-ask">{t("home.askLabel")}</label>
            <div className="ask-row">
              <input
                id="home-ask"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t("home.askPlaceholder")}
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary" disabled={!question.trim()}>
                {t("home.askBtn")}
              </button>
            </div>
          </form>

          <div className="chip-row" aria-label={t("home.popular")}>
            {POPULAR.map((key) => (
              <button key={key} type="button" className="chip" onClick={() => ask(t(key))}>
                {t(key)}
              </button>
            ))}
          </div>

          <div className="hero-actions">
            <Link to="/crop-scanner" className="btn btn-accent">
              <Icon name="scan" size={20} />
              {t("home.scanCta")}
            </Link>
            <Link to="/schemes" className="btn btn-outline">
              <Icon name="landmark" size={20} />
              {t("home.schemesCta")}
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <ScanIllustration label={tr({ en: "Early blight", hi: "अगेती झुलसा" })} confidence="87%" />
        </div>
      </section>

      <section className="season" aria-labelledby="season-title">
        <h2 id="season-title">{tr(season.name)}</h2>
        <ul>
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="tools" aria-labelledby="tools-title">
        <h2 id="tools-title">{t("home.tools.title")}</h2>
        <div className="tool-grid">
          <article className="tool tool-scan">
            <Icon name="scan" size={36} />
            <h3>{t("home.tool.scan.t")}</h3>
            <p>{t("home.tool.scan.d")}</p>
            <Link to="/crop-scanner" className="btn btn-accent">
              {t("home.tool.scan.cta")}
            </Link>
          </article>
          <article className="tool tool-schemes">
            <Icon name="landmark" size={32} />
            <h3>{t("home.tool.schemes.t")}</h3>
            <p>{t("home.tool.schemes.d")}</p>
            <Link to="/schemes" className="text-link">
              {t("home.tool.schemes.cta")}
            </Link>
          </article>
          <article className="tool tool-chat">
            <Icon name="chat" size={32} />
            <h3>{t("home.tool.chat.t")}</h3>
            <p>{t("home.tool.chat.d")}</p>
            <Link to="/chat" className="text-link">
              {t("home.tool.chat.cta")}
            </Link>
          </article>
        </div>
      </section>

      <section className="how" aria-labelledby="how-title">
        <h2 id="how-title">{t("home.how.title")}</h2>
        <ol className="steps">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <h3>{t(`home.how${n}.t`)}</h3>
              <p>{t(`home.how${n}.d`)}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
