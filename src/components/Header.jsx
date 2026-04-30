import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const nav = [
    { label: "Home", path: "/" },
    { label: "Brands", path: "/brands" },
    { label: "Search", path: "/search" },
    { label: "Compare", path: "/compare" },
    { label: "Articles", path: "/articles" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="headerInner">
        <Link className="brandButton" to="/" onClick={() => setOpen(false)}>
          <div className="logo">R</div>
          <div>
            <div className="brandName">RodBase</div>
            <div className="muted tiny">Fishing Rod IMDb</div>
          </div>
        </Link>

        <nav className="desktopNav">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? "navButton activeNav" : "navButton"
              }
            >
              {item.label}
            </NavLink>
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
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "mobileNavButton activeMobileNav" : "mobileNavButton"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
