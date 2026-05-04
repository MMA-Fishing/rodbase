import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function Header() {
  const navigate = useNavigate();
  const { compareIds } = useCompare();
  const { t } = useLocale();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const nav = [
    { label: t("nav.rods"), path: "/search" },
    { label: t("nav.brands"), path: "/brands" },
    { label: t("nav.compare"), path: "/compare", count: compareIds.length },
    { label: t("nav.articles"), path: "/articles" },
  ];

  function submitSearch(event) {
    event.preventDefault();

    const trimmed = query.trim();

    if (trimmed.length > 0) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setOpen(false);
      return;
    }

    navigate("/search");
    setOpen(false);
  }

  return (
    <header className="catalogHeader">
      <div className="catalogTopBar">
        <div className="container catalogTopBarInner">
          <span>{t("topbar.left")}</span>
          <span>{t("topbar.right")}</span>
        </div>
      </div>

      <div className="container catalogHeaderMain">
        <Link className="catalogBrand" to="/" onClick={() => setOpen(false)}>
          <div className="catalogLogo">RB</div>
          <div>
            <div className="catalogBrandName">RodBase</div>
            <div className="catalogBrandSub">{t("brand.subtitle")}</div>
          </div>
        </Link>

        <nav className="catalogNav">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "catalogNavLink activeCatalogNavLink" : "catalogNavLink"
              }
            >
              {item.label}
              {item.count > 0 && <span className="navCountBadge">{item.count}</span>}
            </NavLink>
          ))}

          <span className="catalogNavDisabled">
            {t("nav.reels")} <small>{t("nav.next")}</small>
          </span>
        </nav>

        <form className="catalogHeaderSearch" onSubmit={submitSearch}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("header.searchPlaceholder")}
          />
          <button type="submit">{t("header.search")}</button>
        </form>

        <LanguageSwitcher />

        <Link className="catalogSubmitLink" to="/search">
          {t("header.searchRods")}
        </Link>

        <button className="mobileMenu" onClick={() => setOpen(!open)}>
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="catalogMobileNav">
          <form className="catalogMobileSearch" onSubmit={submitSearch}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("header.mobileSearchPlaceholder")}
            />
            <button type="submit">{t("header.search")}</button>
          </form>

          <LanguageSwitcher />

          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "mobileNavButton activeMobileNav" : "mobileNavButton"
              }
            >
              {item.label}
              {item.count > 0 && <span className="navCountBadge">{item.count}</span>}
            </NavLink>
          ))}

          <span className="mobileNavButton disabledMobileNav">
            {t("nav.reels")} · {t("nav.next")}
          </span>

          <Link className="mobileNavButton" to="/data-corrections" onClick={() => setOpen(false)}>
            {t("header.dataCorrections")}
          </Link>
        </div>
      )}
    </header>
  );
}
