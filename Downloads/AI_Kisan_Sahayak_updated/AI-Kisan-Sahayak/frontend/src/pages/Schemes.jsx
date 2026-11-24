import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { SCHEMES, SCHEME_CATEGORIES } from "../data/schemes";
import { useLang } from "../i18n/context";
import "./schemes.css";

export default function Schemes() {
  const { t, tr } = useLang();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEMES.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (!q) return true;
      const haystack = [s.name, s.short, s.benefit, s.who]
        .flatMap((field) => [field.en, field.hi])
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [category, query]);

  return (
    <section className="container schemes">
      <header className="page-head">
        <h1>{t("schemes.title")}</h1>
        <p className="lead">{t("schemes.sub")}</p>
      </header>

      <div className="search">
        <Icon name="search" size={20} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("schemes.search")}
          aria-label={t("schemes.search")}
        />
      </div>

      <div className="chip-row" role="radiogroup" aria-label={t("schemes.title")}>
        {["all", ...SCHEME_CATEGORIES].map((id) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={category === id}
            className={`chip ${category === id ? "chip-on" : ""}`}
            onClick={() => setCategory(id)}
          >
            {id === "all" ? t("schemes.all") : t(`schemes.cat.${id}`)}
          </button>
        ))}
      </div>

      <p className="muted count" role="status">
        {visible.length} {t("schemes.count")}
      </p>

      {visible.length === 0 ? (
        <p className="empty">{t("schemes.empty")}</p>
      ) : (
        <div className="scheme-list">
          {visible.map((s) => (
            <details key={s.id} className={`scheme cat-${s.category}`}>
              <summary>
                <span className="scheme-bar" aria-hidden="true" />
                <span className="scheme-main">
                  <span className="scheme-cat">{t(`schemes.cat.${s.category}`)}</span>
                  <strong>{tr(s.name)}</strong>
                  <span className="scheme-short">{tr(s.short)}</span>
                </span>
                <Icon name="chevron" size={22} className="scheme-chevron" />
              </summary>

              <div className="scheme-body">
                <section>
                  <h3>{t("schemes.benefit")}</h3>
                  <p>{tr(s.benefit)}</p>
                </section>
                <section>
                  <h3>{t("schemes.who")}</h3>
                  <p>{tr(s.who)}</p>
                </section>
                <section>
                  <h3>{t("schemes.docs")}</h3>
                  <ul>
                    {tr(s.docs).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>{t("schemes.how")}</h3>
                  <p>{tr(s.how)}</p>
                </section>
                <a className="btn btn-outline" href={s.url} target="_blank" rel="noopener noreferrer">
                  {t("schemes.official")}
                  <Icon name="external" size={18} />
                </a>
              </div>
            </details>
          ))}
        </div>
      )}

      <p className="banner banner-warn">
        <Icon name="info" size={20} />
        {t("schemes.checked")}
      </p>
    </section>
  );
}
