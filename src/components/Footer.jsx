import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext.jsx";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="siteFooter">
      <div className="container siteFooterGrid">
        <div className="siteFooterBrandBlock">
          <div className="footerBrand">RodBase</div>
          <p>{t("footer.description")}</p>
          <p className="siteFooterDisclaimer">{t("footer.disclaimer")}</p>
          <span className="siteFooterBadge">{t("footer.referenceOnly")}</span>
        </div>

        <div className="siteFooterColumn">
          <h3>{t("footer.database")}</h3>
          <Link to="/brands">{t("footer.brands")}</Link>
          <Link to="/search">{t("footer.search")}</Link>
          <Link to="/compare">{t("footer.compare")}</Link>
        </div>

        <div className="siteFooterColumn">
          <h3>{t("footer.content")}</h3>
          <Link to="/articles">{t("footer.articles")}</Link>
          <Link to="/data-corrections">{t("footer.dataCorrections")}</Link>
          <Link to="/brands">{t("footer.officialReferences")}</Link>
        </div>

        <div className="siteFooterColumn">
          <h3>{t("footer.future")}</h3>
          <span>{t("footer.reels")}</span>
          <span>{t("footer.communityData")}</span>
          <span>{t("footer.multilingual")}</span>
        </div>
      </div>
    </footer>
  );
}
