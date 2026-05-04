import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import { useLocale } from "../context/LocaleContext.jsx";

export default function DataCorrectionsPage() {
  const { t } = useLocale();

  const correctionItems = [
    t("data.item.specs"),
    t("data.item.aliases"),
    t("data.item.sources"),
    t("data.item.status"),
    t("data.item.media"),
  ];

  return (
    <main className="dataCorrectionsPage">
      <PageTitle title={t("data.pageTitle")} description={t("data.pageDescription")} />

      <section className="dataHero">
        <div className="container dataHeroInner">
          <div>
            <div className="catalogEyebrow">{t("data.eyebrow")}</div>
            <h1>{t("data.title")}</h1>
            <p>{t("data.description")}</p>

            <div className="dataHeroActions">
              <Link to="/search">{t("data.openSearch")}</Link>
              <Link to="/brands">{t("data.browseBrands")}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container dataCorrectionsContent">
        <div className="dataPolicyGrid">
          <section className="dataCorrectionPanel">
            <div className="catalogEyebrow">{t("data.eyebrow")}</div>
            <h2>{t("data.sourceTitle")}</h2>
            <p>{t("data.sourceText")}</p>
          </section>

          <section className="dataCorrectionPanel">
            <div className="catalogEyebrow">{t("data.eyebrow")}</div>
            <h2>{t("data.imageTitle")}</h2>
            <p>{t("data.imageText")}</p>
          </section>

          <section className="dataCorrectionPanel">
            <div className="catalogEyebrow">{t("data.eyebrow")}</div>
            <h2>{t("data.correctionTitle")}</h2>
            <p>{t("data.correctionText")}</p>
          </section>

          <section className="dataCorrectionPanel">
            <div className="catalogEyebrow">{t("data.eyebrow")}</div>
            <h2>{t("data.whatCanBeCorrected")}</h2>

            <div className="dataCorrectionList">
              {correctionItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </div>

        <section className="dataDisclaimerPanel">
          <h2>{t("data.referenceTitle")}</h2>
          <p>{t("data.referenceText")}</p>
        </section>
      </section>
    </main>
  );
}
