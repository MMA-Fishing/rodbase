import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const nav = [
    { label: "Rods", path: "/search" },
    { label: "Brands", path: "/brands" },
    { label: "Compare", path: "/compare" },
    { label: "Articles", path: "/articles" },
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
          <span>Fishing rod database & comparison tool</span>
          <span>Rods active · Reels planned next</span>
        </div>
      </div>

      <div className="container catalogHeaderMain">
        <Link className="catalogBrand" to="/" onClick={() => setOpen(false)}>
          <div className="catalogLogo">RB</div>
          <div>
            <div className="catalogBrandName">RodBase</div>
            <div className="catalogBrandSub">Fishing Rod IMDb</div>
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
            </NavLink>
          ))}
          <span className="catalogNavDisabled">Reels <small>Next</small></span>
        </nav>

        <form className="catalogHeaderSearch" onSubmit={submitSearch}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search rods, series, model code..."
          />
          <button type="submit">Search</button>
        </form>

        <Link className="catalogSubmitLink" to="/data-corrections">
          Data & Corrections
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
              placeholder="Search RodBase..."
            />
            <button type="submit">Search</button>
          </form>

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
            </NavLink>
          ))}

          <span className="mobileNavButton disabledMobileNav">Reels · Next</span>
          <Link className="mobileNavButton" to="/data-corrections" onClick={() => setOpen(false)}>
            Data & Corrections
          </Link>
        </div>
      )}
    </header>
  );
}


