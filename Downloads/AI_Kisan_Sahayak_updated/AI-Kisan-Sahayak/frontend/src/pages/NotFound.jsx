import { Link } from "react-router-dom";
import { useLang } from "../i18n/context";

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="container narrow center-block">
      <h1>{t("nf.title")}</h1>
      <p className="lead">{t("nf.body")}</p>
      <Link to="/" className="btn btn-primary">
        {t("nf.home")}
      </Link>
    </section>
  );
}
