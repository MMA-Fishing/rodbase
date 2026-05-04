import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import { useLocale } from "../context/LocaleContext.jsx";

export default function NotFoundPage() {
  const { t } = useLocale();

  return (
    <main className="notFoundPage">
      <PageTitle
        title={t("notFound.pageTitle")}
        description={t("notFound.pageDescription")}
      />

      <section className="container notFoundPanel">
        <div>
          <div className="catalogEyebrow">{t("notFound.eyebrow")}</div>
          <h1>{t("notFound.title")}</h1>
          <p>{t("notFound.text")}</p>

          <div className="notFoundActions">
            <Link to="/search">{t("notFound.searchRods")}</Link>
            <Link to="/brands">{t("notFound.browseBrands")}</Link>
            <Link to="/">{t("notFound.goHome")}</Link>
          </div>
        </div>

        <div className="notFoundGraphic" aria-hidden="true">
          <div className="notFoundRod" />
          <div className="notFoundBadge">RB</div>
        </div>
      </section>
    </main>
  );
}
