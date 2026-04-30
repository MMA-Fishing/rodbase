import { useState } from "react";

export default function Header({ activeSection, setActiveSection }) {
  const nav = ["Home", "Brands", "Search", "Compare", "Rod Page"];
  const [open, setOpen] = useState(false);

  function go(section) {
    setActiveSection(section);
    setOpen(false);
  }

  return (
    <header className="header">
      <div className="headerInner">
        <button className="brandButton" onClick={() => go("Home")}>
          <div className="logo">R</div>
          <div>
            <div className="brandName">RodBase</div>
            <div className="muted tiny">Fishing Rod IMDb</div>
          </div>
        </button>

        <nav className="desktopNav">
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => go(item)}
              className={activeSection === item ? "navButton activeNav" : "navButton"}
            >
              {item}
            </button>
          ))}
        </nav>

        <button className="submitButton">Submit rod</button>
        <button className="mobileMenu" onClick={() => setOpen(!open)}>
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="mobileNav">
          {nav.map((item) => (
            <button key={item} onClick={() => go(item)} className="mobileNavButton">
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
