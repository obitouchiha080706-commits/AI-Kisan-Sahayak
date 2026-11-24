import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useLang } from "../i18n/context";
import Icon from "./Icon";

const NAV = [
  { to: "/", key: "nav.home", icon: "home", end: true },
  { to: "/crop-scanner", key: "nav.scanner", icon: "scan" },
  { to: "/schemes", key: "nav.schemes", icon: "landmark" },
  { to: "/chat", key: "nav.chat", icon: "chat" },
];

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#14301D" />
      <path d="M17 47C17 27 29 16 49 16c0 20-10 31-29 31" fill="#E8A317" />
      <path d="M17 47L36 28" stroke="#14301D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t("lang.label")}>
      <button type="button" lang="en" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
      <button type="button" lang="hi" aria-pressed={lang === "hi"} onClick={() => setLang("hi")}>
        हिं
      </button>
    </div>
  );
}

export default function Layout() {
  const { t } = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand" aria-label={t("brand")}>
            <LogoMark />
            <span className="brand-name">{t("brand")}</span>
          </Link>

          <nav className="topnav" aria-label={t("nav.main")}>
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <LanguageToggle />
        </div>
      </header>

      <main id="main" className="page">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <p className="footer-brand">{t("brand")}</p>
            <p className="footer-text">{t("footer.about")}</p>
            <p className="footer-text">{t("footer.verify")}</p>
          </div>
          <div className="footer-help">
            <p className="footer-text">{t("footer.helpline")}</p>
            <a className="helpline" href="tel:18001801551">
              <Icon name="phone" size={20} />
              1800-180-1551
            </a>
          </div>
        </div>
      </footer>

      <nav className="tabbar" aria-label={t("nav.main")}>
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            <Icon name={item.icon} size={24} />
            <span>{t(item.key)}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
